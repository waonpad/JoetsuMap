import * as React from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Text, View, Button } from 'react-native';

interface ErrorFallbackScreenProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallbackScreen = ({ error, resetError }: ErrorFallbackScreenProps) => {
  // Sentry.captureException(error);

  const { reset } = useQueryErrorResetBoundary();

  const handlePressResetErrorButton = () => {
    resetError();
    reset();
  };

  return (
    <View>
      <Text>エラーが発生しました</Text>
      <Text>{error.toString()}</Text>
      {/* ホームに戻る設計の方が安全だと思われるが、方法が分からない(navigationが動かない) */}
      <Button onPress={handlePressResetErrorButton} title={'Try again'} />
    </View>
  );
};
