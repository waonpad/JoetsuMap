import React from 'react';

import { Input, Text, Button, Avatar } from 'native-base';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';
import { BookmarkedTravelSpotIcons } from '@/features/travel_spot/components/BookmarkedTravelSpotIcons';
import { SearchTravelSpotForm } from '@/features/travel_spot/components/SearchTravelSpotForm';
import { SearchedTravelSpotIcons } from '@/features/travel_spot/components/SearchedTravelSpotIcons';
import { imageSourceUri } from '@/utils/compute';

import { HStackModelCourseTravelSpot } from '../HStackModelCourseTravelSpot';
import { SelectedTravelSpotBottomSheet } from '../SelectedTravelSpotBottomSheet';

import { SUBMIT_LABEL, TITLE_LABRL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { useUtils } from './useUtils';
import { validationSchema } from './validationSchema';

import type { CreateModelCourseFormProps } from './types';

export const CreateModelCourseForm = ({ defaultValues }: CreateModelCourseFormProps) => {
  const { control, handlePressSubmitButton, errors } = useLogics({ defaultValues });

  // どうやってtravelSpotIdsをsubmitする？

  const {
    searchParams,
    handleSubmitSearch,
    travelSpots,
    selectedTravelSpot,
    handlePressPushPopTravelSpotButton,
    handlePressTravelSpotIcon,
  } = useUtils();

  return (
    <View style={styles.container}>
      {/* 一番最初に訪れる観光地のアイコンを大きく表示する */}
      <Avatar
        source={{
          uri: imageSourceUri(travelSpots[0].icon),
        }}
      />
      {/* モデルコースのタイトル */}
      <Controller
        name={'title'}
        control={control}
        rules={validationSchema.title}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{TITLE_LABRL}</Text>
            <Input onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.title && <Text>{errors.title.message}</Text>}
          </>
        )}
      />
      {/* 選択した観光地を横に並べていく */}
      <HStackModelCourseTravelSpot
        travelSpots={travelSpots}
        onPressTravelSpot={handlePressTravelSpotIcon}
      />
      {/* 観光地検索バー */}
      <SearchTravelSpotForm onSubmitAction={handleSubmitSearch} />

      {/* どうやって表示を切り替える？ */}

      {/* ブックマークした観光地一覧 */}
      <Suspense>
        <BookmarkedTravelSpotIcons onPress={handlePressTravelSpotIcon} />
      </Suspense>
      {/* 検索した観光地一覧 */}
      <Suspense>
        <SearchedTravelSpotIcons searchParams={searchParams} onPress={handlePressTravelSpotIcon} />
      </Suspense>
      {/* 選択している観光地を表示 */}
      {selectedTravelSpot && (
        <SelectedTravelSpotBottomSheet
          travelSpot={selectedTravelSpot}
          isContainedForTravelSpots={travelSpots
            .map((travelSpot) => travelSpot.id)
            .includes(selectedTravelSpot.id)}
          onPressPushPopTravelSpotButton={handlePressPushPopTravelSpotButton}
        />
      )}
      {/* 作成ボタンisどこに配置 */}
      <Button onPress={handlePressSubmitButton}>{SUBMIT_LABEL}</Button>
    </View>
  );
};
