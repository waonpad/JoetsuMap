import { Entypo } from '@expo/vector-icons';
import {
  Pressable,
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Button,
  FlatList,
  Divider,
} from 'native-base';
import { View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { BookmarkTravelSpotButton } from '@/features/travel_spot/components/BookmarkTravelSpotButton';
import { imageSourceUri } from '@/utils/compute';

import { BookmarkModelCourseButton } from '../BookmarkModelCourseButton';

import {
  TOGGLE_TRAVEL_SPOTS_TO_INVISIBLE_BUTTON_LABEL,
  TOGGLE_TRAVEL_SPOTS_TO_VISIBLE_BUTTON_LABEL,
} from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ModelCourseListItemProps } from './types';

export const ModelCourseListItem = ({ modelCourse }: ModelCourseListItemProps) => {
  const { handlePressAuthorName, isTravelSpotsVisible, handlePressToggleTravelSpotsVisible } =
    useUtils({ modelCourse });

  return (
    <View style={styles.container}>
      <Box>
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
                  borderTopLeftRadius={5}
                  borderTopRightRadius={5}>
                  <VStack space={isTravelSpotsVisible ? [3, 4] : 0}>
                    <HStack space={[2, 3]} justifyContent={'left'}>
                      <Avatar
                        source={{
                          uri: imageSourceUri(modelCourse.travelSpots[0].icon),
                        }}
                      />
                      <VStack>
                        <Text color="text.800" bold marginBottom={-1}>
                          {modelCourse.title}
                        </Text>
                        <Pressable onPress={handlePressAuthorName}>
                          <Text color="text.600" bold>
                            {modelCourse.author.username}
                          </Text>
                        </Pressable>
                      </VStack>
                      <Box marginLeft={'auto'} marginTop={-6} marginRight={[-2, -3]}>
                        <BookmarkModelCourseButton modelCourseId={modelCourse.id} />
                      </Box>
                    </HStack>
                    <Collapsible collapsed={!isTravelSpotsVisible}>
                      <FlatList
                        style={{ width: '100%', position: 'relative', zIndex: 2 }}
                        data={modelCourse.travelSpots}
                        renderItem={({ item: travelSpot }) => (
                          <Box>
                            <HStack space={[2, 3]} alignItems={'center'}>
                              <Avatar
                                source={{
                                  uri: imageSourceUri(travelSpot.icon),
                                }}
                              />
                              <Text color="text.800" bold marginBottom={-1}>
                                {travelSpot.name}
                              </Text>
                              <Box marginLeft={'auto'} marginRight={[-1.5, -2]}>
                                <BookmarkTravelSpotButton travelSpotId={travelSpot.id} size={16} />
                              </Box>
                            </HStack>
                          </Box>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Box height={5} />}
                      />
                      <Box
                        paddingLeft={[6, 8]}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: -1,
                          zIndex: 1,
                          height: '100%',
                        }}>
                        <Divider orientation="vertical" bg={'coolGray.400'} width={0.5} />
                      </Box>
                    </Collapsible>
                  </VStack>
                </Box>
                <Box borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                  <Button
                    onPress={handlePressToggleTravelSpotsVisible}
                    borderTopLeftRadius={0}
                    borderTopRightRadius={0}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                      <Entypo
                        name={isTravelSpotsVisible ? 'triangle-up' : 'triangle-down'}
                        color={'white'}
                        size={20}
                      />
                      <View style={{ width: 5 }} />
                      <Text color="text.50" bold>
                        {isTravelSpotsVisible
                          ? TOGGLE_TRAVEL_SPOTS_TO_INVISIBLE_BUTTON_LABEL
                          : TOGGLE_TRAVEL_SPOTS_TO_VISIBLE_BUTTON_LABEL}
                      </Text>
                    </Box>
                  </Button>
                </Box>
              </>
            );
          }}
        </Pressable>
      </Box>
    </View>
  );
};
