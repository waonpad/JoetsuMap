import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator } from 'react-native';

import type { LoginCredentialsDTO, RegisterCredentialsDTO, AuthUser } from '@/features/auth';
import {
  loginWithEmailAndPassword,
  getAuthUser,
  registerWithEmailAndPassword,
} from '@/features/auth';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';
import { omitToken } from '@/utils/compute';
import storage from '@/utils/storage';

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [createdUseAuth, SetAuthProvider] = createCtx<ReturnType<typeof useAuthCtx>>();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthCtx();

  if (auth.load) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return <SetAuthProvider value={auth}>{children}</SetAuthProvider>;
  }
};

export const useAuth = createdUseAuth;

const useAuthCtx = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [load, setLoad] = useState(true);

  const navigation = useRootNavigation();

  const register = async (data: RegisterCredentialsDTO) => {
    const response = await registerWithEmailAndPassword(data);

    setUser(omitToken(response));
    storage.setToken(response.token);
  };

  const login = async (data: LoginCredentialsDTO) => {
    const response = await loginWithEmailAndPassword(data);

    setUser(omitToken(response));
    storage.setToken(response.token);
  };

  const logout = () => {
    setUser(null);
    storage.clearToken();

    navigation.navigate('App');
  };

  const loadUser = async () => {
    const token = await storage.getToken();

    if (token) {
      const data = await getAuthUser();

      if (!data) {
        storage.clearToken();

        setLoad(false);
        return null;
      }

      setUser(data.user);
      setLoad(false);
      return data;
    }

    setLoad(false);
    return null;
  };

  useEffect(() => {
    loadUser();

    // if only frontend dev mode
    // setLoad(false);
  }, []);

  return {
    user,
    register,
    login,
    logout,
    load,
  };
};
