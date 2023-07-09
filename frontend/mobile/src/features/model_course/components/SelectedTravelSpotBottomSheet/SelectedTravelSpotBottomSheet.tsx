import { AntDesign } from '@expo/vector-icons';
import { Button, Box, HStack, Avatar, VStack, Text, IconButton } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';
import { formatTraveSpotType } from '@/utils/format';

import { styles } from './styles';

import type { SelectedTravelSpotBottomSheetProps } from './types';

export const SelectedTravelSpotBottomSheet = ({
  travelSpot,
  isContainedForTravelSpots,
  onPressPushPopTravelSpotButton,
  handleClose,
}: SelectedTravelSpotBottomSheetProps) => {
  return (
    <View style={styles.container}>
      <Box p={4} borderTopColor={'gray.200'} borderTopWidth={2} width={'100%'}>
        <HStack space={[2, 3]}>
          <Avatar
            source={{
              uri: imageSourceUri(travelSpot.icon),
            }}
            size={'60px'}
          />
          <VStack justifyContent={'space-between'} width={'100%'}>
            <Text color="text.800" bold marginBottom={-1}>
              {travelSpot.name}
            </Text>
            <HStack space={1}>
              {travelSpot.types.map((type, index) => (
                <Box key={index} backgroundColor={'#FFFDC7'} borderRadius={4} p={1}>
                  <Text color="text.600" bold>
                    {formatTraveSpotType(type)}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </HStack>
        <IconButton
          onPress={handleClose}
          icon={<AntDesign name="closecircle" size={24} color="gray" />}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          borderRadius={'full'}
        />
        <Button
          onPress={() => onPressPushPopTravelSpotButton(travelSpot)}
          size={'sm'}
          bg={'#57EAE6'}
          style={{ position: 'absolute', bottom: 10, right: 10 }}
          _text={{ bold: true, color: 'text.600' }}>
          {isContainedForTravelSpots ? '削除' : '追加'}
        </Button>
      </Box>
    </View>
  );
};
