import React, { useEffect, useState } from 'react';

import { LoadingComponent } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project, Skills } from '@the7ofdiamonds/ui-ux';

import { SkillsComponent } from '@/views/components/skills/SkillsComponent';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';

import styles from './Portfolio.module.scss';

interface PortfolioComponentProps {
  portfolio: Portfolio | null;
  skills: Skills | null;
}

export const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio, skills }) => {
  return (
    <>
      {portfolio && portfolio.projects.size > 0 ? (
        <main className={styles.main}>
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={portfolio.projects} />

          <SkillsComponent skills={skills} />
        </main>
      ) : <LoadingComponent page={''} />}
    </>
  );
}