import { View, Button } from 'react-native';

import { useAuth } from '@/lib/auth';

import { styles } from './styles';

import type { DisplayContentChangeButtonGroupProps } from './types';

export const DisplayContentChangeButtonGroup = ({
  userId,
  handlePressChangeContentButton,
}: DisplayContentChangeButtonGroupProps) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="モデルコース" onPress={() => handlePressChangeContentButton('modelCourses')} />
      <Button title="旅のしおり" onPress={() => handlePressChangeContentButton('travelBooklets')} />
      {user?.id === userId && (
        <>
          <Button
            title="ブックマークしたコース"
            onPress={() => handlePressChangeContentButton('bookmarkedModelCourses')}
          />
          <Button
            title="ブックマークした観光地"
            onPress={() => handlePressChangeContentButton('bookmarkedTravelSpots')}
          />
        </>
      )}
    </View>
  );
};
