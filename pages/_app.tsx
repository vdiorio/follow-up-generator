import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} theme={theme} />
    </ChakraProvider>
  );
}

export default MyApp;
