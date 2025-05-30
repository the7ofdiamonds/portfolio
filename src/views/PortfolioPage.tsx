import React, { useEffect } from 'react';

import { PortfolioComponent } from './components/portfolio/PortfolioComponent';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Account } from '@/model/Account';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

interface PortfolioProps {
  account: Account;
}

export const PortfolioPage: React.FC<PortfolioProps> = ({ account }) => {
  const dispatch = useAppDispatch();

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
      dispatch(setMessage('Now Loading Portfolio'));
      dispatch(setShowStatusBar('show'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    document.title = `Portfolio - ${account.name}`;
  }, []);

  return (
    <section className="portfolio">
      <>
        <PortfolioComponent account={account} />
      </>
    </section>
  );
}