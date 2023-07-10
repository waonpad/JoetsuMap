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
        {travelSpotTypes.map((type) => (
          <Button
            key={type}
            onPress={() => handlePressTravelSpotTypeButton(type)}
            bg={activeTravelSpotType !== type ? 'gray.200' : undefined}
            _text={activeTravelSpotType !== type ? { color: 'black' } : undefined}>
            {type === 'ALL' ? '全て' : formatTraveSpotType(type)}
          </Button>
        ))}
      </HStack>
    </View>
  );
};
