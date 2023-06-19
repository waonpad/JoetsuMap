import type { User } from '@/features/user';
import type { BaseEntity, Photo, LatLng } from '@/types';

type SPOTTYPE = 'FUN' | 'FOOD' | 'LEARN';

export type TravelSpot = {
  address: string;
  tel: string;
  name: string;
  type: SPOTTYPE;
  photo: Photo;
  coords: LatLng;
  author: User;
} & BaseEntity;

export type TravelSpotResponse = {
  travelSpot: TravelSpot;
};

export type TravelSpotListResponse = {
  travelSpots: TravelSpot[];
};
