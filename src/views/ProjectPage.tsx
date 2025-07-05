import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section } from '@the7ofdiamonds/ui-ux';

import { LoadingComponent } from '@the7ofdiamonds/ui-ux';
import { ProjectComponent } from './components/project/ProjectComponent';

import { StatusBarComponent } from '@/views/components/status_bar/StatusBarComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Project } from '@/model/Project';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { Account } from '@/model/Account';

import styles from '../views/components/project/Project.module.scss';

interface ProjectPageProps {
  account: Account;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ account }) => {
  const dispatch = useAppDispatch();

  const { owner, projectID } = useParams<string>();

  const { githubLoading, githubErrorMessage } = useAppSelector(
    (state) => state.github
  );
  const { projectLoading, projectErrorMessage, projectObject } = useAppSelector(
    (state) => state.project
  );

  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectID]);

  useEffect(() => {
    if (account.portfolio && account.portfolio.projects.size > 0 && projectID) {
      const selectedProject = account.portfolio.filterProject(projectID);
      if (selectedProject) {
        setTitle(selectedProject.title);
      }
    }
  }, [account?.portfolio?.projects, projectID]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (owner && owner !== 'null' && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getProject(repoQuery));
    }
  }, [repoQuery]);

  useEffect(() => {
    if (projectObject) {
      setProject(new Project(projectObject));
    }
  }, [projectObject]);

  useEffect(() => {
    if (githubErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(githubErrorMessage));
      dispatch(setShowStatusBar(true));
    }
  }, [githubErrorMessage]);

  useEffect(() => {
    if (projectErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(projectErrorMessage));
      dispatch(setShowStatusBar(true));
    }
  }, [projectErrorMessage]);

  useEffect(() => {
    if (title && (githubLoading || projectLoading)) {
      dispatch(setMessageType('caution'));
      dispatch(setMessage(`Now Loading ${title}`));
      dispatch(setShowStatusBar(true));
    }
  }, [githubLoading, projectLoading, title]);

  if (githubLoading || projectLoading) {
    return <section className='loading'>
      <LoadingComponent page={title ?? ''} />
    </section>;
  }

  if (githubErrorMessage || projectErrorMessage) {
    return <section className='error-page'>
      <main>
        <StatusBarComponent />
      </main>
    </section>;
  }

  return (
    <Section>
      {project &&
        <ProjectComponent account={account} project={project} />
      }
    </Section>
  );
}