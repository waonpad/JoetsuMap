import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type { Sample } from '../types';

export const getSamples = (): Promise<Sample[]> => {
  return axios.get('/sample/index');
};

type QueryFnType = typeof getSamples;

type UseSamplesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSamples = ({ config }: UseSamplesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['samples'],
    queryFn: () => getSamples(),
  });
};
