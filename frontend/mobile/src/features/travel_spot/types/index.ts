import type { User } from '@/features/user';
import type { BaseEntity, Photo, LatLng, Page } from '@/types';

type SPOTTYPE = 'FUN' | 'FOOD' | 'LEARN';

export type TravelSpot = {
  address: string;
  tel: string;
  name: string;
  types: SPOTTYPE[];
  icon: Photo;
  photo: Photo;
  coords: LatLng;
  author: User;
  bookmarkedUsers?: User[];
} & BaseEntity;

export type TravelSpotResponse = {
  travelSpot: TravelSpot;
};

export type TravelSpotListResponse = {
  travelSpots: TravelSpot[];
};

export type TravelSpotPageResponse = {
  travelSpots: Page<TravelSpot>;
};

export const typeMap: Record<TravelSpot['types'][number], string> = {
  FUN: '楽しむ',
  FOOD: '食べる',
  LEARN: '学ぶ',
};
