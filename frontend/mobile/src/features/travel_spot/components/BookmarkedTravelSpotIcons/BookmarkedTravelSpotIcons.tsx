import { Avatar, Box, Flex, Pressable, FlatList } from 'native-base';
import { View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';
import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkedTravelSpotIconsProps } from './types';

export const BookmarkedTravelSpotIcons = ({ onPress }: BookmarkedTravelSpotIconsProps) => {
  const { bookmarkedTravelSpotsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={[1]}
        renderItem={() => (
          <Flex direction="row" flexWrap="wrap" justifyContent="center">
            {bookmarkedTravelSpotsQuery.data?.pages
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
        onEndReached={() => bookmarkedTravelSpotsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
