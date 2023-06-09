import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type { Test } from '../types';

export const getTestConnection = (): Promise<Test> => {
  return axios.get('/test/connection');
};

type QueryFnType = typeof getTestConnection;

type UseTestConnectionOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTestConnection = ({ config }: UseTestConnectionOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['test_connection'],
    queryFn: () => getTestConnection(),
  });
};
