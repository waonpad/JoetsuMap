import { Input, Text } from 'native-base';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { SEARCH_TRAVEL_SPOT_INPUT_PLACEHOLDER } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { SearchTravelSpotFormProps } from './types';

export const SearchTravelSpotForm = ({
  defaultValues,
  onSubmitAction,
}: SearchTravelSpotFormProps) => {
  const { control, handlePressKeyForHandleSubmit, errors } = useLogics({
    defaultValues,
    onSubmitAction,
  });

  return (
    <View style={styles.container}>
      <Controller
        name={'freeKeyword'}
        control={control}
        rules={validationSchema.freeKeyword}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onKeyPress={handlePressKeyForHandleSubmit}
              placeholder={SEARCH_TRAVEL_SPOT_INPUT_PLACEHOLDER}
            />
            {errors.freeKeyword && <Text>{errors.freeKeyword.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
