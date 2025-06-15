import React from 'react';

import styles from './Modal.module.scss';

interface ModalProps { message: string; }

export const Modal: React.FC<ModalProps> = ({ message }) => {
  return (
    <>
      {message && (
        <span className={styles.overlay}>
          <div className={`${styles['status-bar'], styles.card, styles.success, styles.modal}`}>
            <h4>{message}</h4>
          </div>
        </span>
      )}
    </>
  );
}