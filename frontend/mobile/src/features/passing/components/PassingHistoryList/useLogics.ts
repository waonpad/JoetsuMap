// APIとの通信を行う、コアなロジック

import { useMyPassings } from '../../api/getMyPassings';

export const useLogics = () => {
  const myPassingsQuery = useMyPassings();

  return {
    myPassingsQuery,
  };
};
