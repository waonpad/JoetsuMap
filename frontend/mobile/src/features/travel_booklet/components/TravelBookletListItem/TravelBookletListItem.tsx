import { View } from 'react-native';

import { styles } from './styles';

import type { TravelBookletListItemProps } from './types';

export const TravelBookletListItem = ({ travelBooklet }: TravelBookletListItemProps) => {
  return <View style={styles.container}>{travelBooklet.title}</View>;
};
