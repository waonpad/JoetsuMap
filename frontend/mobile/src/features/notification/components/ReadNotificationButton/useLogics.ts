// APIとの通信を行う、コアなロジック

import { useReadNotification } from '../../api/readNotification';

import type { ReadNotificationButtonProps } from './types';

export const useLogics = ({ notificationId }: ReadNotificationButtonProps) => {
  const readNotificationMutation = useReadNotification();

  const handlePressRead = () => {
    readNotificationMutation.mutate({ notificationId });
  };

  return {
    readNotificationMutation,
    handlePressRead,
  };
};
