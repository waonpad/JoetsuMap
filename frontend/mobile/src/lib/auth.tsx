import React, { useEffect, useState } from 'react';

// ログアウト時にホーム画面に遷移したいが、navigationはAuthProviderより下位のコンポーネントなため使えない
// どうしよう？

// import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import type { LoginCredentialsDTO, RegisterCredentialsDTO, AuthUser } from '@/features/auth';
import { loginWithEmailAndPassword, getUser, registerWithEmailAndPassword } from '@/features/auth';
// import type { RootStackParamList } from '@/navigation';
import { omitToken } from '@/utils/compute';
import storage from '@/utils/storage';

// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

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

    // navigation.navigate('Home');
  };

  const loadUser = async () => {
    const token = await storage.getToken();

    if (token) {
      const data = await getUser();

      setUser(data.user);
      setLoad(false);
      return data;
    }

    setLoad(false);
    return null;
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    register,
    login,
    logout,
    load,
  };
};
