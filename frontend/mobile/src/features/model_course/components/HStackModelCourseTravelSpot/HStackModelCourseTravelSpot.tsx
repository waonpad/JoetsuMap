import { HStack, Box, Avatar, Pressable } from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';

import type { HStackModelCourseTravelSpotProps } from './types';

export const HStackModelCourseTravelSpot = ({
  travelSpots,
  onPressTravelSpot,
}: HStackModelCourseTravelSpotProps) => {
  return (
    <View style={styles.container}>
      <HStack>
        {travelSpots.map((travelSpot, index) => (
          <HStack key={travelSpot.id}>
            <Box>
              <Pressable onPress={() => onPressTravelSpot(travelSpot)}>
                <Avatar
                  source={{
                    uri: imageSourceUri(travelSpot.icon),
                  }}
                />
              </Pressable>
            </Box>
            <Box display={index === travelSpots.length - 1 ? 'none' : 'flex'}>
              <Icon name="chevron-with-circle-right" color="#000" />
            </Box>
          </HStack>
        ))}
      </HStack>
    </View>
  );
};
