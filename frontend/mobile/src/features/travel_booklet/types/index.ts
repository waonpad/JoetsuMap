import type { User } from '@/features/user';
import type { BaseEntity, Photo } from '@/types';

export type TravelBooklet = {
  title: string;
  text: string;
  photo: Photo;
  author: User;
} & BaseEntity;

export type TravelBookletResponse = {
  travelBooklet: TravelBooklet;
};

export type TravelBookletListResponse = {
  travelBooklets: TravelBooklet[];
};
