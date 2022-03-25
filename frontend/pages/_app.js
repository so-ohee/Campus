import Head from "next/head";
import Layout from "./Layout";

// css
import "/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script"
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Campus</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6aa07b0f5d18874d44c830b57f8392a0&libraries=services,clusterer&autoload=false"
        type="text/babel"
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

