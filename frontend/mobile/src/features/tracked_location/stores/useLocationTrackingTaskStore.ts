import * as zustand from 'zustand';

import type { LocationSubscription } from 'expo-location';

export type LocationTrackingTaskStore = {
  foregroundSubscription: LocationSubscription | null;
};

export const useLocationTrakingTaskStore = zustand.create<LocationTrackingTaskStore>(() => ({
  foregroundSubscription: null,
}));
