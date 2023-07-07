import { Pressable, Avatar, Box, HStack, VStack, Text, Button, FlatList } from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { imageSourceUri } from '@/utils/compute';

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

  // 詳細なスタイリングはまだしていない

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
              <VStack>
                <HStack space={[2, 3]}>
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
                </HStack>
                {isTravelSpotsVisible && (
                  <FlatList
                    // ItemSeparatorComponent={} アイコンを繋ぐ線を作る
                    style={{ width: '100%' }}
                    data={modelCourse.travelSpots}
                    renderItem={({ item: travelSpot }) => (
                      <Box>
                        <HStack space={[2, 3]}>
                          <Avatar
                            source={{
                              uri: imageSourceUri(travelSpot.icon),
                            }}
                          />
                          <VStack>
                            <Text color="text.800" bold marginBottom={-1}>
                              {travelSpot.name}
                            </Text>
                            {/* // ブックマークアイコン
                              // 処理はあとから作る */}
                          </VStack>
                        </HStack>
                      </Box>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                )}
                <Button
                  onPress={handlePressToggleTravelSpotsVisible}
                  leftIcon={<Icon name={isTravelSpotsVisible ? 'triangle-up' : 'triangle-down'} />}>
                  {isTravelSpotsVisible
                    ? TOGGLE_TRAVEL_SPOTS_TO_INVISIBLE_BUTTON_LABEL
                    : TOGGLE_TRAVEL_SPOTS_TO_VISIBLE_BUTTON_LABEL}
                </Button>
              </VStack>
            </Box>
          );
        }}
      </Pressable>
    </View>
  );
};
