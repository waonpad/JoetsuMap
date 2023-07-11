import { Controller } from 'react-hook-form';
import { Image } from 'react-native';
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
  const {
    control,
    handlePressSubmitButton,
    errors,
    isAlreadyExistsError,
    icon,
    handleChoosePhoto,
  } = useLogics({
    defaultValues,
  });

  return (
    <View style={styles.container}>
      {/* 簡易実装 */}
      {icon && <Image source={{ uri: icon?.uri }} style={{ width: 300, height: 300 }} />}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Controller
        name={'username'}
        control={control}
        rules={validationSchema.username}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{USERNAME_LABRL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.username && <Text>{errors.username.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'email'}
        control={control}
        rules={validationSchema.email}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{EMAIL_LABEL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.email && <Text>{errors.email.message}</Text>}
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
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.password && <Text>{errors.password.message}</Text>}
          </>
        )}
      />
      <Controller
        name={'confirmPassword'}
        control={control}
        rules={validationSchema.confirmPassword}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>{CONFIRM_PASSWORD_LABEL}</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value as string} />
            {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />
      <Text>{isAlreadyExistsError && 'Already exists'}</Text>
      <Button title={SUBMIT_LABEL} onPress={handlePressSubmitButton} />
    </View>
  );
};
