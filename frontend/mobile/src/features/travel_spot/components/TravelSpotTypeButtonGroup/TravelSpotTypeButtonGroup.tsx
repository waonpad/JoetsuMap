import { Button, HStack } from 'native-base';
import { Dimensions, View } from 'react-native';

import { formatTraveSpotType } from '@/utils/format';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotTypeButtonGroupLabel, TravelSpotTypeButtonGroupProps } from './types';

const travelSpotTypes: TravelSpotTypeButtonGroupLabel[] = ['ALL', 'FUN', 'FOOD', 'LEARN'];

export const TravelSpotTypeButtonGroup = ({
  activeTravelSpotType,
}: TravelSpotTypeButtonGroupProps) => {
  const { handlePressTravelSpotTypeButton } = useUtils();

  return (
    <View style={styles.container}>
      <HStack width={Dimensions.get('window').width} justifyContent="space-between">
        {travelSpotTypes.map((type, index) => (
          <Button
            key={type}
            onPress={() => handlePressTravelSpotTypeButton(type)}
            width={Dimensions.get('window').width / travelSpotTypes.length}
            borderRadius={0}
            // 区切り線
            borderLeftWidth={index !== 0 ? 1 : undefined}
            borderLeftColor="gray.300"
            // アクティブな場合下線を入れる
            borderBottomWidth={activeTravelSpotType === type ? 2 : undefined}
            borderBottomColor="blue.500"
            bg={activeTravelSpotType !== type ? 'white' : 'bg.100'}
            _text={{ bold: true, color: activeTravelSpotType !== type ? 'text.600' : 'text.800' }}>
            {type === 'ALL' ? '全て' : formatTraveSpotType(type)}
          </Button>
        ))}
      </HStack>
    </View>
  );
};
