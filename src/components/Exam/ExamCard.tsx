import * as React from 'react';

import type { Card } from 'utils/types';

import Button from 'components/Button';
import styles from './ExamCard.module.scss';

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

    return (
      <div className={styles.modal}>
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
          <Button color="gray" text="テストをやめる" onClick={onCloseModal} />
        </div>
      </div>
    );
  }
);

ExamCard.displayName = 'ExamCard';

export default ExamCard;
