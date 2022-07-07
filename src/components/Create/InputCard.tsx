import * as React from 'react';

import styles from './InputCard.module.scss';

type Props = {
  title: string;
  value: string;
  onChange: (selected: string) => void;
};

const InputCard: React.FC<Props> = React.memo(({ title, value, onChange }) => (
  <>
    <div className={styles.title}>{title}</div>
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </>
));

InputCard.displayName = 'InputCard';

export default InputCard;
