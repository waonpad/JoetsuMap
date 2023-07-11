import { Box, Button, HStack } from 'native-base';
import { ScrollView, View } from 'react-native';

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
      <Box borderColor="gray.300" borderWidth={1} borderRadius={5} height="auto" width="100%">
        <ScrollView horizontal={mergedButtonList.length > 2} showsHorizontalScrollIndicator={false}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            {mergedButtonList.map(({ label, labelCode }, index) => (
              <Button
                key={label}
                onPress={() => handlePressChangeContentButton(labelCode)}
                width={mergedButtonList.length < 3 ? `${100 / mergedButtonList.length}%` : 'auto'}
                borderRadius={0}
                borderLeftRadius={index === 0 ? 5 : undefined}
                borderRightRadius={index === mergedButtonList.length - 1 ? 5 : undefined}
                // 区切り線
                borderLeftWidth={index !== 0 ? 1 : undefined}
                borderLeftColor="gray.300"
                // アクティブな場合下線を入れる
                borderBottomWidth={activeButtonLabel === labelCode ? 2 : undefined}
                borderBottomColor="blue.500"
                bg={activeButtonLabel !== labelCode ? 'white' : 'bg.100'}
                _text={{
                  bold: true,
                  color: activeButtonLabel !== labelCode ? 'text.600' : 'text.800',
                }}>
                {label}
              </Button>
            ))}
          </HStack>
        </ScrollView>
      </Box>
    </View>
  );
};
