import * as React from 'react';

import type { User } from '@/features/user';

import { useAuth } from './auth';

export enum ROLES {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
}

type RoleTypes = keyof typeof ROLES;

const commonPolicy = (
  user: User | null,
  entity: {
    author: User;
    [key: string]: any;
  },
) => {
  if (!user) {
    return false;
  }
  if (user.roles.some((role) => role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR')) {
    return true;
  }
  if (user.roles.includes('ROLE_USER') && entity.author.id === user.id) {
    return true;
  }
  return false;
};

export const POLICIES = {
  'common:delete': commonPolicy,
  'common:update': commonPolicy,
};

export const useAuthorization = () => {
  const { user } = useAuth();

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        // return allowedRoles.some((role) => user.roles.includes(role));
        return allowedRoles.some((role) => user?.roles.some((userRole) => userRole.includes(role)));
      }

      return true;
    },
    [user?.roles],
  );

  return { checkAccess, role: user?.roles };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
