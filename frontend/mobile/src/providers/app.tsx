import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/lib/auth';
import { LocationTrackingProvider } from '@/lib/locationTracking';
import { NotificationProvider } from '@/lib/notification';
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
          <QueryErrorResetBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <NotificationProvider>
                    <LocationTrackingProvider>{children}</LocationTrackingProvider>
                  </NotificationProvider>
                </AuthProvider>
              </QueryClientProvider>
            </ErrorBoundary>
          </QueryErrorResetBoundary>
        </NavigationContainer>
      </NativeBaseProvider>
      {/* </ThemeProvider> */}
    </SafeAreaProvider>
  );
};
