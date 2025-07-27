import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section, StatusBar, Skills } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility, Account, GitHubRepoQuery, Portfolio, Project } from '@the7ofdiamonds/ui-ux';

import { ProjectComponent } from './components/project/ProjectComponent';

import { getProject } from '@/controllers/projectSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

interface ProjectPageProps {
  account: Account;
  portfolio: Portfolio | null;
  skills: Skills | null;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ account, portfolio, skills }) => {
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

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectID]);

  useEffect(() => {
    if (portfolio && portfolio.projects.size > 0 && projectID) {
      const selectedProject = portfolio.filterProject(projectID);
      if (selectedProject) {
        setTitle(selectedProject.title);
      }
    }
  }, [portfolio?.projects, projectID]);

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
    if (title && (githubLoading || projectLoading)) {
      setMessageType('caution');
      setMessage(`Now Loading Project ${title}`);
      setShowStatusBar('show');
    } else {
      setMessage(null)
    }
  }, [githubLoading, projectLoading, title]);

  useEffect(() => {
    if (!githubLoading && !projectLoading) {
      setMessage(null)
    }
  }, [githubLoading, projectLoading]);

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

  return (
    <Section>
      {project &&
        <ProjectComponent account={account} project={project} skills={skills} />
      }

      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
    </Section>
  );
}