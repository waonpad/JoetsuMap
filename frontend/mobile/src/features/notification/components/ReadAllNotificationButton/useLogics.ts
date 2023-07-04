// APIとの通信を行う、コアなロジック

import { useReadAllNotification } from '../../api/readAllNotification';

export const useLogics = () => {
  const readAllNotificationMutation = useReadAllNotification();

  const handlePressReadAll = () => {
    readAllNotificationMutation.mutate(undefined);
  };

  return {
    readAllNotificationMutation,
    handlePressReadAll,
  };
};
