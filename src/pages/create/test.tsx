import * as React from 'react';
import { useRouter } from 'next/router';

import DeckSelector from 'components/Exam/DeckSelector';
import Link from 'next/link';
import Button from 'components/Button';
import type { Deck } from 'utils/types';

import styles from './test.module.scss';
import InputCard from 'components/Create/InputCard';

const Test: React.FC = React.memo(() => {
  const [decks, setDecks] = React.useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = React.useState<number>(0);
  const [face, setFace] = React.useState<string>('');
  const [back, setBack] = React.useState<string>('');
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const router = useRouter();
  const onClickBack = React.useCallback(() => {
    router.push('/');
  }, [router]);

  // デッキデータの取得
  React.useEffect(() => {
    fetch('/api/decks')
      .then((res) => res.json())
      .then((data) => setDecks(data));
  }, []);

  const onSubmit = React.useCallback(() => {
    const data = {
      deck: selectedDeck,
      face: face,
      back: back,
    };
    fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    alert(
      `おもて：${face}\nうら：${back}\nでデッキ${selectedDeck}に追加しました`
    );

    // API送信後はstateをclearする
    setSelectedDeck(0);
    setFace('');
    setBack('');

    // API送信後にメッセージを表示する
    setIsSubmit(true);
  }, [selectedDeck, face, back]);

  return (
    <div className="container">
      <div className={styles.title}>テストをつくる</div>

      <div className={styles.select_deck}>
        <h3>追加するデッキを選ぶ</h3>
        <DeckSelector
          items={decks}
          selected={selectedDeck}
          placeholder="デッキを選ぶ"
          onSelect={setSelectedDeck}
        />
        <div className={styles.spacer} />
        <Link href="/create/deck">
          <a>新たにデッキを作成する</a>
        </Link>
      </div>

      <div className={styles.input_card}>
        <h3>デッキに追加するカードを入力する</h3>
        <InputCard title="おもて" value={face} onChange={setFace} />
        <InputCard title="うら" value={back} onChange={setBack} />
      </div>

      <div className={styles.buttons}>
        {isSubmit && <div className={styles.message}>カードを追加しました</div>}
        <Button color="blue" text="追加する" onClick={onSubmit} />
        <Button color="gray" text="トップに戻る" onClick={onClickBack} />
      </div>
    </div>
  );
});

Test.displayName = 'Test';

export default Test;
