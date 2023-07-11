import type { User } from '../../types';

export type ContentLabel =
  | 'travelBooklets'
  | 'modelCourses'
  | 'bookmarkedModelCourses'
  | 'bookmarkedTravelSpots';

export type DisplayContentChangeButtonGroupProps = {
  userId: User['id'];
  onPress: (contentLabel: ContentLabel) => void;
};
