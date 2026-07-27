import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { Organization, ProjectQuery, Section, Skills, StatusBar, User } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project } from '@the7ofdiamonds/ui-ux';

import { ProjectComponent } from './components/project/ProjectComponent';

import { getPortfolioProject } from '../controllers/portfolioSlice';

interface ProjectPageProps<RootState, AppDispatch> {
  account: Organization | User;
  portfolio: Portfolio | null;
  skills: Skills | null;
  useAppSelector: TypedUseSelectorHook<RootState>;
  useAppDispatch: () => AppDispatch;
}

export const ProjectPage: React.FC<ProjectPageProps<any, any>> = ({ account, portfolio, setPortfolio, skills, useAppSelector, useAppDispatch }) => {
  const dispatch = useAppDispatch();

  const { owner, projectID } = useParams<string>();

  const { projectLoading, projectErrorMessage } = useAppSelector(
    (state) => state.project
  );

  const { projectObject } = useAppSelector(
    (state) => state.portfolio
  );

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [owner, projectID]);

  useEffect(() => {
    if (!project && portfolio && owner && projectID) {
      dispatch(getPortfolioProject({
        project_query: new ProjectQuery({
          owner: owner,
          repo: projectID
        }), portfolio: portfolio
      }))
    }
  }, [portfolio, owner, projectID]);

  useEffect(() => {
    if (projectObject) {
      setProject(new Project(projectObject));
    }
  }, [projectObject]);

  useEffect(() => {
    if (project?.query) {
      setPortfolio((prevProjects: Portfolio) => {
        prevProjects.addProject(project);
        return prevProjects;
      });
    }
  }, [project?.query]);

  useEffect(() => {
    if (project?.title) {
      document.title = project?.title;
    }
  }, [project?.title]);

  useEffect(() => {
    if (owner && projectID && projectLoading) {
      setMessageType('info');
      setMessage(`Now Loading Project by @${owner} ${projectID.replace(/-/g, " ").toUpperCase()}`);
      setShowStatusBar('show');
    } else {
      setMessage(null)
    }
  }, [owner, projectID, projectLoading]);

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