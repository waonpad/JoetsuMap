import { Button, Text, VStack } from 'native-base';
import { Dimensions, View } from 'react-native';

import { Map } from '@/components/Map';
import { HStackModelCourseTravelSpot } from '@/features/model_course/components/HStackModelCourseTravelSpot';
import { TravelSpotCard } from '@/features/travel_spot/components/TravelSpotCard';
import { TravelSpotMapMarker } from '@/features/travel_spot/components/TravelSpotMapMarker';

import { styles } from './styles';
import { useLogics } from './usLogics';
import { useUtils } from './useUtils';

import type { ModelCourseOnMapProps } from './types';

export const ModelCourseOnMap = ({ modelCourseId }: ModelCourseOnMapProps) => {
  const { modelCourseQuery } = useLogics({ modelCourseId });

  const {
    travelSpots,
    displayTravelSpot,
    handlePressCloseTravelSpotCardButton,
    handlePressHStackTravelSpotIcon,
    handlePressTravelSpotMapMarker,
    handlePressResetSelectedModelCourseButton,
  } = useUtils({ modelCourseQuery });

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, position: 'relative' }}>
        <Map>
          {travelSpots?.map((travelSpot) => (
            // アイコンをマーカーにする
            <TravelSpotMapMarker
              key={travelSpot.id}
              travelSpot={travelSpot}
              coordinate={{
                latitude: travelSpot.coords.lat,
                longitude: travelSpot.coords.lng,
              }}
              onPress={(event) => {
                handlePressTravelSpotMapMarker({ event, travelSpot });
              }}
            />
          ))}
        </Map>
        {displayTravelSpot && (
          // 中心に表示
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <TravelSpotCard
              travelSpot={displayTravelSpot}
              handleClose={handlePressCloseTravelSpotCardButton}
            />
          </View>
        )}
      </View>
      {travelSpots && travelSpots.length > 0 && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: Dimensions.get('window').height * 0.01,
            paddingHorizontal: Dimensions.get('window').width * 0.025,
            position: 'relative',
          }}>
          <VStack space={2}>
            <Text color="text.800" bold marginBottom={-1}>
              モデルコース
            </Text>
            <Text color="text.600">選択中: {modelCourseQuery.data?.modelCourse.title}</Text>
            <Button
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              size={'xs'}
              onPress={handlePressResetSelectedModelCourseButton}>
              選択解除
            </Button>
            <HStackModelCourseTravelSpot
              travelSpots={travelSpots}
              onPressTravelSpot={handlePressHStackTravelSpotIcon}
            />
          </VStack>
        </View>
      )}
    </View>
  );
};
