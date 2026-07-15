import React, { useEffect, useState } from 'react';

import { ContentComponent, RepoContentQuery } from '@the7ofdiamonds/ui-ux';

import { ProjectTeamComponent } from '../../../views/components/project/ProjectTeam';

import type {
  Contributor,
  MessageType,
  Organization,
  Project,
  RepoSize,
  RepoURL,
  StatusBarVisibility,
  User
} from '@the7ofdiamonds/ui-ux';

import { useAppDispatch } from '../../../model/hooks';
import { getRepoFile } from '../../../controllers/githubSlice';

import { Code } from './the_process/the_details/code/Code';

import styles from './Project.module.scss';

interface ProjectDetailsProps {
  account: Organization | User;
  project: Project;
}

export const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ account, project }) => {
  const dispatch = useAppDispatch();

  const [privacy, setPrivacy] = useState<string>('public');
  const [repoSize, setRepoSize] = useState<RepoSize | null>(null);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [contributors, setContributors] = useState<Array<Contributor> | null>(null);
  const [show, setShow] = useState<StatusBarVisibility>('hide');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('success');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    setIsAuthenticated(Boolean(accessToken && refreshToken));
  }, [project]);

  useEffect(() => {
    if (project?.process?.development?.repoURL) {
      setRepoURL(project.process.development.repoURL)
    }
  }, [project?.process?.development?.repoURL]);

  useEffect(() => {
    if (project?.details?.privacy) {
      setPrivacy(project.details.privacy)
    }
  }, [project?.details?.privacy]);

  useEffect(() => {
    if (project?.details?.repoSize) {
      setRepoSize(project.details.repoSize)
    }
  }, [project?.details?.repoSize]);

  useEffect(() => {
    if (project.details?.content && project.details?.content.owner && project.details?.content.repo && project.details?.content.path) {
      setRepoContentQuery(new RepoContentQuery(project.details?.content.owner, project.details?.content.repo, project.details?.content.path, project.details?.content.branch ?? ''))
    }
  }, [project?.details?.content]);

  useEffect(() => {
    if (project?.details?.teamList?.list.length > 0) {
      setContributors(project.details.teamList.list)
    }
  }, [project?.details?.teamList]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (privacy === 'private') {
        setMessage('Click Log in with GitHub to request access to the code.');
      }

      if (privacy === 'public') {
        setMessage('Click Log in with GitHub to gain access to the code.');
      }

      setMessageType('info');
      setShow(true);
    }
  }, [isAuthenticated, privacy]);

  useEffect(() => {
    if (isAuthenticated) {
      if (privacy === 'private') {
        setMessage('Request access to the source code on GitHub.');
      }

      if (privacy === 'public') {
        setMessage('View the source code on GitHub.');
      }

      setMessageType('success');
      setShow(true);
    }
  }, [isAuthenticated, privacy]);

  const hasContent = project && project.details &&
    (repoContentQuery || contributors || repoSize);

  const showContent = repoContentQuery && (privacy === 'public' || (privacy === 'private' && isAuthenticated));

  return (
    <>
      {hasContent && (
        <div className={styles['project-details']}>
          <h3 className={styles.title}>the details</h3>

          {repoURL && <Code
            isAuthenticated={isAuthenticated}
            repoURL={repoURL}
            message={message}
            show={show}
            messageType={messageType}
          />}

          {repoSize && repoSize?.amount && repoSize.amount > 0 &&
            <h5>
              Repo Size
              <span className={styles.colon}>:</span>
              <span className={styles['repo-size']}>{repoSize.display()}</span>
            </h5>}

          {showContent &&
            <ContentComponent<RepoContentQuery> title={null} query={repoContentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {contributors &&
            <ProjectTeamComponent account={account} projectTeam={contributors} />}
        </div>
      )}
    </>
  );
}