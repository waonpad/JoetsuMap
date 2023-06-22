import { View } from 'react-native';

import { PassingHistoryList } from '../../components/PassingHistoryList';
import { usePassingRoute } from '../../navigation/PassingNavigator/usePassingRoute';

import { styles } from './styles';

export const PassingHistoryScreen = () => {
  const route = usePassingRoute<'PassingHistory'>();

  return (
    <View style={styles.container}>
      <PassingHistoryList />
    </View>
  );
};
