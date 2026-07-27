import React, { useEffect, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Organization, Section, StatusBar, User } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

import { PortfolioComponent } from '../views/components/portfolio/PortfolioComponent';

interface PortfolioPageProps<RootState> {
  account: Organization | User;
  portfolio: Portfolio | null;
  skills: Skills | null;
  useAppSelector: TypedUseSelectorHook<RootState>;
}

export const PortfolioPage: React.FC<PortfolioPageProps<any>> = ({ account, portfolio, skills, useAppSelector }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  const [title, setTitle] = useState<string>(`Portfolio`);

  const {
    portfolioLoading,
    portfolioErrorMessage
  } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (account?.name) {
      setTitle(`Portfolio - ${account.name}`)
    }
  }, [account?.name]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (portfolioLoading) {
      setMessageType('info');
      setMessage('Now Loading Portfolio');
      setShowStatusBar('show');
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (!portfolioLoading) {
      setMessage(null);
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      setMessage(portfolioErrorMessage);
      setMessageType('error');
      setShowStatusBar('show');
    }
  }, [portfolioErrorMessage]);

  return (
    <Section>
      <PortfolioComponent portfolio={portfolio} skills={skills} />
      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
    </Section>
  );
}