import { AntDesign } from '@expo/vector-icons';
import { IconButton, Text, Box, VStack, HStack } from 'native-base';
import { View, Image } from 'react-native';

import { getSizeFromFileName, imageSourceUri, resizeByHeight } from '@/utils/compute';
import { formatTraveSpotType } from '@/utils/format';

import { BookmarkTravelSpotButton } from '../BookmarkTravelSpotButton';

import { styles } from './styles';

import type { TravelSpotCardProps } from './types';

/**
 * マップ上のマーカーをタップしたときに表示されるカード
 */
export const TravelSpotCard = ({ travelSpot, handleClose }: TravelSpotCardProps) => {
  return (
    <View style={styles.container}>
      <Box p={[2, 4]} bg="white" rounded={8} shadow={2}>
        <VStack space={2}>
          {/* なぜか画像が表示されない */}
          <Image
            style={{
              ...resizeByHeight(200, getSizeFromFileName(travelSpot.photo)),
            }}
            source={{
              uri: imageSourceUri(travelSpot.photo),
            }}
          />
          {/* 観光地名 */}
          <Text color="text.800" bold marginBottom={-1}>
            {travelSpot.name}
          </Text>
          {/* タイプリスト */}
          <HStack space={1}>
            {travelSpot.types.map((type, index) => (
              <Box key={index} backgroundColor={'#FFFDC7'} borderRadius={4} p={1}>
                <Text color="text.600" bold>
                  {formatTraveSpotType(type)}
                </Text>
              </Box>
            ))}
          </HStack>
          {/* ブックマークボタンと閉じるボタン */}
          <HStack space={1}>
            <BookmarkTravelSpotButton travelSpotId={travelSpot.id} />
            {/* 後で戻るアイコンを入れる */}
            <IconButton
              onPress={handleClose}
              icon={<AntDesign name="back" size={24} color="gray" />}
            />
          </HStack>
        </VStack>
      </Box>
    </View>
  );
};
