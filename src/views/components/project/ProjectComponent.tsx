import React, { useEffect, useState } from 'react';

import Details from './Details';
import { DescriptionComponent } from '../DescriptionComponent';
import TheSolution from './TheSolution';
import TheProcess from './TheProcess';
import TheProblem from './TheProblem';
import OwnerComponent from './OwnerComponent';

import { Project } from '@/model/Project';
import { User } from '@/model/User';
import { ProjectSolution } from '@/model/ProjectSolution';
import { ProjectProcess } from '@/model/ProjectProcess';
import { ProjectDetails } from '@/model/ProjectDetails';
import { ProjectProblem } from '@/model/ProjectProblem';
import { Owner } from '@/model/Owner';
import { Skills } from '@/model/Skills';
import { ProjectSkills } from '@/model/ProjectSkills';
import { ProjectQuery } from '@/model/ProjectQuery';

interface ProjectComponentProps {
  user: User;
  project: Project;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ user, project }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [process, setProcess] = useState<ProjectProcess | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [problem, setProblem] = useState<ProjectProblem | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    if (project?.title) {
      setTitle(project.title)
    }
  }, [project?.title]);

  useEffect(() => {
    if (project?.subtitle) {
      setSubtitle(project.subtitle)
    }
  }, [project?.subtitle]);

  useEffect(() => {
    if (project?.description) {
      setDescription(project.description)
    }
  }, [project?.description]);

  useEffect(() => {
    if (project?.solution) {
      setSolution(project.solution)
    }
  }, [project?.solution]);

  const [skills, setSkills] = useState<Skills | null>(null);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (user.skills) {
      setSkills(user.skills)
    }
  }, [user.skills]);

  useEffect(() => {
    if (skills && project.process?.development?.skills) {
      setProjectSkills(skills.show(project.process.development.skills))
    }
  }, [user.skills]);

  useEffect(() => {
    if (project?.process?.development && projectSkills) {
      project.process.development.setSkills(projectSkills)
      setProcess(project.process)
    }
  }, [project?.process?.development, projectSkills]);

  useEffect(() => {
    if (project?.details) {
      setDetails(project.details)
    }
  }, [project?.details]);

  useEffect(() => {
    if (project?.problem) {
      setProblem(project.problem)
    }
  }, [project?.problem]);

  useEffect(() => {
    if (project?.owner) {
      setOwner(project.owner)
    }
  }, [project?.owner]);

  useEffect(() => {
    if (project.query) {
      setQuery(project.query)
    }
  }, [project.query]);

  return (
    <>
      <main className="project">
        {title && <h1 className="title">{title}</h1>}

        {subtitle && <h2>{subtitle}</h2>}

        {description && <DescriptionComponent description={description} />}

        {solution && <TheSolution project={project} />}

        {process && <TheProcess process={process} projectQuery={query} />}

        {details && <Details user={user} project={project} />}

        {problem && <TheProblem project={project} />}

        {owner && <OwnerComponent project={project} />}
      </main>
    </>
  );
}

export default ProjectComponent;
