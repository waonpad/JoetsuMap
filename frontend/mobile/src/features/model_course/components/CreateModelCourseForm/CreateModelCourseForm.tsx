import React from 'react';

import { Input, Text, Button, Box, HStack, Divider } from 'native-base';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';
import { BookmarkedTravelSpotIcons } from '@/features/travel_spot/components/BookmarkedTravelSpotIcons';
import { SearchTravelSpotForm } from '@/features/travel_spot/components/SearchTravelSpotForm';
import { SearchedTravelSpotIcons } from '@/features/travel_spot/components/SearchedTravelSpotIcons';
import { TravelSpotIcons } from '@/features/travel_spot/components/TravelSpotIcons';

import { HStackModelCourseTravelSpot } from '../HStackModelCourseTravelSpot';
import { SelectedTravelSpotBottomSheet } from '../SelectedTravelSpotBottomSheet';

import { SUBMIT_LABEL, TITLE_LABRL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { useUtils } from './useUtils';
import { validationSchema } from './validationSchema';

import type { CreateModelCourseFormProps } from './types';

export const CreateModelCourseForm = ({ defaultValues }: CreateModelCourseFormProps) => {
  const { control, handlePressSubmitButton, errors, travelSpots, setTravelSpots } = useLogics({
    defaultValues,
  });

  const {
    searchParams,
    handleSubmitSearch,
    selectedTravelSpot,
    handlePressPushPopTravelSpotButton,
    handlePressTravelSpotIcon,
    displayTravelSpotIcons,
    handlePressChnageDisplayTravelSpotIcons,
    handlePressCloseBottomSheetButton,
  } = useUtils({ travelSpots, setTravelSpots });

  return (
    <View style={{ ...styles.container, position: 'relative' }}>
      <View style={{ height: 25 }} />
      {/* 作成ボタンisどこに配置 */}
      <Button
        onPress={handlePressSubmitButton}
        size={'sm'}
        style={{ position: 'absolute', top: 10, right: 0, width: 100 }}
        _text={{ bold: true }}>
        {SUBMIT_LABEL}
      </Button>
      {/* モデルコースのタイトル */}
      <Controller
        name={'title'}
        control={control}
        rules={validationSchema.title}
        render={({ field: { onChange, onBlur, value } }) => (
          <Box textAlign={'left'} width={'100%'}>
            <Text>{TITLE_LABRL}</Text>
            <Input onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.title && <Text>{errors.title.message}</Text>}
          </Box>
        )}
      />
      {/* 選択した観光地を横に並べていく */}
      <View style={{ flex: 0.5 }}>
        <HStackModelCourseTravelSpot
          travelSpots={travelSpots}
          onPressTravelSpot={handlePressTravelSpotIcon}
          fill
        />
      </View>
      {/* 観光地検索バー */}
      <View style={{ flex: 0.5, width: '100%' }}>
        <SearchTravelSpotForm onSubmitAction={handleSubmitSearch} />
        <HStack>
          <Button
            onPress={() => handlePressChnageDisplayTravelSpotIcons('all')}
            width={'50%'}
            bg={displayTravelSpotIcons !== 'all' ? 'gray.200' : undefined}
            _text={displayTravelSpotIcons !== 'all' ? { color: 'black' } : undefined}
            borderRightRadius={0}>
            全てのスポット
          </Button>
          <Divider orientation="vertical" />
          <Button
            onPress={() => handlePressChnageDisplayTravelSpotIcons('bookmarked')}
            width={'50%'}
            bg={displayTravelSpotIcons !== 'bookmarked' ? 'gray.200' : undefined}
            _text={displayTravelSpotIcons !== 'bookmarked' ? { color: 'black' } : undefined}
            borderLeftRadius={0}>
            ブックマーク
          </Button>
        </HStack>
      </View>

      <View style={{ height: 6 }} />

      <View style={{ flex: 2, width: '100%' }}>
        {/* ブックマークした観光地一覧 */}

        <Suspense>
          {displayTravelSpotIcons === 'bookmarked' && (
            <BookmarkedTravelSpotIcons onPress={handlePressTravelSpotIcon} />
          )}
          {/* 検索した観光地一覧 */}
          {displayTravelSpotIcons === 'searched' && (
            <SearchedTravelSpotIcons
              searchParams={searchParams}
              onPress={handlePressTravelSpotIcon}
            />
          )}
          {/* 全ての観光地一覧 */}
          {displayTravelSpotIcons === 'all' && (
            <TravelSpotIcons onPress={handlePressTravelSpotIcon} />
          )}
        </Suspense>
      </View>
      {/* 選択している観光地を表示 */}
      {selectedTravelSpot && (
        <Box style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white' }}>
          <SelectedTravelSpotBottomSheet
            travelSpot={selectedTravelSpot}
            isContainedForTravelSpots={travelSpots
              .map((travelSpot) => travelSpot.id)
              .includes(selectedTravelSpot.id)}
            onPressPushPopTravelSpotButton={handlePressPushPopTravelSpotButton}
            handleClose={handlePressCloseBottomSheetButton}
          />
        </Box>
      )}
    </View>
  );
};
