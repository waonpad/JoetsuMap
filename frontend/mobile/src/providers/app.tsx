import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { ThemeProvider } from '@rneui/themed';
import { NativeBaseProvider } from 'native-base';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { ErrorFallbackScreen } from '@/screens/ErrorFallbackScreen';
import { theme } from '@/styles/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <SafeAreaProvider>
      {/* <ThemeProvider theme={theme}> */}
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </NavigationContainer>
      </NativeBaseProvider>
      {/* </ThemeProvider> */}
    </SafeAreaProvider>
  );
};
