import { axios } from '@/lib/axios';
import type { PickedImage, ROLES } from '@/types';
import { createFormData } from '@/utils/form';

import { API_ENDPOINT, REGISTER } from '../constants';

import type { JwtResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  roles?: ROLES['name'][];
  icon?: PickedImage;
};

export const registerFn = async (data: RegisterCredentialsDTO): Promise<JwtResponse> => {
  return axios.post(
    `${API_ENDPOINT}/${REGISTER}`,
    // createFormData((data.icon && { icon: data.icon }) || {}, data),
    // {
    //   transformRequest: (data) => data,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // },
    data,
  );
};
