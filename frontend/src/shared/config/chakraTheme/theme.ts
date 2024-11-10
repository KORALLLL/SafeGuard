import { extendTheme } from '@chakra-ui/react';
import 'shared/config/fonts/fonts.css'
import { ButtonTheme } from 'shared/ui';

export const theme = extendTheme({
  components: {
    Button: ButtonTheme,
    // Input: InputTheme,
    // Text: TextTheme,
  },
  fonts: {
    heading: 'TTFirsNeue, TTFirsNeue, TTFirsNeue, TTFirsNeue',
    body: 'TTFirsNeue, TTFirsNeue, TTFirsNeue, TTFirsNeue',
  },
  breakpoints: {
    sm: '100px',
    base: '1280px',
    md: '1920px',
    lg: '2560px',
  },
  styles: {
    global: {
      body: {
        height: '100vh',
        width: '100vw',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      '&::-webkit-scrollbar': {
        width: '0',
      },
      '&::-webkit-scrollbar-track': {
        width: '0',
      },
    },
  },
  colors: {
    violet: {
      200: '#BEBAE9',
      500: '#5F5ECF',
      600: '#4645A6',
    },
    gray: {
      100: '#F2F3F4',
      200: '#E4E4E6',
      500: '#353535',
      600: '#242424',
    },
    red: {
      400: '#F26D6D',
      500: '#AD2424',
    },
  },
})