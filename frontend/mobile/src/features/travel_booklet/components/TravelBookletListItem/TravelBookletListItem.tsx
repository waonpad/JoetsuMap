import { Avatar, Box, Button, HStack, Pressable, Text, VStack } from 'native-base';
import { View, Image } from 'react-native';

import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { imageSourceUri } from '@/utils/compute';

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
                    <Box justifyContent={'center'} alignItems={'center'} width={'100%'}>
                      <Image
                        source={{
                          uri: imageSourceUri(travelBooklet.photo),
                        }}
                        style={{
                          // ...resizeByHeight(200, getSizeFromFileName(travelBooklet.photo)),
                          width: '100%',
                          height: 200,
                        }}
                      />
                    </Box>
                    <HStack space={[2, 3]} justifyContent={'left'}>
                      <Pressable onPress={handleNavigateToAuthorProfile}>
                        <Avatar
                          source={{
                            uri: imageSourceUri(travelBooklet.author.icon),
                          }}
                        />
                      </Pressable>
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
                    <Text color="text.600">{travelBooklet.text}</Text>
                    <HStack space={[2, 3]} justifyContent={'flex-end'}>
                      <Box>
                        <Authorization policyCheck={POLICIES['common:delete'](user, travelBooklet)}>
                          <DeleteTravelBookletButton travelBookletId={travelBooklet.id} />
                        </Authorization>
                      </Box>
                      <Authorization policyCheck={POLICIES['common:update'](user, travelBooklet)}>
                        <Button size={'sm'} onPress={handleNavigateToUpdate}>
                          編集
                        </Button>
                      </Authorization>
                      <Button size={'sm'} onPress={handleNavigateToDetail}>
                        詳細
                      </Button>
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
