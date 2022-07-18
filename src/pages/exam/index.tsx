import * as React from 'react';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import DeckSelector from 'components/Exam/DeckSelector';
import MethodSelector from '../../components/Exam/MethodSelector';
import { methods } from 'utils/methods';
import shuffleArray from 'utils/shuffleArray';
import styles from './index.module.scss';

import type { Card, Deck } from 'utils/types';
import ExamModal from '../../components/Exam/ExamModal';

const Exam: React.FC = () => {
  const [decks, setDecks] = React.useState<Deck[]>([]);
  //selectedDeckにはdeckのidがnumber型で入っている（DBの型と合わせるため）
  //0は何も選択されていない状態
  const [selectedDeck, setSelectedDeck] = React.useState<number>(0);
  //selectedMethodにはmethodのidがnumber型で入っている
  //0は何も選択されていない状態
  const [selectedMethod, setSelectedMethod] = React.useState<number>(0);

  const [cards, setCards] = React.useState<Card[]>([]);
  const [testCards, setTestCards] = React.useState<Card[]>([]);

  const [modal, setModal] = React.useState<boolean>(false);
  const onCloseModal = React.useCallback(() => setModal(false), []);

  // ボタンを押した時の挙動
  const router = useRouter();
  const onClickBack = React.useCallback(() => router.push('/'), [router]);

  // デッキデータの取得
  React.useEffect(() => {
    fetch('/api/decks')
      .then((res) => res.json())
      .then((data) => setDecks(data));
  }, []);

  // カードデータを取得する
  // 通信を抑える為に最初に一回だけ取得する
  React.useEffect(() => {
    fetch('/api/cards')
      .then((res) => res.json())
      .then((cards) => setCards(cards));
  }, []);

  // テストするカードのリストを作成
  React.useEffect(() => {
    const filteredCards = cards.filter(
      (card: Card) => card.deck === selectedDeck
    );
    setTestCards(() =>
      selectedMethod === 1 ? shuffleArray(filteredCards) : filteredCards
    );
  }, [cards, selectedDeck, selectedMethod]);

  return (
    <>
      <div className="container">
        <div className={styles.title}>テストをする</div>
        <div className={styles.selectors}>
          <div className={styles.choice}>
            <h3>デッキを選ぶ</h3>
            <DeckSelector
              items={decks}
              selected={selectedDeck}
              placeholder="デッキを選んでください"
              onSelect={setSelectedDeck}
            />
          </div>
          <div className={styles.choice}>
            <h3>テストの方法を選ぶ</h3>
            <MethodSelector
              items={methods}
              selected={selectedMethod}
              placeholder="テストの方法を選んでください"
              onSelect={setSelectedMethod}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          {selectedDeck !== 0 && selectedMethod !== 0 && (
            <Button
              color="blue"
              text="スタート"
              onClick={() => setModal(true)}
            />
          )}
          <Button color="gray" text="トップに戻る" onClick={onClickBack} />
        </div>
      </div>

      {modal && (
        <ExamModal examCardsList={testCards} onCloseModal={onCloseModal} />
      )}
    </>
  );
};

export default Exam;
