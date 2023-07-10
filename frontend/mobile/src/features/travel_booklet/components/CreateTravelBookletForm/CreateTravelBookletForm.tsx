import { Image } from 'expo-image';
import { Text, Input, Button } from 'native-base';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { TITLE_LABRL, TEXT_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { CreateTravelBookletFormProps } from './types';

export const CreateTravelBookletForm = ({ defaultValues }: CreateTravelBookletFormProps) => {
  const { photo, handleChoosePhoto, control, handlePressSubmitButton, errors } = useLogics({
    defaultValues,
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
            <Input onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.title && <Text>{errors.title.message}</Text>}
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
            <Input onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.text && <Text>{errors.text.message}</Text>}
          </>
        )}
      />
      {photo && (
        <Image source={{ uri: photo?.uri }} style={{ width: photo.width, height: photo.height }} />
      )}
      <Button onPress={handleChoosePhoto}>写真を選択</Button>
      <Button onPress={handlePressSubmitButton}>{SUBMIT_LABEL}</Button>
    </View>
  );
};
