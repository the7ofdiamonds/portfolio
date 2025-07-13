import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingComponent, Section, Main, StatusBar } from '@the7ofdiamonds/ui-ux';
import { Account, GitHubRepoQuery, Project } from '@the7ofdiamonds/ui-ux';

import { ProjectComponent } from './components/project/ProjectComponent';

import { getProject } from '@/controllers/projectSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

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
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');
  const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

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
      setMessageType('error');
      setMessage(githubErrorMessage);
      setShowStatusBar('show');
    }
  }, [githubErrorMessage]);

  useEffect(() => {
    if (projectErrorMessage) {
      setMessageType('error');
      setMessage(projectErrorMessage);
      setShowStatusBar('show');
    }
  }, [projectErrorMessage]);

  useEffect(() => {
    if (title && (githubLoading || projectLoading)) {
      setMessageType('caution');
      setMessage(`Now Loading ${title}`);
      setShowStatusBar('show');
    }
  }, [githubLoading, projectLoading, title]);

  if (githubLoading || projectLoading) {
    return <Section>
      <LoadingComponent page={title ?? ''} />
    </Section>;
  }

  if (githubErrorMessage || projectErrorMessage) {
    return <Section>
      <Main>
        <StatusBar show={showStatusBar} messageType={messageType} message={message} />
      </Main>
    </Section>;
  }

  return (
    <Section>
      {project &&
        <ProjectComponent account={account} project={project} />
      }
    </Section>
  );
}