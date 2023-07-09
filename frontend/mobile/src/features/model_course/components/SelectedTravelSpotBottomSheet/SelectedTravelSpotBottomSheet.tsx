import { Button, Box, HStack, Avatar, VStack, Text } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';

import type { SelectedTravelSpotBottomSheetProps } from './types';

export const SelectedTravelSpotBottomSheet = ({
  travelSpot,
  isContainedForTravelSpots,
  onPressPushPopTravelSpotButton,
}: SelectedTravelSpotBottomSheetProps) => {
  return (
    <View style={styles.container}>
      <Box>
        <HStack space={[2, 3]}>
          <Avatar
            source={{
              uri: imageSourceUri(travelSpot.icon),
            }}
          />
          <VStack>
            <Text color="text.800" bold marginBottom={-1}>
              {travelSpot.name}
            </Text>
            <HStack>
              {travelSpot.types.map((type) => (
                <Box key={type}>
                  <Text color="text.400">{type}</Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </HStack>
        <Button onPress={() => onPressPushPopTravelSpotButton(travelSpot)}>
          {isContainedForTravelSpots ? '削除' : '追加'}
        </Button>
      </Box>
    </View>
  );
};
