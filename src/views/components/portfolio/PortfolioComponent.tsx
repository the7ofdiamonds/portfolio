import React, { useEffect, useState } from 'react';

import { LoadingComponent } from '@/views/components/LoadingComponent';
import { SkillsComponent } from '@/views/components/SkillsComponent';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';

import { Portfolio } from '@/model/Portfolio';
import { Project } from '@/model/Project';
import { Skills } from '@/model/Skills';

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
      ) : <LoadingComponent />}
    </>
  );
}