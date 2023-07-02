import { Suspense as SuspenseOrigin } from 'react';
import type { SuspenseProps } from 'react';

import { ActivityIndicator } from 'react-native';

export const Suspense = (props: SuspenseProps) => {
  return <SuspenseOrigin fallback={<ActivityIndicator />} {...props} />;
};
