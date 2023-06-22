// APIとの通信を行う、コアなロジック

import { useDeleteTravelBooklet } from '../../api/deleteTravelBooklet';

import type { DeleteTravelBookletButtonProps } from './types';

export const useLogics = ({ travelBookletId }: DeleteTravelBookletButtonProps) => {
  const deleteTravelBookletMutation = useDeleteTravelBooklet();

  const handlePressDelete = () => {
    deleteTravelBookletMutation.mutate({ travelBookletId });
  };

  return {
    deleteTravelBookletMutation,
    handlePressDelete,
  };
};
