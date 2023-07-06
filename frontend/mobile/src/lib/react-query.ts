import { QueryClient } from '@tanstack/react-query';

import { EXPECTED_EXCEPTION, type ErrorResponse, type MutationErrorResponse } from '@/types';
import { enableUseErrorBoundary } from '@/utils/compute';

import type {
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const queryConfig: DefaultOptions<AxiosError<ErrorResponse | MutationErrorResponse<any>>> = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
  mutations: {
    useErrorBoundary: (error: AxiosError<ErrorResponse | MutationErrorResponse<any>>) => {
      const throughErrorTypes: (keyof typeof EXPECTED_EXCEPTION)[] = [
        EXPECTED_EXCEPTION.VALIDATION_ERROR,
      ];

      return enableUseErrorBoundary(error, throughErrorTypes);
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig as DefaultOptions });

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  ReturnType<FnType> extends Promise<infer T> ? T : ReturnType<FnType>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError<MutationErrorResponse<Parameters<MutationFnType>[0]['data']>>,
  Parameters<MutationFnType>[0]
>;
