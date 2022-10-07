import '../styles/globals.css'

import {CoinProvider} from "../context/CoinContext";

function MyApp({ Component, pageProps }) {
  return (
  <CoinProvider>
      <Component {...pageProps} />
  </CoinProvider>
  )
}

export default MyApp
