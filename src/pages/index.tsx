import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

const Home = React.memo(() => (
  <div className="container">
    <div className={styles.top_image}>
      <Image
        src="https://res.cloudinary.com/dbbtfr2i5/image/upload/v1654952306/AnkiCards/20944341_hwif0m.jpg"
        alt="ホーム画面画像"
        width={500}
        height={500}
      />
    </div>
    <div className={styles.buttons}>
      <Link href="/exam">
        <div className={`${styles.button} ${styles.primary}`}>
          <a>テストをする</a>
        </div>
      </Link>
      <Link href="/create/test">
        <div className={`${styles.button} ${styles.secondary}`}>
          <a>テストをつくる</a>
        </div>
      </Link>
    </div>
  </div>
));

Home.displayName = 'Home';

export default Home;
