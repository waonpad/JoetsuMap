import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { PassingListResponse } from '../types';

export const getMyPassings = (): Promise<PassingListResponse> => {
  return axios.get(`${API_ENDPOINT}/my`);
};

type QueryFnType = typeof getMyPassings;

type UseMyPassingsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMyPassings = ({ config }: UseMyPassingsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: getMyPassings,
  });
};

// import { useInfiniteQuery } from '@tanstack/react-query';

// import { axios } from '@/lib/axios';
// import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
// import { pageableParams } from '@/utils/compute';

// import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

// import type { PassingPageResponse } from '../types';

// export const getMyPassings = ({
//   pageParam = 0,
// }: {
//   pageParam?: number;
// }): Promise<PassingPageResponse> => {
//   return axios.get(`${API_ENDPOINT}/my`, {
//     params: { ...pageableParams({ page: pageParam }) },
//   });
// };

// type QueryFnType = typeof getMyPassings;

// type UseMyPassingsOptions = {
//   config?: InfiniteQueryConfig<QueryFnType>;
// };

// export const useMyPassings = ({ config }: UseMyPassingsOptions = {}) => {
//   return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: [QUERY_KEY_PLURAL],
//     queryFn: ({ pageParam }) => getMyPassings({ pageParam }),
//     getNextPageParam: (page) => {
//       console.log(JSON.stringify(page));

//       return page.passings.last ? undefined : page.passings.number + 1;
//     },
//   });
// };
