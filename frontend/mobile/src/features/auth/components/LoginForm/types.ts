import type { LoginCredentialsDTO } from '../../api/login';

export type LoginFormProps = {
  defaultValues?: LoginFormInput;
};

export type LoginFormInput = LoginCredentialsDTO;
