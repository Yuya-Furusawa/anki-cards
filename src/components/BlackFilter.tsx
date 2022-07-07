import * as React from 'react';

import styles from './BlackFilter.module.scss';

type Props = {
  onClick: () => void;
};

const BlackFilter: React.FC<Props> = React.memo(({ onClick }) => (
  <div className={styles.black_filter} onClick={onClick} />
));

BlackFilter.displayName = 'BlackFilter';

export default BlackFilter;
