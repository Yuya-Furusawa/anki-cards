import * as React from 'react';

import type { Deck } from 'utils/types';
import styles from './Selector.module.scss';

type Props = {
  items: Deck[];
  selected: number;
  placeholder: string;
  onSelect: (selected: number) => void;
};

const DeckSelector: React.FC<Props> = React.memo(
  ({ items, selected, placeholder, onSelect }) => {
    const options = React.useMemo(
      () =>
        items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )),
      [items]
    );

    return (
      <div className={styles.selector}>
        <select
          className={styles.select}
          value={selected}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          <option value={0}>{placeholder}</option>
          {options}
        </select>
        <div className={styles.icon}></div>
      </div>
    );
  }
);

DeckSelector.displayName = 'DeckSelector';

export default DeckSelector;
