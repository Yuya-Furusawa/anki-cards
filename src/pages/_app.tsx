import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AppProps } from 'next/app';

import 'styles/global.scss';
import styles from './_app.module.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Anki-Cards</title>
    </Head>
    <nav className={styles.header}>
      <div className="container">
        <Link href="/">
          <a>AnkiCards</a>
        </Link>
      </div>
    </nav>
    <main>
      <Component {...pageProps} />
    </main>
  </>
);

export default MyApp;
