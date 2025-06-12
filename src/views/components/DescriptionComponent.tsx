import React from 'react';

import styles from './Description.module.scss';

interface DescriptionComponentProps {
  description: string;
}

export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ description }) => {

  return (
    description && (
      <div className={`${styles['description-card']} ${styles.card}`}>
        <h4>{description}</h4>
      </div>
    )
  );
}