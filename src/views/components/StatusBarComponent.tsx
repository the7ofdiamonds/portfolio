import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/model/store';

import { StatusBar } from '@/views/components/StatusBar';

export const StatusBarComponent: React.FC = () => {
  const { message, messageType, visibility } = useSelector(
    (state: RootState) => state.message
  );

  const [show, setShow] = useState<string>(visibility);
  const [statusMessage, setStatusMessage] = useState<string>(message);
  const [statusMessageType, setStatusMessageType] = useState<string>(messageType)

  useEffect(() => {
    if (visibility) {
      setShow('show');

      const timer = setTimeout(() => {
        setShow('hide');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visibility]);

  useEffect(() => {
    if (message) {
      setStatusMessage(message);
    }
  }, [message]);

  useEffect(() => {
    if (messageType) {
      setStatusMessageType(messageType);
    }
  }, [messageType]);

  return (
    <StatusBar show={show} message={statusMessage} messageType={statusMessageType} />
  );
}