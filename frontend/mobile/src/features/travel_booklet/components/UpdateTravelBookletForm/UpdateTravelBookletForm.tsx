import { Image } from 'expo-image';
import { Controller } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';

import { imageSourceUri, resizeByHeight, getSizeFromFileName } from '@/utils/compute';

import { TITLE_LABRL, TEXT_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { UpdateTravelBookletFormProps } from './types';

export const UpdateTravelBookletForm = ({ travelBookletId }: UpdateTravelBookletFormProps) => {
  const { travelBookletQuery, photo, handleChoosePhoto, control, handleSubmit, onSubmit, errors } =
    useLogics({
      travelBookletId,
    });

  return (
    <View style={styles.container}>
      <Controller
        name={'title'}
        control={control}
        rules={validationSchema.title}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{TITLE_LABRL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {!!errors.title && <Text>{errors.title.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'text'}
        control={control}
        rules={validationSchema.text}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{TEXT_LABEL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {!!errors.text && <Text>{errors.text.message}</Text>}
          </>
        )}
      />
      {/* 写真を選択したら置き換える */}
      {photo ? (
        <Image source={{ uri: photo?.uri }} style={{ width: photo.width, height: photo.height }} />
      ) : travelBookletQuery.data?.travelBooklet.photo ? (
        // 選択されるまでは既存の写真を表示
        <Image
          source={{
            uri: imageSourceUri(travelBookletQuery.data?.travelBooklet.photo),
          }}
          style={{
            ...resizeByHeight(
              100,
              getSizeFromFileName(travelBookletQuery.data?.travelBooklet.photo),
            ),
          }}
        />
      ) : (
        <></>
      )}
      <Button title="写真を選択" onPress={handleChoosePhoto} />
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
