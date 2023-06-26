import { TouchableOpacity, View } from 'react-native';

import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export const CustomTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={(e) => {
        onPress?.(e);
      }}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
