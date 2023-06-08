export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type ROLES = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MODERATOR';
