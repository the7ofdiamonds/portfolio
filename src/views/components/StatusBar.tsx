import React, { useState } from 'react';

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
      <span className={`modal-overlay ${showModal}`}>
        <div className="status">
          <div className="close">
            <button onClick={minimize}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>

          <div className={`status-bar card ${messageType}`} id="status_bar">
            <span>{message}</span>
          </div>
        </div>
      </span>
    )
  );
}