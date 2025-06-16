import React, { useEffect, useState } from 'react';

import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Account } from '@/model/Account';
import { Portfolio } from '@/model/Portfolio';
import { Skills } from '@/model/Skills';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

import styles from '@/views/components/portfolio/Portfolio.module.scss';

interface PortfolioPageProps {
  account: Account;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ account }) => {
  const dispatch = useAppDispatch();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);

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
    <section className={styles.section}>
      <>
        <PortfolioComponent portfolio={portfolio} skills={skills} />
      </>
    </section>
  );
}