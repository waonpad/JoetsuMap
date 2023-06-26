import React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useLocationTracking } from '@/lib/locationTracking';

export type MapProps = {
  children?: React.ReactNode;
};

// https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
export const Map = ({ children }: MapProps) => {
  const locationTracking = useLocationTracking();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: locationTracking.currentLocation?.lat ?? 37.14804525484053,
          longitude: locationTracking.currentLocation?.lng ?? 138.23628563899265,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {children}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 300,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
