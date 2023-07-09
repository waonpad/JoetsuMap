// import { createTheme } from '@rneui/themed';

// import type { CreateThemeOptions } from '@rneui/themed';

// export const theme: CreateThemeOptions = createTheme({
//   lightColors: {
//     primary: '#e7e7e8',
//   },
//   darkColors: {
//     primary: '#000',
//   },
//   components: {},
//   mode: 'light',
// });

import { extendTheme, theme as nativaBasedefaultTheme } from 'native-base';

import type { ITheme } from 'native-base';

export const theme: ITheme = extendTheme({
  colors: {
    primary: {},
    text: nativaBasedefaultTheme.colors.coolGray,
    bg: nativaBasedefaultTheme.colors.coolGray,
  },
  components: {
    Avatar: {
      defaultProps: {
        size: 'md',
      },
    },
    HStack: {
      defaultProps: {
        justifyContent: 'space-between',
        width: '100%',
      },
    },
    Button: {
      defaultProps: {
        bg: '#748FE8',
      },
    },
  },
});
