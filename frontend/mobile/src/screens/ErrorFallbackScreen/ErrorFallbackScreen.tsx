import * as React from 'react';

import { Text, View, Button } from 'react-native';

interface ErrorFallbackScreenProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallbackScreen = ({ error, resetError }: ErrorFallbackScreenProps) => {
  // Sentry.captureException(error);

  // テスト用

  // resetErrorではなくHomeに戻る方が良いかも
  return (
    <View>
      <Text>エラーが発生しました</Text>
      <Text>{error.toString()}</Text>
      <Button onPress={resetError} title={'Try again'} />
    </View>
  );
};
