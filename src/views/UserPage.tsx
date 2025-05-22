import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LoadingComponent } from './components/LoadingComponent';
import UserComponent from './components/user/UserComponent';

import type { AppDispatch, RootState } from '@/model/store';
import { User } from '@/model/User';

import {
  getUser,
} from '@/controllers/userSlice';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

export const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { login } = useParams<string>();

  const { userLoading, userObject } = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [login]);

  useEffect(() => {
    if (login) {
      dispatch(getUser(login));
    }
  }, [dispatch, login]);

  useEffect(() => {
    if (userObject) {
      setUser(new User(userObject));
    }
  }, [userObject]);

  useEffect(() => {
    if (userLoading) {
      dispatch(setShowStatusBar('show'));
      dispatch(setMessageType('info'));
      dispatch(setMessage(`Now Loading User ${login}`));
    }
  }, [userLoading]);

  return (
    <section className='user' id='top'>
      <>
        {user ? <UserComponent user={user} /> : <LoadingComponent />}
      </>
    </section>
  );
};