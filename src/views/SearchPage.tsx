import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section, StatusBar, HeaderTaxonomyComponent, Organization } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility, Portfolio, Project, Skills, User } from '@the7ofdiamonds/ui-ux';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';
import { SkillsComponent } from '@/views/components/skills/SkillsComponent';

import { getPortfolioDetails } from '@/controllers/portfolioSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

interface SearchProps {
  account: User | Organization;
  skills: Skills
}

export const SearchPage: React.FC<SearchProps> = ({ account, skills }) => {
  const dispatch = useAppDispatch();

  const { taxonomy, type, term } = useParams<string>();

  const { portfolioLoading, portfolioLoadingMessage, portfolioErrorMessage, portfolioObject } = useAppSelector(
    (state) => state.portfolio
  );

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Set<Project>>(new Set);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [taxonomy, term]);

  useEffect(() => {
    if (term) {
      document.title = term.toUpperCase();
    }
  }, [term]);

  useEffect(() => {
    if (account?.portfolio) {
      dispatch(getPortfolioDetails(account.portfolio))
    }
  }, [account?.portfolio]);

  useEffect(() => {
    if (account?.portfolio) {
      setPortfolio(account.portfolio)
    }
  }, [account?.portfolio]);

  useEffect(() => {
    if (portfolioObject) {
      console.log(portfolioObject)
      setPortfolio(new Portfolio(portfolioObject))
    }
  }, [portfolioObject]);

  useEffect(() => {
    if (portfolio && taxonomy && type && term) {
      setProjects(portfolio.filterProjects(type, term));
    }
  }, [portfolio, taxonomy, type, term]);

  useEffect(() => {
    if (portfolioLoading) {
      setShowStatusBar('show')
      setMessage(portfolioLoadingMessage)
    }
  }, [portfolioLoading, portfolioLoadingMessage]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      setShowStatusBar('show')
      setMessageType('error')
      setMessage(portfolioErrorMessage)
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    if (!portfolioLoadingMessage && !portfolioErrorMessage) {
      setMessage(null)
      setShowStatusBar('hide')
    }
  }, [portfolioLoadingMessage, portfolioErrorMessage]);

  return (
    <Section>
      {taxonomy && term && <HeaderTaxonomyComponent skill={skills.filter(term)} />}

      {portfolio &&
        projects &&
        (taxonomy && term) &&
        <ProjectsComponent projects={projects} />
      }

      <SkillsComponent skills={skills} />

      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
    </Section>
  );
}