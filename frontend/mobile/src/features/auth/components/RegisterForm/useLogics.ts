// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';

import type { RegisterFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues }: { defaultValues?: Partial<RegisterFormInput> }) => {
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    register: registerForm,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues, roles: ['ROLE_USER'] },
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = (data: RegisterFormInput) => {
    register(data);
  };

  return {
    control,
    handleSubmit,
    register: registerForm,
    onSubmit,
    errors,
  };
};
