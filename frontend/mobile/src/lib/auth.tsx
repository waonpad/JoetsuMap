import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator } from 'react-native';

import type {
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
  JwtResponse,
} from '@/features/auth';
import { loginFn, getAuthUser, registerFn } from '@/features/auth';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';
import { omitToken } from '@/utils/compute';
import createCtx from '@/utils/createCtx';
import storage from '@/utils/storage';

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

  const [token, setToken] = useState<string | null>(null);

  const [load, setLoad] = useState(true);

  const navigation = useRootNavigation();

  const register = async (data: RegisterCredentialsDTO) => {
    const response = await registerFn(data);

    onRegisterSuccess(response);
  };

  const onRegisterSuccess = (jwtResponse: JwtResponse) => {
    setUser(omitToken(jwtResponse));
    setToken(jwtResponse.token);
    storage.setToken(jwtResponse.token);
  };

  const login = async (data: LoginCredentialsDTO) => {
    const response = await loginFn(data);

    onLoginSuccess(response);
  };

  const onLoginSuccess = (jwtResponse: JwtResponse) => {
    setUser(omitToken(jwtResponse));
    setToken(jwtResponse.token);
    storage.setToken(jwtResponse.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
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
      setToken(token);
      setLoad(false);
      return data;
    }

    setLoad(false);
    return null;
  };

  useEffect(() => {
    loadUser();

    // if only frontend dev mode
    // storage.clearToken();
    // setLoad(false);
  }, []);

  return {
    user,
    token,
    register,
    onRegisterSuccess,
    login,
    onLoginSuccess,
    logout,
    load,
    loadUser, // テスト用に追加
  };
};
