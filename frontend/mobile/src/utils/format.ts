import { default as dayjs } from 'dayjs';
import _ from 'lodash';

import type { UserResponse } from '@/features/auth';

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const omitToken = (user: UserResponse) => _.omit(user, ['accessToken']);
