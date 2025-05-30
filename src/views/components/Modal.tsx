import React from 'react';

interface ModalProps { message: string; }

export const Modal: React.FC<ModalProps> = ({ message }) => {
  return (
    <>
      {message && (
        <span className="overlay">
          <div className="status-bar card success modal">
            <h4>{message}</h4>
          </div>
        </span>
      )}
    </>
  );
}