import { Avatar, Box, Flex, Pressable } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkedTravelSpotListProps } from './types';

export const BookmarkedTravelSpotIcons = ({ onPress }: BookmarkedTravelSpotListProps) => {
  const { bookmarkedTravelSpotsQuery } = useLogics();

  // 無限スクロールの実装をする

  return (
    <View style={styles.container}>
      <Flex direction="row">
        {bookmarkedTravelSpotsQuery.data?.pages
          .flatMap((page) => page.travelSpots.content)
          .map((travelSpot) => (
            <Box key={travelSpot.id}>
              <Pressable onPress={() => onPress(travelSpot)}>
                {() => (
                  <Avatar
                    source={{
                      uri: imageSourceUri(travelSpot.icon),
                    }}
                    // style={isPressed ?
                  />
                )}
              </Pressable>
            </Box>
          ))}
      </Flex>
    </View>
  );
};
