import * as React from 'react';

import styles from './Button.module.scss';

type Props = {
  color: 'blue' | 'orange' | 'gray';
  text: string;
  onClick: () => void;
};

const Button: React.FC<Props> = React.memo(({ color, text, onClick }) => (
  <button className={`${styles['button']} ${styles[color]}`} onClick={onClick}>
    {text}
  </button>
));

Button.displayName = 'Button';

export default Button;
