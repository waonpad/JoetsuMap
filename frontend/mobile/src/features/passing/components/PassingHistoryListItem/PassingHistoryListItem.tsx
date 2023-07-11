import { Text, Pressable, Box, HStack, Avatar, Spacer, VStack } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';
import { formatDateToMonthDay } from '@/utils/format';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { PassingHistoryListItemProps } from './types';

export const PassingHistoryListItem = ({ passing }: PassingHistoryListItemProps) => {
  const { handleAvatarPress } = useUtils({ passing });

  return (
    <View style={styles.container}>
      <Pressable>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth="1"
              borderColor="muted.200"
              p="2"
              bg={isPressed ? 'bg.100' : 'bg.50'}>
              <HStack
                space={[2, 3]}
                justifyContent="space-between"
                width="100%"
                alignItems={'center'}>
                <Pressable onPress={handleAvatarPress}>
                  <Avatar
                    source={{
                      uri: imageSourceUri(passing.passedUser?.icon ?? ''),
                    }}
                  />
                </Pressable>
                <VStack>
                  <Text color="text.800" bold marginBottom={-1}>
                    {passing.passedUser?.username}
                  </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="text.800" alignSelf="flex-start">
                  {formatDateToMonthDay(passing.createdAt)}
                </Text>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    </View>
  );
};
