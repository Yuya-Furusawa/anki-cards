import * as React from 'react';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import styles from './deck.module.scss';

const Deck: React.FC = React.memo(() => {
  const [deckName, setDeckName] = React.useState<string>('');
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const router = useRouter();
  const onClickBack = React.useCallback(() => {
    router.push('/');
  }, [router]);

  const onSubmit = React.useCallback(() => {
    const data = {
      name: deckName,
    };
    fetch('/api/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // データ送信後のクリアリング
    setDeckName('');
    setIsSubmit(true);
  }, [deckName]);

  return (
    <div className="container">
      <div className={styles.title}>デッキを作成する</div>

      <div className={styles.create_deck}>
        <h3>作成するデッキのタイトルを入力する</h3>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        {isSubmit && <div className={styles.message}>デッキを追加しました</div>}
        <Button color="blue" text="作成する" onClick={onSubmit} />
        <Button color="gray" text="トップに戻る" onClick={onClickBack} />
      </div>
    </div>
  );
});

Deck.displayName = 'Deck';

export default Deck;
