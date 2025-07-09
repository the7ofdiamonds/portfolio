import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HeaderTaxonomyComponent } from '@the7ofdiamonds/ui-ux';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';
import { SkillsComponent } from '@/views/components/skills/SkillsComponent';

import { getPortfolioDetails } from '@/controllers/portfolioSlice';

import { Portfolio } from '@/model/Portfolio';
import { Skills } from '@/model/Skills';
import { User } from '@/model/User';
import { Project } from '@/model/Project';
import { useAppDispatch, useAppSelector } from '@/model/hooks';

import styles from '@/views/components/search/Search.module.scss';

interface SearchProps {
  user: User;
  skills: Skills
}

export const SearchPage: React.FC<SearchProps> = ({ user, skills }) => {
  const dispatch = useAppDispatch();

  const { taxonomy, term } = useParams<string>();

  const { portfolioLoading, portfolioErrorMessage, portfolioObject } = useAppSelector(
    (state) => state.portfolio
  );

  const [portfolio, setPortfolio] = useState<Portfolio | null>(user.portfolio);
  const [projects, setProjects] = useState<Set<Project>>(new Set);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [taxonomy, term]);

  useEffect(() => {
    if (term) {
      const skill = term.toUpperCase();

      document.title = skill;
    }
  }, [term]);

  useEffect(() => {
    if (user.repos) {
      dispatch(getPortfolioDetails(user.repos))
    }
  }, [user?.repos]);

  useEffect(() => {
    if (user.portfolio) {
      setPortfolio(user.portfolio)
    }
  }, [user.portfolio]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject))
    }
  }, [portfolioObject]);

  useEffect(() => {
    if (portfolio && taxonomy && term) {
      setProjects(portfolio.filterProjects(taxonomy, term));
    }
  }, [portfolio, taxonomy, term]);

  return (
    <section className={styles.section} id="top">
      <>
        {taxonomy && term && <HeaderTaxonomyComponent skill={skills.filter(term)}  />}

        {portfolio &&
          projects &&
          (taxonomy && term) &&
          <ProjectsComponent projects={projects} />
        }

        <SkillsComponent skills={user.skills ?? skills} />
      </>
    </section>
  );
}