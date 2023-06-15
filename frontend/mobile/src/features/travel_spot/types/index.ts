import type { User } from '@/features/user';
import type { BaseEntity, Photo, LatLng } from '@/types';

type SPOTTYPE = 'NATURE' | 'HISTORICAL' | 'FOOD' | 'SHOPPING' | 'OTHER';

export type TravelSpot = {
  address: string;
  tel: string;
  name: string;
  types: SPOTTYPE[];
  photos: Photo[];
  coords: LatLng;
  author: User;
} & BaseEntity;

export type TravelSpotResponse = {
  travelSpot: TravelSpot;
};

export type TravelSpotListResponse = {
  travelSpots: TravelSpot[];
};
