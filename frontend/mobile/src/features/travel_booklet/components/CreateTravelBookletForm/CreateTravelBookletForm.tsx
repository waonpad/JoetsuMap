import { Controller } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

import { TITLE_LABRL, TEXT_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { CreateTravelBookletFormProps } from './types';

export const CreateTravelBookletForm = ({ defaultValues }: CreateTravelBookletFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ defaultValues });

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
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.text && <Text>{errors.text.message}</Text>}
          </>
        )}
      />
      {/* 写真の投稿用コンポーネントも用意する */}
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
