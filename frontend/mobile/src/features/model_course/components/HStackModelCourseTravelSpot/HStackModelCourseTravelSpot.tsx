import { HStack, Box, Avatar, Pressable } from 'native-base';
import { ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';

import type { HStackModelCourseTravelSpotProps } from './types';

export const HStackModelCourseTravelSpot = ({
  travelSpots,
  onPressTravelSpot,
  fill,
}: HStackModelCourseTravelSpotProps) => {
  const iconBaseArray = Array.from({ length: fill ? 10 : travelSpots.length });

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <HStack space={[1, 2]}>
          {iconBaseArray.map((_, index) => (
            <HStack key={index} alignItems={'center'} space={[1, 2]}>
              <Pressable
                onPress={() => travelSpots[index] && onPressTravelSpot(travelSpots[index])}>
                {travelSpots[index] ? (
                  <Avatar
                    source={{
                      uri: imageSourceUri(travelSpots[index].icon),
                    }}
                  />
                ) : (
                  <Avatar />
                )}
              </Pressable>
              <Box display={index === iconBaseArray.length - 1 ? 'none' : 'flex'}>
                <Icon name="chevron-with-circle-right" color="#000" size={16} />
              </Box>
            </HStack>
          ))}
        </HStack>
      </ScrollView>
    </View>
  );
};
