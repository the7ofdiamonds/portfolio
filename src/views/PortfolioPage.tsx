import React, { useEffect, useState } from 'react';

import { Organization, Section, User,Account, Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

import styles from '@/views/components/portfolio/Portfolio.module.scss';

interface PortfolioPageProps {
  account: Account;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ account }) => {
  const dispatch = useAppDispatch();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);
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
    if (account instanceof User) {
      setTitle(`Portfolio - ${account.firstName} ${account.lastName}`)
    }
  }, [account]);

  useEffect(() => {
    if (account instanceof Organization) {
      setTitle(`Portfolio - ${account.name}`)
    }
  }, [account]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (account.portfolio && account.portfolio.projects && account.portfolio.projects.size > 0) {
      setPortfolio(account.portfolio)
    }
  }, [account.portfolio]);

  useEffect(() => {
    if (account.skills && account.skills.count > 0) {
      setSkills(account.skills)
    }
  }, [account.skills]);

  return (
    <Section>
      <PortfolioComponent portfolio={portfolio} skills={skills} />
    </Section>
  );
}