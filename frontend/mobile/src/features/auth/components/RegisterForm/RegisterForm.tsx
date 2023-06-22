import { Controller } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

import {
  USERNAME_LABRL,
  EMAIL_LABEL,
  PASSWORD_LABEL,
  CONFIRM_PASSWORD_LABEL,
  SUBMIT_LABEL,
} from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { RegisterFormProps } from './types';

export const RegisterForm = ({ defaultValues }: RegisterFormProps) => {
  const { control, handleSubmit, onSubmit, register, errors } = useLogics({ defaultValues });

  return (
    <View style={styles.container}>
      <Controller
        name={'username'}
        control={control}
        rules={validationSchema.username}
        render={() => (
          <>
            <Text>{USERNAME_LABRL}</Text>
            {/* {...field}だと型エラーで動かない？？？？？？？？？ */}
            <TextInput {...register('username')} />
            {!!errors.username && <Text>{errors.username.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'email'}
        control={control}
        rules={validationSchema.email}
        render={() => (
          <>
            <Text>{EMAIL_LABEL}</Text>
            <TextInput {...register('email')} />
            {!!errors.email && <Text>{errors.email.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'password'}
        control={control}
        rules={validationSchema.password}
        render={() => (
          <>
            <Text>{PASSWORD_LABEL}</Text>
            <TextInput {...register('password')} />
            {!!errors.password && <Text>{errors.password.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'confirmPassword'}
        control={control}
        rules={validationSchema.confirmPassword}
        render={() => (
          <>
            <Text>{CONFIRM_PASSWORD_LABEL}</Text>
            <TextInput {...register('confirmPassword')} />
            {!!errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />
      {/* ロールを設定するコンポーネントは多分不要 */}
      {/* アイコンを設定するコンポーネントを配置 */}
      <Button title={SUBMIT_LABEL} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
