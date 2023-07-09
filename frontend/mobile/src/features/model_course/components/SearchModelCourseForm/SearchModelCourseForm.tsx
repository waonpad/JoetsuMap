import { Box, Input, Text } from 'native-base';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SEARCH_MODEL_COURSE_INPUT_PLACEHOLDER } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { SearchModelCourseFormProps } from './types';

export const SearchModelCourseForm = ({
  defaultValues,
  onSubmitAction,
}: SearchModelCourseFormProps) => {
  const { control, handlePressSubmitKey, errors } = useLogics({
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
              InputLeftElement={
                <Box marginLeft={2}>
                  <Icon name="search" size={16} color={'gray'} />
                </Box>
              }
              placeholder={SEARCH_MODEL_COURSE_INPUT_PLACEHOLDER}
              returnKeyType="search"
              onSubmitEditing={handlePressSubmitKey}
            />
            {errors.freeKeyword && <Text>{errors.freeKeyword.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
