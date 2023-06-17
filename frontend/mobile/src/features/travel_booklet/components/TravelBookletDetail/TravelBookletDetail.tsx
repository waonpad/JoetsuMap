import { View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelBookletDetailProps } from './types';

export const TravelBookletDetail = ({ travelBookletId }: TravelBookletDetailProps) => {
  const { travelBookletQuery } = useLogics({ travelBookletId });

  return <View style={styles.container}>{travelBookletQuery.data?.travelBooklet?.title}</View>;
};
