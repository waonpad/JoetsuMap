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
import type { StyleProp } from 'react-native';

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
      defaultProps: {},
    },
    Button: {
      defaultProps: {
        bg: '#748FE8',
      },
    },
    Input: {
      defaultProps: {
        bg: '#fff',
      },
    },
    TextArea: {
      defaultProps: {
        bg: '#fff',
      },
    },
  },
});

export const commonHeaderStyle: StyleProp<{
  backgroundColor?: string;
}> = {
  backgroundColor: '#e0ffff',
};
