// APIとの通信を行う、コアなロジック

import { useUser } from '../../api/getUser';

import type { ProfileDetailProps } from './types';

export const useLogics = ({ userId }: ProfileDetailProps) => {
  const userQuery = useUser({ userId });

  return {
    userQuery,
  };
};
