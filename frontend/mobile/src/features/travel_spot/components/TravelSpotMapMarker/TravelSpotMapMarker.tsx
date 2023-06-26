import { Marker } from 'react-native-maps';

import type { TravelSpotMapMarkerProps } from './types';

export const TravelSpotMapMarker = ({ travelSpot, ...props }: TravelSpotMapMarkerProps) => {
  return <Marker {...props} />;
};
