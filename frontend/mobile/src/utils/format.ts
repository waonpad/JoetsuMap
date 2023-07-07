import { default as dayjs } from 'dayjs';

export const formatDate = (date: number | Date) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatDateToMonthDay = (date: number | Date) => dayjs(date).format('MMMM D');
