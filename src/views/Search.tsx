import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch, RootState } from '../model/store';
import { Portfolio } from '../model/Portfolio';
import { Skills } from '@/model/Skills';
import { User } from '@/model/User';
import { Project } from '@/model/Project';

import { getPortfolioDetails } from '@/controllers/portfolioSlice';

import { ProjectsComponent } from './components/portfolio/ProjectsComponent';
import { SkillsComponent } from './components/SkillsComponent';
import HeaderTaxonomyComponent from './components/HeaderTaxonomyComponent';

interface SearchProps {
  user: User;
  skills: Skills
}

export const Search: React.FC<SearchProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { taxonomy, term } = useParams<string>();

  const { portfolioLoading, portfolioErrorMessage, portfolioObject } = useSelector(
    (state: RootState) => state.portfolio
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
    <section className="search" id="top">
      <>
        {taxonomy && term && <HeaderTaxonomyComponent skill={skills.filter(taxonomy, term)} />}

        {portfolio &&
          projects &&
          (taxonomy && term) &&
          <ProjectsComponent projects={projects} />
        }

        <SkillsComponent projectSkills={user.skills ?? skills} />
      </>
    </section>
  );
}