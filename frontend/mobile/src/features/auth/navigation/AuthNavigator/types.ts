import type { LoginScreenParams } from '../../screens/LoginScreen/types';
import type { RegisterScreenParams } from '../../screens/RegisterScreen/types';
import type { ResetPasswordScreenParams } from '../../screens/ResetPasswordScreen/types';

export type AuthNavigationParamList = {
  Login: LoginScreenParams;
  Register: RegisterScreenParams;
  ResetPassword: ResetPasswordScreenParams;
};
