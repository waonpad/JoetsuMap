import { Image } from 'expo-image';
import { Button, Text, View } from 'react-native';

import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { getSizeFromFileName, imageSourceUri, resizeByHeight } from '@/utils/compute';

import { DeleteTravelBookletButton } from '../DeleteTravelBookletButton';

import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletListItemProps } from './types';

export const TravelBookletListItem = ({ travelBooklet }: TravelBookletListItemProps) => {
  const { user } = useAuth();

  const { handleNavigateToDetail, handleNavigateToAuthorProfile, handleNavigateToUpdate } =
    useUtils({ travelBooklet });

  return (
    <View style={styles.container}>
      <Text>{travelBooklet.title}</Text>
      <Text>{travelBooklet.text}</Text>
      <Image
        source={{
          uri: imageSourceUri(travelBooklet.photo),
        }}
        style={{
          ...resizeByHeight(100, getSizeFromFileName(travelBooklet.photo)),
        }}
      />
      <Authorization policyCheck={POLICIES['common:delete'](user, travelBooklet)}>
        <DeleteTravelBookletButton travelBookletId={travelBooklet.id} />
      </Authorization>
      <Authorization policyCheck={POLICIES['common:update'](user, travelBooklet)}>
        <Button title={'編集'} onPress={handleNavigateToUpdate} />
      </Authorization>
      <Text>{travelBooklet.author.username}</Text>
      <Button title={'作成者のページに移動'} onPress={handleNavigateToAuthorProfile} />
      <Button title={'詳細ページに移動'} onPress={handleNavigateToDetail} />
    </View>
  );
};
