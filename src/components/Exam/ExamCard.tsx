import * as React from 'react';

import type { Card } from 'utils/types';

import Button from 'components/Button';
import styles from './ExamCard.module.scss';
import Spacer from 'components/Spacer';

type Props = {
  card: Card;
  isLast: boolean;
  onMoveNext: () => void;
  onCloseModal: () => void;
};

const ExamCard: React.FC<Props> = React.memo(
  ({ card, isLast, onMoveNext, onCloseModal }) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    let classNames = styles.box;
    if (checked) {
      classNames += ' ' + styles.blue_bg;
    }

    const onClickNext = React.useCallback(() => {
      setChecked(false);
      onMoveNext();
    }, [onMoveNext]);

    // アドレスバーなどを除いた表示領域の高さを取得
    const viewHeight = React.useMemo(() => window.innerHeight, []);

    // 表示コンテンツの高さを取得
    const cardSizeRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState<number>(0);
    React.useEffect(() => {
      if (!cardSizeRef.current) return;
      setContentHeight(cardSizeRef.current.clientHeight);
    }, [cardSizeRef]);

    // 画面の下に固定するため、どのくらい要素を下げるか計算する
    const [offsetY, setOffsetY] = React.useState<number>(0);
    React.useEffect(() => {
      setOffsetY(viewHeight - contentHeight);
    }, [viewHeight, contentHeight]);

    return (
      <div
        className={styles.modal}
        ref={cardSizeRef}
        style={{ ['--offsetY' as any]: `${offsetY}px` }}
      >
        <div className={styles.boxes}>
          <div className={styles.box_container}>
            <p>おもて</p>
            <div className={styles.box}>{card.face}</div>
          </div>
          <div className={styles.box_container}>
            <p>うら</p>
            <div className={classNames}>{checked ? card.back : ''}</div>
          </div>
        </div>

        <div className={styles.buttons}>
          {!checked && (
            <Button
              color="orange"
              text="答えを見る"
              onClick={() => setChecked(true)}
            />
          )}
          {checked && !isLast && (
            <Button color="blue" text="次に進む" onClick={onClickNext} />
          )}
          {checked && isLast && (
            <Spacer size='50px' />
          )}
          <Button color="gray" text="テストをやめる" onClick={onCloseModal} />
        </div>
      </div>
    );
  }
);

ExamCard.displayName = 'ExamCard';

export default ExamCard;
