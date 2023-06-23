// APIとの通信を行う、コアなロジック

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';

import type { LoginFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues }: { defaultValues?: Partial<LoginFormInput> }) => {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = (data: LoginFormInput) => {
    login(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
