import { Avatar } from 'native-base';
import { Marker } from 'react-native-maps';

import { imageSourceUri } from '@/utils/compute';

import type { TravelSpotMapMarkerProps } from './types';

export const TravelSpotMapMarker = ({ travelSpot, ...props }: TravelSpotMapMarkerProps) => {
  return (
    <Marker {...props}>
      <Avatar
        source={{ uri: imageSourceUri(travelSpot.icon) }}
        borderColor={'yellow.200'}
        borderWidth={2}
      />
    </Marker>
  );
};
