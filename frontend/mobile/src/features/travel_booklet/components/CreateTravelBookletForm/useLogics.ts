// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useCreateTravelBooklet } from '../../api/createTravelBooklet';

import type { UpdateTravelBookletFormInput } from '../UpdateTravelBookletForm/types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({
  defaultValues,
}: {
  defaultValues?: Partial<UpdateTravelBookletFormInput>;
}) => {
  const createTravelBookletMutation = useCreateTravelBooklet();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTravelBookletFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<UpdateTravelBookletFormInput> = (
    data: UpdateTravelBookletFormInput,
  ) => {
    createTravelBookletMutation.mutate({ data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
