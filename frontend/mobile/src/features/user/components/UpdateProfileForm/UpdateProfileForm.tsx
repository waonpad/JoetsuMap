import { Controller } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';

import { USERNAME_LABRL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { UpdateProfileFormProps } from './types';

export const UpdateProfileForm = ({ userId }: UpdateProfileFormProps) => {
  const { control, handlePressSubmitButton, errors } = useLogics({ userId });

  return (
    <View style={styles.container}>
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
      <Button title={SUBMIT_LABEL} onPress={handlePressSubmitButton} />
    </View>
  );
};
