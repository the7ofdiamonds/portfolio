import React, { useEffect, useState } from 'react';

import { LoadingComponent } from '@/views/components/LoadingComponent';
import { SkillsComponent } from '@/views/components/SkillsComponent';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';

import { Portfolio } from '@/model/Portfolio';
import { Project } from '@/model/Project';
import { User } from '@/model/User';
import { Organization } from '@/model/Organization';
import { Account } from '@/model/Account';
import { Skills } from '@/model/Skills';

interface PortfolioComponentProps {
  account: User | Organization;
}

export const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ account }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Set<Project>>(new Set());
  const [skills, setSkills] = useState<Skills | null>(null);

  useEffect(() => {
    if (account.portfolio && account.portfolio.projects.size > 0) {
      setPortfolio(account.portfolio);
    }
  }, [account]);

  useEffect(() => {
    if (account.skills && account.skills) {
      setSkills(account.skills);
    }
  }, [account]);

  useEffect(() => {
    if (portfolio && portfolio.projects instanceof Set && portfolio.projects.size > 0) {
      setProjects(portfolio.projects);
    }
  }, [portfolio]);

  return (
    <>
      {projects && projects.size > 0 ? (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          <SkillsComponent projectSkills={skills} />
        </main>
      ) : <LoadingComponent />}
    </>
  );
}