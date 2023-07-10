import { Button, Divider, HStack } from 'native-base';
import { View } from 'react-native';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { DisplayContentChangeButtonGroupProps } from './types';

export const DisplayContentChangeButtonGroup = ({
  userId,
  onPress,
}: DisplayContentChangeButtonGroupProps) => {
  const { activeButtonLabel, mergedButtonList, handlePressChangeContentButton } = useUtils({
    userId,
    onPress,
  });

  return (
    <View style={styles.container}>
      <HStack justifyContent={'space-between'}>
        {mergedButtonList.map(({ label, labelCode }, index) => (
          <>
            {index !== 0 && <Divider orientation="vertical" />}
            <Button
              key={label}
              onPress={() => handlePressChangeContentButton(labelCode)}
              bg={activeButtonLabel !== label ? 'gray.200' : undefined}
              _text={activeButtonLabel !== label ? { color: 'black' } : undefined}>
              {label}
            </Button>
          </>
        ))}
      </HStack>
    </View>
  );
};
