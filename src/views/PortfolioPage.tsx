import React, { useEffect, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility, Account, Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

interface PortfolioPageProps<RootState, AppDispatch> {
  account: Account;
  portfolio: Portfolio | null;
  skills: Skills | null;
  useAppSelector: TypedUseSelectorHook<RootState>;
  useAppDispatch: () => AppDispatch;
}

export const PortfolioPage: React.FC<PortfolioPageProps<any, any>> = ({ account, skills, useAppSelector, useAppDispatch }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  const [title, setTitle] = useState<string>(`Portfolio`);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const {
    portfolioLoading,
    portfolioObject,
    portfolioErrorMessage
  } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (portfolioLoading) {
      setMessage('Now Loading Portfolio');
      setShowStatusBar('show');
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioLoading) {
      setMessageType('info');
      setMessage('Now Loading Portfolio');
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      setMessage(portfolioErrorMessage);
      setMessageType('error');
      setShowStatusBar('show');
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    if (account.name) {
      setTitle(`Portfolio - ${account.name}`)
    }
  }, [account]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (account.portfolio) {
      setPortfolio(account.portfolio);
      setMessage(null);
      setShowStatusBar('hide');
    }
  }, [account.portfolio]);

  return (
    <Section>
      <PortfolioComponent portfolio={portfolio} skills={skills} />
      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
    </Section>
  );
}