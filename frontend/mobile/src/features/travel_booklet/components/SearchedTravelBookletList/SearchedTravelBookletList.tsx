import { View } from 'react-native';

import { TravelBookletListItem } from '../TravelBookletListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { SearchedTravelBookletListProps } from './types';

export const SearchedTravelBookletList = ({ searchParams }: SearchedTravelBookletListProps) => {
  const { searchTravelBookletsQuery } = useLogics({ searchParams });

  return (
    <View style={styles.container}>
      {searchTravelBookletsQuery.data?.travelBooklets.map((travelBooklet) => {
        return <TravelBookletListItem key={travelBooklet.id} travelBooklet={travelBooklet} />;
      })}
    </View>
  );
};
