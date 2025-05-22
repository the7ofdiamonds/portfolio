import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ContactComponent } from '@/views/components/contact/ContactComponent';

import { setShowStatusBar } from '@/controllers/messageSlice';

import { User } from '@/model/User';

interface ContactProps {
  user: User;
}

export const ContactPage: React.FC<ContactProps> = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Contact - ${user?.name}`;
  }, []);

  useEffect(() => {
    dispatch(setShowStatusBar('show'));
  }, []);

  return (
    <>
      <section className="contact">
        <ContactComponent user={user} />
      </section>
    </>
  );
}