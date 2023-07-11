import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { PassingHistoryList } from '../../components/PassingHistoryList';
import { usePassingRoute } from '../../navigation/PassingNavigator/usePassingRoute';

import { styles } from './styles';

export const PassingHistoryScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const route = usePassingRoute<'PassingHistory'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <PassingHistoryList />
      </Suspense>
    </View>
  );
};
