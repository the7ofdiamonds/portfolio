import React, { useEffect, useState } from 'react';

import { Organization, Section, User, Account, Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

import { useAppSelector } from '@/model/hooks';

interface PortfolioPageProps {
  account: Account;
  portfolio: Portfolio | null;
  skills: Skills | null;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ account, portfolio, skills }) => {
  const [title, setTitle] = useState<string>(`Portfolio`);

  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');
  const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

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

  return (
    <Section>
      <PortfolioComponent portfolio={portfolio} skills={skills} />
    </Section>
  );
}