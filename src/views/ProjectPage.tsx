import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LoadingComponent } from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import { StatusBarComponent } from './components/StatusBarComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import type { AppDispatch, RootState } from '@/model/store';
import { Project } from '@/model/Project';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { User } from '@/model/User';

interface ProjectPageProps {
  user: User;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { owner, projectID } = useParams<string>();

  const { githubLoading, githubErrorMessage } = useSelector(
    (state: RootState) => state.github
  );
  const { projectLoading, projectErrorMessage, projectObject } = useSelector(
    (state: RootState) => state.project
  );

  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectID]);

  useEffect(() => {
    if (user.portfolio && user.portfolio.projects.size > 0 && projectID) {
      const selectedProject = user.portfolio.filterProject(projectID);
      if (selectedProject) {
        setTitle(selectedProject.title);
      }
    }
  }, [user?.portfolio?.projects, projectID]);

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
      <LoadingComponent />
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
    <section>
      <>
        {project &&
          <ProjectComponent user={user} project={project} />
        }
      </>
    </section>
  );
}