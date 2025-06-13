import React, { useState } from 'react';

import styles from './StatusBar.module.scss';

interface StatusBarProps {
  show: string;
  messageType: string;
  message: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ show, messageType, message }) => {
  const [showModal, setShowModal] = useState(show);

  const minimize = () => {
    if (show == 'show') {
      setShowModal('hide');
    }
  };

  return (
    message && (
      <span className={`${styles['modal-overlay']} ${showModal}`}>
        <div className={styles.status}>
          <div className={styles.close}>
            <button onClick={minimize}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>

          <div className={`${styles['status-bar']} ${styles.card} ${messageType}`} id="status_bar">
            <span>{message}</span>
          </div>
        </div>
      </span>
    )
  );
}