module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
        },
      ],
      // [
      //   'dotenv-import',
      //   {
      //     moduleName: '@env',
      //     path: '.env',
      //     blacklist: null,
      //     whitelist: null,
      //     safe: false,
      //     allowUndefined: false,
      //   },
      // ],
      'babel-plugin-transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
  };
};
