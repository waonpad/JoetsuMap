import { APP_NAME } from '@/constants';
import { secureStore } from '@/lib/expo-secure-store';

const storagePrefix = `${APP_NAME}_`;

const storage = {
  getToken: () => {
    return secureStore.get(`${storagePrefix}token`);
  },
  setToken: (token: string) => {
    secureStore.save(`${storagePrefix}token`, token);
  },
  clearToken: () => {
    secureStore.delete(`${storagePrefix}token`);
  },
};

export default storage;
