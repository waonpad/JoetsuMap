import { Controller } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { SearchTravelSpotFormProps } from './types';

export const SearchTravelSpotForm = ({
  defaultValues,
  onSubmitAction,
}: SearchTravelSpotFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useLogics({ defaultValues, onSubmitAction });

  return (
    <View style={styles.container}>
      <Controller
        name={'freeKeyword'}
        control={control}
        rules={validationSchema.freeKeyword}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>キーワード</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.freeKeyword && <Text>{errors.freeKeyword.message}</Text>}
          </>
        )}
      />
      <Button title="検索" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
