import * as React from 'react';

import { Text, View, Button } from 'react-native';

interface ErrorFallbackScreenProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallbackScreen = ({ error, resetError }: ErrorFallbackScreenProps) => {
  // Sentry.captureException(error);

  return (
    <View>
      <Text>エラーが発生しました</Text>
      <Text>{error.toString()}</Text>
      {/* ホームに戻る設計の方が安全だと思われるが、方法が分からない(navigationが動かない) */}
      <Button onPress={resetError} title={'Try again'} />
    </View>
  );
};
