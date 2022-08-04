import React from 'react';
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme,
  localStorageManager,
} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

export function Chakra({cookies, children}: any) {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === 'string' ?
      cookieStorageManagerSSR(cookies) :
      localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({req}: any) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}
