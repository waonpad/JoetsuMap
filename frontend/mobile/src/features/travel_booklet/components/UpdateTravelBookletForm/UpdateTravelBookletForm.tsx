import { Controller } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';

import { TITLE_LABRL, TEXT_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { UpdateTravelBookletFormProps } from './types';

export const UpdateTravelBookletForm = ({ travelBookletId }: UpdateTravelBookletFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ travelBookletId });

  return (
    <View style={styles.container}>
      <Controller
        name={'title'}
        control={control}
        rules={validationSchema.title}
        render={({ field }) => (
          <>
            <Text>{TITLE_LABRL}</Text>
            <TextInput {...field} />
            {!!errors.title && <Text>{errors.title.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'text'}
        control={control}
        rules={validationSchema.text}
        render={({ field }) => (
          <>
            <Text>{TEXT_LABEL}</Text>
            <TextInput {...field} />
            {!!errors.text && <Text>{errors.text.message}</Text>}
          </>
        )}
      />
      {/* 写真の更新用コンポーネントも用意する */}
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
