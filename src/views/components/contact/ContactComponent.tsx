import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StatusBar } from '@/views/components/StatusBar';

import { MessageCardComponent } from '@/views/components/contact/MessageCardComponent';

import { getContactPageContent } from '@/controllers/contactSlice';

import type { AppDispatch, RootState } from '@/model/store';
import { User } from '@/model/User';

interface ContactProps {
  user: User;
}

export const ContactComponent: React.FC<ContactProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { contactErrorMessage, contactSuccessMessage, contactPage } =
    useSelector((state: RootState) => state.contact);

  const [messageType, setMessageType] = useState<string>('info');
  const [message, setMessage] = useState<string>(contactPage?.message ?? '');

  useEffect(() => {
    dispatch(getContactPageContent());
  }, [dispatch]);

  useEffect(() => {
    if (contactSuccessMessage) {
      setMessageType('success');
      setMessage(contactSuccessMessage);

      setTimeout(() => {
        window.location.href = `/`;
      }, 3000);
    }
  }, [contactSuccessMessage]);

  useEffect(() => {
    if (contactErrorMessage) {
      setMessageType('error');
      setMessage(contactErrorMessage);
    }
  }, [contactErrorMessage]);

  useEffect(() => {
    if (contactPage?.message) {
      setMessage(contactPage.message);
    }
  }, [contactPage]);

  return (
    <main>
      {contactPage?.title && <h2 className="title">{contactPage.title}</h2>}

      <div className="contact-card">
        <MessageCardComponent page={'/contact'} />
      </div>

      <StatusBar show='hide' messageType={messageType} message={message} />
    </main>
  );
}