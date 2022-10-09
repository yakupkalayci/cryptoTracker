import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'

import {CoinProvider} from "../context/CoinContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CoinProvider>
        <Component {...pageProps} />
      </CoinProvider>
    </ChakraProvider>
  )
}

export default MyApp
