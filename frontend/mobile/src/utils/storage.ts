import { AUTH_TOKEN_KEY } from '@/constants';
import { secureStore } from '@/lib/expo-secure-store';

const storage = {
  getToken: () => {
    return secureStore.get(AUTH_TOKEN_KEY);
  },
  setToken: (token: string) => {
    return secureStore.save(AUTH_TOKEN_KEY, token);
  },
  clearToken: () => {
    return secureStore.delete(AUTH_TOKEN_KEY);
  },
};

export default storage;
