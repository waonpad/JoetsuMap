import { Box, VStack, HStack, Avatar, Text, Pressable } from 'native-base';
import { View } from 'react-native';

import { imageSourceUri } from '@/utils/compute';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ProfileDetailProps } from './types';

export const ProfileDetail = ({ userId }: ProfileDetailProps) => {
  const { userQuery } = useLogics({ userId });

  const user = userQuery.data?.user;

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Box width={'100%'}>
        <Pressable width={'100%'}>
          {({ isPressed }) => {
            return (
              <>
                <Box
                  borderWidth={1}
                  borderBottomWidth={0}
                  borderColor="muted.300"
                  p="2"
                  bg={isPressed ? 'bg.100' : 'bg.50'}
                  borderRadius={5}>
                  <VStack space={[3, 4]}>
                    <HStack space={[2, 3]} justifyContent={'left'}>
                      <Avatar
                        source={{
                          uri: imageSourceUri(user?.icon),
                        }}
                      />
                      <VStack>
                        <Text color="text.800" bold marginBottom={-1}>
                          {user?.username}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </>
            );
          }}
        </Pressable>
      </Box>
    </View>
  );
};
