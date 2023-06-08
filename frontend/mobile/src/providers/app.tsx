import * as React from 'react';

import ErrorBoundary from 'react-native-error-boundary';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { ErrorFallbackScreen } from '@/screens/ErrorFallbackScreen';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
