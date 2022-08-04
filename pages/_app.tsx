import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {Chakra} from '../helpers/darkModeWrapper';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default MyApp;
