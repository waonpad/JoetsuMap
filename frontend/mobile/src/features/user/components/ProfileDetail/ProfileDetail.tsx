import { View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ProfileDetailProps } from './types';

export const ProfileDetail = ({ userId }: ProfileDetailProps) => {
  const { userQuery } = useLogics({ userId });

  return <View style={styles.container}>{userQuery.data?.user?.username}</View>;
};
