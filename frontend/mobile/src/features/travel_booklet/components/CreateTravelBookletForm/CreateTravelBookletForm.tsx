import { Text, Input, Button, Box, TextArea, Pressable } from 'native-base';
import { Controller } from 'react-hook-form';
import { View, Image } from 'react-native';

import { TITLE_LABRL, TEXT_LABEL, SUBMIT_LABEL } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { validationSchema } from './validationSchema';

import type { CreateTravelBookletFormProps } from './types';

export const CreateTravelBookletForm = ({ defaultValues }: CreateTravelBookletFormProps) => {
  const { photo, handleChoosePhoto, control, handlePressSubmitButton, errors } = useLogics({
    defaultValues,
  });

  return (
    <View style={styles.container}>
      {/* 作成ボタンisどこに配置 */}
      <Button
        onPress={handlePressSubmitButton}
        size={'sm'}
        style={{ position: 'absolute', top: 10, right: 0, width: 100, zIndex: 1 }}
        _text={{ bold: true }}>
        {SUBMIT_LABEL}
      </Button>
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', paddingBottom: 20 }}>
        {photo ? (
          <Pressable onPress={handleChoosePhoto}>
            <Image source={{ uri: photo?.uri }} style={{ width: '100%', height: 200 }} />
          </Pressable>
        ) : (
          <Box
            width={'100%'}
            height={200}
            backgroundColor={'gray.200'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Button width={'50%'} onPress={handleChoosePhoto}>
              写真を選択
            </Button>
          </Box>
        )}
      </View>
      <View style={{ flex: 1.1, width: '100%' }}>
        {/* モデルコースのタイトル */}
        <Controller
          name={'title'}
          control={control}
          rules={validationSchema.title}
          render={({ field: { onChange, onBlur, value } }) => (
            <Box textAlign={'left'} width={'100%'}>
              <Text>{TITLE_LABRL}</Text>
              <Input onBlur={onBlur} onChangeText={onChange} value={value as string} />
              {errors.title && <Text>{errors.title.message}</Text>}
            </Box>
          )}
        />
        <Controller
          name={'text'}
          control={control}
          rules={validationSchema.text}
          render={({ field: { onChange, onBlur, value } }) => (
            <Box textAlign={'left'} width={'100%'}>
              <Text>{TEXT_LABEL}</Text>
              <TextArea
                onBlur={onBlur}
                onChangeText={onChange}
                value={value as string}
                autoCompleteType={'off'}
                h={190}
              />
              {errors.text && <Text>{errors.text.message}</Text>}
            </Box>
          )}
        />
      </View>
    </View>
  );
};
