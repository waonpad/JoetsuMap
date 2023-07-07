// APIとの通信を行う、コアなロジック

import { useNotification } from '../../api/getNotification';

import type { NotificationDetailProps } from './types';

export const useLogics = ({ notificationId }: NotificationDetailProps) => {
  const notificationQuery = useNotification({ notificationId });

  return {
    notificationQuery,
  };
};
