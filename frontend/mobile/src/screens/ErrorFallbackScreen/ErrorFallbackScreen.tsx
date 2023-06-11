import * as React from 'react';

import { Text, View, Button } from 'react-native';

import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

interface ErrorFallbackScreenProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallbackScreen = ({ error, resetError }: ErrorFallbackScreenProps) => {
  // Sentry.captureException(error);

  const rootNavigation = useRootNavigation();

  const goHome = () => {
    rootNavigation.navigate('Home');
  };

  return (
    <View>
      <Text>エラーが発生しました</Text>
      <Text>{error.toString()}</Text>
      {/* ホームに戻る設計の方が安全だと思われる */}
      <Button onPress={resetError} title={'Try again'} />
      <Button onPress={goHome} title={'Go Home'} />
    </View>
  );
};
