import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section, StatusBar, HeaderTaxonomyComponent } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project, Skills } from '@the7ofdiamonds/ui-ux';

import { ProjectsComponent } from '../views/components/portfolio/ProjectsComponent';
import { SkillsComponent } from '../views/components/skills/SkillsComponent';

import { useAppDispatch, useAppSelector } from '../model/hooks';

import { searchPortfolio } from '../controllers/portfolioSlice';

interface SearchProps {
  portfolio: Portfolio | null;
  setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
  skills: Skills
}

export const SearchPage: React.FC<SearchProps> = ({ portfolio, setPortfolio, skills }) => {
  const dispatch = useAppDispatch();

  const { taxonomy, type, term } = useParams<string>();

  const { portfolioLoading, portfolioLoadingMessage, portfolioErrorMessage, hasDetails, portfolioObject } = useAppSelector(
    (state) => state.portfolio
  );

  const [projects, setProjects] = useState<Set<Project>>(new Set);

  const [message, setMessage] = useState<string | null>("show status bar");
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('show');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [taxonomy, term]);

  useEffect(() => {
    if (term) {
      document.title = term.toUpperCase();
    }
  }, [term]);

  useEffect(() => {
    if (!hasDetails && portfolio && taxonomy && type && term) {
      dispatch(searchPortfolio({ taxonomy: taxonomy, type: type, term: term, portfolio: portfolio }));
    }
  }, [portfolio, taxonomy, type, term]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject]);

  useEffect(() => {
    try {
      if (portfolio && taxonomy && type && term) {
        setProjects(portfolio.filterProjects(type, term));
      }
    } catch (error) {
      let err = error as Error;
      setShowStatusBar('show')
      setMessageType('error')
      setMessage(err.message)
    }
  }, [portfolio, taxonomy, type, term]);

  useEffect(() => {
    if (portfolioLoading && portfolioLoadingMessage) {
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