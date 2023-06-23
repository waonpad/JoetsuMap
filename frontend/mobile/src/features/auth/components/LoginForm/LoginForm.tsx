import { Controller } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

import { USERNAME_LABRL, PASSWORD_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { LoginFormProps } from './types';

export const LoginForm = ({ defaultValues }: LoginFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ defaultValues });

  return (
    <View style={styles.container}>
      <Controller
        name={'username'}
        control={control}
        rules={validationSchema.username}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{USERNAME_LABRL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.username && <Text>{errors.username.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'password'}
        control={control}
        rules={validationSchema.password}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{PASSWORD_LABEL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.password && <Text>{errors.password.message}</Text>}
          </>
        )}
      />
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
