import { default as dayjs } from 'dayjs';

import { typeMap, type TravelSpot } from '@/features/travel_spot';

export const formatDate = (date: number | Date) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatDateToMonthDay = (date: number | Date) => dayjs(date).format('M月D日');

export const formatTraveSpotType = (type: TravelSpot['types'][number]) => {
  return typeMap[type];
};
