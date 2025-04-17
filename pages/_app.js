// pages/_app.js

import '@/styles/globals.css' // make sure the path is correct

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
