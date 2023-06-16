import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { NotficationListItemProps } from './types';

export const NotficationListItem = ({ notification }: NotficationListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
