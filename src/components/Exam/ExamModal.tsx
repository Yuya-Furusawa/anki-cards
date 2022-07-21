import * as React from 'react';

import type { Card } from 'utils/types';
import BlackFilter from 'components/BlackFilter';
import ExamCard from './ExamCard';
import useScrollLock from 'utils/useScrollLock';

type Props = {
  examCardsList: Card[];
  onCloseModal: () => void;
};

const ExamModal: React.FC<Props> = React.memo(
  ({ examCardsList, onCloseModal }) => {
    const [cardIndex, setCardIndex] = React.useState<number>(0);
    const card = examCardsList[cardIndex];
    const onMoveNext = React.useCallback(
      () => setCardIndex((idx) => idx + 1),
      []
    );

    useScrollLock(true);

    return (
      <>
        <BlackFilter onClick={onCloseModal} />
        <ExamCard
          card={card}
          isLast={cardIndex + 1 === examCardsList.length}
          onMoveNext={onMoveNext}
          onCloseModal={onCloseModal}
        />
      </>
    );
  }
);

ExamModal.displayName = 'ExamModal';

export default ExamModal;
