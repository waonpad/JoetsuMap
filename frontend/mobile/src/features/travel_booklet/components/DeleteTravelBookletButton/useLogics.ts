// APIとの通信を行う、コアなロジック

import { useDeleteTravelBooklet } from '../../api/deleteTravelBooklet';

import type { DeleteTravelBookletButtonProps } from './types';

export const useLogics = ({ travelBookletId }: DeleteTravelBookletButtonProps) => {
  const deleteTravelBookletQuery = useDeleteTravelBooklet();

  const handlePressDelete = () => {
    deleteTravelBookletQuery.mutate({ travelBookletId });
  };

  return {
    deleteTravelBookletQuery,
    handlePressDelete,
  };
};
