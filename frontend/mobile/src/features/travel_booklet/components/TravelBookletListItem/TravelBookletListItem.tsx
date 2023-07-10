import { Image } from 'expo-image';
import { Avatar, Box, Button, HStack, Pressable, Text, VStack } from 'native-base';
import { View } from 'react-native';

import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { getSizeFromFileName, imageSourceUri, resizeByHeight } from '@/utils/compute';

import { DeleteTravelBookletButton } from '../DeleteTravelBookletButton';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletListItemProps } from './types';

export const TravelBookletListItem = ({ travelBooklet }: TravelBookletListItemProps) => {
  const { user } = useAuth();

  const { handleNavigateToDetail, handleNavigateToAuthorProfile, handleNavigateToUpdate } =
    useUtils({ travelBooklet });

  return (
    <View style={styles.container}>
      <Box width={'100%'}>
        <Pressable width={'100%'}>
          {({ isPressed }) => {
            return (
              <>
                <Box
                  borderWidth={1}
                  borderColor="muted.300"
                  p="2"
                  borderRadius={5}
                  bg={isPressed ? 'bg.100' : 'bg.50'}>
                  {/* 表示される？ */}
                  <VStack space={[3, 4]}>
                    <Image
                      source={{
                        uri: imageSourceUri(travelBooklet.photo),
                      }}
                      style={{
                        ...resizeByHeight(200, getSizeFromFileName(travelBooklet.photo)),
                      }}
                    />
                    <HStack space={[2, 3]} justifyContent={'left'}>
                      <Avatar
                        source={{
                          uri: imageSourceUri(travelBooklet.author.icon),
                        }}
                      />
                      <VStack>
                        <Text color="text.800" bold marginBottom={-1}>
                          {travelBooklet.title}
                        </Text>
                        <Pressable onPress={handleNavigateToAuthorProfile}>
                          <Text color="text.600" bold>
                            {travelBooklet.author.username}
                          </Text>
                        </Pressable>
                      </VStack>
                    </HStack>
                    <Text color="text.800" bold marginBottom={-1}>
                      {travelBooklet.title}
                    </Text>
                    <Text color="text.600">{travelBooklet.text}</Text>
                    <HStack space={[2, 3]} justifyContent={'space-around'}>
                      <Authorization policyCheck={POLICIES['common:delete'](user, travelBooklet)}>
                        <DeleteTravelBookletButton travelBookletId={travelBooklet.id} />
                      </Authorization>
                      <Authorization policyCheck={POLICIES['common:update'](user, travelBooklet)}>
                        <Button onPress={handleNavigateToUpdate}>編集</Button>
                      </Authorization>
                      <Button onPress={handleNavigateToDetail}>詳細</Button>
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
