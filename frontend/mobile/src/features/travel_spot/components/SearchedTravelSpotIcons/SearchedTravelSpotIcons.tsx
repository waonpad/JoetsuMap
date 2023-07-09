import { FlatList, Avatar, Box, Flex, Pressable } from 'native-base';
import { View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';
import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { SearchedTravelSpotIconsProps } from './types';

export const SearchedTravelSpotIcons = ({
  searchParams,
  onPress,
}: SearchedTravelSpotIconsProps) => {
  const { searchedTravelSpotsQuery } = useLogics({
    searchParams,
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={[1]}
        renderItem={() => (
          <Flex direction="row" flexWrap="wrap" justifyContent="center">
            {searchedTravelSpotsQuery.data?.pages
              .flatMap((page) => page.travelSpots.content)
              .map((travelSpot) => (
                <Box key={travelSpot.id} margin={1}>
                  <Pressable onPress={() => onPress(travelSpot)}>
                    {() => (
                      <Avatar
                        source={{
                          uri: imageSourceUri(travelSpot.icon),
                        }}
                        size={'60px'}
                        // style={isPressed ?
                      />
                    )}
                  </Pressable>
                </Box>
              ))}
          </Flex>
        )}
        keyExtractor={undefined}
        onEndReached={() => searchedTravelSpotsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
