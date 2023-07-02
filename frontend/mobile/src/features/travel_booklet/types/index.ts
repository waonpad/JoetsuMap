import type { User } from '@/features/user';
import type { BaseEntity, Page, Photo } from '@/types';

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

export type TravelBookletPageResponse = {
  travelBooklets: Page<TravelBooklet>;
};
