import type { RegisterCredentialsDTO } from '../../api/register';

export type RegisterFormProps = {
  defaultValues?: RegisterFormInput;
};

export type RegisterFormInput = RegisterCredentialsDTO;
