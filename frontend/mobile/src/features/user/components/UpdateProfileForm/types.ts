import type { UpdateProfileDTO } from '../../api/updateProfile';
import type { User } from '../../types';

export type UpdateProfileFormProps = {
  userId: User['id'];
};

export type UpdateProfileFormInput = UpdateProfileDTO['data'];
