import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { Organization, Section, Skills, StatusBar, User } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility, GitHubRepoQuery, Portfolio, Project } from '@the7ofdiamonds/ui-ux';

import { ProjectComponent } from './components/project/ProjectComponent';

import { getProject } from '@/controllers/projectSlice';

interface ProjectPageProps<RootState, AppDispatch> {
  account: Organization | User;
  portfolio: Portfolio | null;
  skills: Skills | null;
  useAppSelector: TypedUseSelectorHook<RootState>;
  useAppDispatch: () => AppDispatch;
}

export const ProjectPage: React.FC<ProjectPageProps<any, any>> = ({ account, portfolio, skills, useAppSelector, useAppDispatch }) => {
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
      setProject(portfolio.filterProject(projectID));
    }
  }, [portfolio, projectID]);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
    }
  }, [project]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  // useEffect(() => {
  //   if (owner && owner !== 'null' && projectID) {
  //     setRepoQuery(new GitHubRepoQuery(owner, projectID))
  //   }
  // }, [owner, projectID]);

  // useEffect(() => {
  //   if (repoQuery) {
  //     dispatch(getProject(repoQuery));
  //   }
  // }, [repoQuery]);

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

  // useEffect(() => {
  //   if (projectObject) {
  //     setProject(new Project(projectObject));
  //   }
  // }, [projectObject]);

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