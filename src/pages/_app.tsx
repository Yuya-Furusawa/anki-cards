import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AppProps } from 'next/app';

import 'styles/global.scss';
import styles from './_app.module.scss';
import Spacer from 'components/Spacer';

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
      <Spacer size='60px'/>
    </main>
  </>
);

export default MyApp;
