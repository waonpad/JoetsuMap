import { Avatar, Box, HStack, Spacer, VStack, Text, Pressable } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';
import { formatDateToMonthDay } from '@/utils/format';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { NotificationListItemProps } from './types';

export const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  const { handleNotificationPress, handleAvatarPress } = useUtils({ notification });

  return (
    <View style={styles.container}>
      <Pressable onPress={handleNotificationPress}>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth="1"
              borderColor="muted.200"
              p="2"
              bg={isPressed ? 'bg.100' : 'bg.50'}>
              <HStack space={[2, 3]} justifyContent="space-between" width="100%">
                <Pressable onPress={handleAvatarPress}>
                  <Avatar
                    source={{
                      uri: imageSourceUri(notification.sender?.icon ?? ''),
                    }}
                  />
                </Pressable>
                <VStack>
                  <Text color="text.800" bold marginBottom={-1}>
                    {notification.sender?.username}
                  </Text>
                  <Text color="text.600" bold>
                    {notification.title}
                  </Text>
                  <Text color="text.600">{notification.body}</Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="text.800" alignSelf="flex-start">
                  {formatDateToMonthDay(notification.createdAt)}
                </Text>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    </View>
  );
};
