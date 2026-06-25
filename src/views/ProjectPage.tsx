import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { Organization, Section, Skills, StatusBar, User } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project } from '@the7ofdiamonds/ui-ux';

import { ProjectComponent } from './components/project/ProjectComponent';

import { getProject } from '../controllers/projectSlice';

interface ProjectPageProps<RootState, AppDispatch> {
  account: Organization | User;
  portfolio: Portfolio | null;
  skills: Skills | null;
  useAppSelector: TypedUseSelectorHook<RootState>;
  useAppDispatch: () => AppDispatch;
}

export const ProjectPage: React.FC<ProjectPageProps<any, any>> = ({ account, portfolio, skills, useAppSelector, useAppDispatch }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { owner, projectID } = useParams<string>();

  const { projectLoading, projectErrorMessage, projectObject } = useAppSelector(
    (state) => state.project
  );

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  const [project, setProject] = useState<Project | null>(location.state.project || null);

  const hasData = project?.path && projectObject?.path ? new String(project.path).localeCompare(projectObject.path) === 0 : false;

  const [APICalled, setAPICalled] = useState<boolean>(hasData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [owner, projectID]);

  useEffect(() => {
    if (!project && location?.pathname && portfolio.projects.size > 0) {
      const withinPortfolio: Project | Set<Project> = portfolio?.filterProjectsByPath(location.pathname);
      if (withinPortfolio instanceof Project) {
        setProject(withinPortfolio);
      }
    }
  }, [project, location.pathname, portfolio.projects.size]);

  const title = project?.title || null;
  const query = project?.query || null;

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (title && projectLoading) {
      setMessageType('info');
      setMessage(`Now Loading Project ${title}`);
      setShowStatusBar('show');
    } else {
      setMessage(null)
    }
  }, [title, projectLoading]);

  useEffect(() => {
    if (projectErrorMessage) {
      setMessageType('error');
      setMessage(projectErrorMessage);
      setShowStatusBar('show');
    }
  }, [projectErrorMessage]);

  useEffect(() => {
    if (query && !hasData) {
      dispatch(getProject(query));
      setAPICalled(true);
    }
  }, [query, hasData]);

  useEffect(() => {
    if (projectObject && APICalled && !projectLoading) {
      setProject(new Project(projectObject));
    }
  }, [projectObject, APICalled, projectLoading]);

  useEffect(() => {
    if (hasData) {
      setProject(new Project(projectObject));
    }
  }, [hasData, projectObject]);

  return (
    <Section>
      {project &&
        <ProjectComponent account={account} project={project} skills={skills} />
      }

      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
    </Section>
  );
}