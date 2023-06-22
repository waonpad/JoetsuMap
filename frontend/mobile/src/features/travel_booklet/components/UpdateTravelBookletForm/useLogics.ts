// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useTravelBooklet } from '../../api/getTravelBooklet';
import { useUpdateTravelBooklet } from '../../api/updateTravelBooklet';

import type { UpdateTravelBookletFormInput, UpdateTravelBookletFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ travelBookletId }: UpdateTravelBookletFormProps) => {
  const travelBookletQuery = useTravelBooklet({ travelBookletId });

  const updateTravelBookletMutation = useUpdateTravelBooklet();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTravelBookletFormInput>({
    mode: 'onBlur',
    defaultValues: { ...travelBookletQuery.data?.travelBooklet },
  });

  const onSubmit: SubmitHandler<UpdateTravelBookletFormInput> = (
    data: UpdateTravelBookletFormInput,
  ) => {
    updateTravelBookletMutation.mutate({ travelBookletId, data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
