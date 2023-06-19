import * as TaskManager from 'expo-task-manager';

import { BACK_LOCATION_TRACKING_TASK_NAME } from '@/constants';

import type { LocationObject } from 'expo-location';

export const backgroundLocationTrackingTaskDefinition = () => {
  return TaskManager.defineTask(BACK_LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      // Extract location coordinates from data
      const { locations } = data as { locations: LocationObject[] };
      const location = locations[0];
      if (location) {
        console.log('Location in background', location.coords);
      }
    }
  });
};
