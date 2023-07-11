// APIとの通信を行う、コアなロジック

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import type { TravelSpot } from '@/features/travel_spot';
import { setValidationErrors } from '@/utils/compute';

import { useCreateModelCourse } from '../../api/createModelCourse';

import type { CreateModelCourseFormInput } from '../CreateModelCourseForm/types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { useModelCourseNavigation } from '../../navigation/ModelCourseNavigator';

export const useLogics = ({
  defaultValues,
}: {
  defaultValues?: Partial<CreateModelCourseFormInput>;
}) => {
  const createModelCourseMutation = useCreateModelCourse();

  const modelCOurseNavigation = useModelCourseNavigation();

  const [travelSpots, setTravelSpots] = useState<TravelSpot[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<CreateModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<CreateModelCourseFormInput> = (
    data: CreateModelCourseFormInput,
  ) => {
    data.travelSpotIds = travelSpots.map((travelSpot) => travelSpot.id);

    if (data.travelSpotIds.length < 2) {
      setError('travelSpotIds', {
        type: 'min',
      });
      return;
    }
    if (data.travelSpotIds.length > 10) {
      setError('travelSpotIds', {
        type: 'max',
      });
      return;
    }

    createModelCourseMutation.mutate(
      { data },
      {
        onError: (error) =>
          setValidationErrors({ errors: error?.response?.data.error.validation, setError }),
        onSuccess: () => {
          modelCOurseNavigation.navigate('ModelCourseHome', {});
        },
      },
    );
  };

  const handlePressSubmitButton = (e: GestureResponderEvent) => {
    clearErrors();
    handleSubmit(onSubmit)(e);
  };

  return {
    control,
    handlePressSubmitButton,
    errors,
    travelSpots,
    setTravelSpots,
  };
};
