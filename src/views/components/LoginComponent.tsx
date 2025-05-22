import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { Image } from '@/model/Image';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';

import { StatusBar } from '@/views/components/StatusBar';
import { ImageComponent } from '@/views/components/ImageComponent';

export const LoginComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    authLoading,
    authSuccessMessage,
    authErrorMessage,
    isAuthenticated
  } = useSelector((state: RootState) => state.auth);

  const [showStatusBar, setShowStatusBar] = useState<string>('show');
  const [messageType, setMessageType] = useState<string>('info');
  const [message, setMessage] = useState<string>('Click Log in with GitHub to gain access to the code and/or obtain administrator privileges.');

  useEffect(() => {
    if (authLoading) {
      setShowStatusBar('show');
    }
  }, [authLoading]);

  useEffect(() => {
    if (authSuccessMessage) {
      setMessage(authSuccessMessage);
      setMessageType('success');
      setShowStatusBar('show');
    }
  }, [authSuccessMessage]);

  useEffect(() => {
    if (authErrorMessage) {
      setMessage(authErrorMessage);
      setMessageType('error');
      setShowStatusBar('show');
    }
  }, [authErrorMessage]);

  const handleGitHubSignIn = async () => {
    dispatch(signInWithGitHubPopup());

    if (isAuthenticated) {
      window.location.href = '/#/admin/dashboard';
    }
  };

  return (
    <>
      <div className="providers">
        <button className="login-button google" onClick={handleGitHubSignIn}>
          <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
          <h3>Login with GitHub</h3>
        </button>
      </div>

      <StatusBar show={showStatusBar} messageType={messageType} message={message} />
    </>
  );
}