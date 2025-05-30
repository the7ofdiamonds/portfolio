import React, { useEffect, useState } from 'react';

import { LoadingComponent } from '@/views/components/LoadingComponent';
import { SkillsComponent } from '@/views/components/SkillsComponent';

import { ProjectsComponent } from '@/views/components/portfolio/ProjectsComponent';

import { Portfolio } from '@/model/Portfolio';
import { Project } from '@/model/Project';
import { ProjectSkills } from '@/model/ProjectSkills';

interface PortfolioComponentProps {
  portfolio: Portfolio;
  skills: ProjectSkills | null;
}

export const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio, skills }) => {
  const [projects, setProjects] = useState<Set<Project>>(new Set());

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