import { Controller } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';

import { TITLE_LABRL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { UpdateModelCourseFormProps } from './types';

export const UpdateModelCourseForm = ({ modelCourseId }: UpdateModelCourseFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ modelCourseId });

  return (
    <View style={styles.container}>
      <Controller
        name={'title'}
        control={control}
        rules={validationSchema.title}
        render={({ field }) => (
          <View>
            <Text>{TITLE_LABRL}</Text>
            <TextInput {...field} />
            {errors.title && <Text>{errors.title.message}</Text>}
          </View>
        )}
      />
      {/* 観光地のID配列を送るためのコンポーネントを配置する */}
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
