import type { TravelSpot } from '../../types';
import type { MapMarkerProps } from 'react-native-maps';

export type TravelSpotMapMarkerProps = MapMarkerProps & {
  travelSpot: TravelSpot;
};
