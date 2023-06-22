import { Controller } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

import { TITLE_LABRL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { CreateModelCourseFormProps } from './types';

export const CreateModelCourseForm = ({ defaultValues }: CreateModelCourseFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ defaultValues });

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
      {/* 観光地のID配列を送るためのコンポーネントを配置する */}
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
