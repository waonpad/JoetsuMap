// const PROFILE = process.env.EAS_BUILD_PROFILE ?? 'development';

const COMMON_CONFIGS = {
  expo: {
    extra: {
      eas: {
        projectId: 'dcf2b1df-dd2d-4b60-8179-f7ab3d0afdac',
      },
    },
    name: 'joetsumap',
    slug: 'joetsumap',
    version: '1.0.0',
    sdkVersion: '48.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'The Beep App uses your location to pick origins, destinations, and predict ride times',
        NSLocationAlwaysUsageDescription:
          // eslint-disable-next-line quotes
          "The Beep App will use your location to provide ETA's to yourself and others",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          // eslint-disable-next-line quotes
          "The Beep App will use your location to provide ETA's to yourself and others",
        UIBackgroundModes: ['location', 'fetch'],
      },
      bundleIdentifier: 'com.waonpad.joetsumap',
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'com.waonpad.joetsumap',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'FOREGROUND_SERVICE',
        'ACCESS_BACKGROUND_LOCATION',
      ],
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    platforms: ['ios', 'android', 'web'],
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
          locationAlwaysPermission: 'Allow $(PRODUCT_NAME) to use your location.',
          locationWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
          isIosBackgroundLocationEnabled: true,
          isAndroidBackgroundLocationEnabled: true,
        },
      ],
    ],
  },
};

module.exports = () => {
  return {
    ...COMMON_CONFIGS,
  };
};
