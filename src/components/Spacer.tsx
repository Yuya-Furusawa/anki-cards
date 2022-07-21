import * as React from 'react';

import styles from './Spacer.module.scss';

type Props = {
  size: string;
};

const Spacer: React.FC<Props> = ({ size }) => {
  return <div className={styles.spacer} style={{ ['--size' as any]: size }} />;
};

export default Spacer;
