// APIとの通信を行う、コアなロジック

import { useMyNotifications } from '../../api/getMyNotifications';

export const useLogics = () => {
  const notificationsQuery = useMyNotifications();

  return {
    notificationsQuery,
  };
};
