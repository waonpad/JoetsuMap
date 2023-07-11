import { Pressable, Button, Box, HStack, Text, VStack, Avatar } from 'native-base';
import { View, Image } from 'react-native';

import { imageSourceUri } from '@/utils/compute';

import { BookmarkTravelSpotButton } from '../BookmarkTravelSpotButton';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotListItemProps } from './types';

export const TravelSpotListItem = ({ travelSpot }: TravelSpotListItemProps) => {
  const { handleNavigateToDetail } = useUtils({ travelSpot });

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
                          uri: imageSourceUri(travelSpot.photo),
                        }}
                        style={{
                          // ...resizeByHeight(200, getSizeFromFileName(travelSpot.photo)),
                          width: '100%',
                          height: 200,
                        }}
                      />
                    </Box>
                    <HStack space={[2, 3]} justifyContent={'left'}>
                      <Avatar
                        source={{
                          uri: imageSourceUri(travelSpot.icon),
                        }}
                      />
                      <VStack>
                        <Text color="text.800" bold marginBottom={-1}>
                          {travelSpot.name}
                        </Text>
                      </VStack>
                      <Box marginLeft={'auto'} marginTop={-6} marginRight={[-2, -3]}>
                        <BookmarkTravelSpotButton travelSpotId={travelSpot.id} />
                      </Box>
                    </HStack>
                    {/* 余裕があれば詳細情報を入れる */}
                    <Button onPress={handleNavigateToDetail}>詳細</Button>
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
