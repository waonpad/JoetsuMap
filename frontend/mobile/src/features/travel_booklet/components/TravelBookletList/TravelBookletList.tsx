import { View } from 'react-native';

import { TravelBookletListItem } from '../TravelBookletListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelBookletListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const TravelBookletList = ({}: TravelBookletListProps) => {
  const { travelBookletsQuery } = useLogics();

  return (
    <View style={styles.container}>
      {travelBookletsQuery.data?.travelBooklets.map((travelBooklet) => {
        return <TravelBookletListItem key={travelBooklet.id} travelBooklet={travelBooklet} />;
      })}
    </View>
  );
};
