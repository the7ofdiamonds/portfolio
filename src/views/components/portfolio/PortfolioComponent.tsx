import React, { useEffect, useState } from 'react';

import { LoadingComponent, Main } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

import { SkillsComponent } from '@/views/components/skills/SkillsComponent';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';

import styles from './Portfolio.module.scss';

interface PortfolioComponentProps {
  portfolio: Portfolio | null;
  skills: Skills | null;
}

export const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio, skills }) => {
  return (
    <Main>
      {portfolio && portfolio.projects.size > 0 ? (
        <>
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={portfolio.projects} />
        </>
      ) : <LoadingComponent page={''} />}

      {skills && <SkillsComponent skills={skills} />}
    </Main>

  );
}