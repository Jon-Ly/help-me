import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import React from 'react'

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
