import React, { useEffect, useState } from 'react';

import { ContentComponent, RepoContentQuery } from '@the7ofdiamonds/ui-ux';

import { ProjectTeamComponent } from './project_team/ProjectTeam';

import type {
  MessageType,
  StatusBarVisibility,
} from '@the7ofdiamonds/ui-ux';
import {
  Contributor,
  Organization,
  ProjectDetails,
  RepoSize,
  RepoURL,
  User,
  ProjectQuery,
  Owner
} from '@the7ofdiamonds/ui-ux';

import { useAppDispatch } from '../../../../model/hooks';
import { getRepoFile } from '../../../../controllers/githubSlice';

import { Code } from './code/Code';
import { OwnerComponent } from './owner/OwnerComponent';

import styles from './Details.module.scss';

interface ProjectDetailsProps {
  query: ProjectQuery;
  account: Organization | User;
  details: ProjectDetails;
  repoURL: RepoURL;
}

export const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ query, account, details, repoURL }) => {
  const dispatch = useAppDispatch();

  const [privacy, setPrivacy] = useState<string>('public');
  const [repoSize, setRepoSize] = useState<String | null>(null);
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [contributors, setContributors] = useState<Array<Contributor> | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  const [show, setShow] = useState<StatusBarVisibility>('hide');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('success');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('access_token');
  //   const refreshToken = localStorage.getItem('refresh_token');

  //   setIsAuthenticated(Boolean(accessToken && refreshToken));
  // }, [project]);

  useEffect(() => {
    if (details?.privacy) {
      setPrivacy(details.privacy)
    } else {
      setPrivacy(null)
    }
  }, [details?.privacy]);

  useEffect(() => {
    if (details?.repoSize) {
      setRepoSize(details.repoSize)
    } else {
      setRepoSize(null)
    }
  }, [details?.repoSize]);

  useEffect(() => {
    if (query?.owner && query?.repo && details?.content?.url) {
      setRepoContentQuery(new RepoContentQuery(query.owner, query.repo, 'Details.md', details?.content?.branch ?? ''))
    } else {
      setRepoContentQuery(null)
    }
  }, [query, details?.content]);

  useEffect(() => {
    if (details?.teamList?.list?.length > 0) {
      const teamList = details?.teamList?.list;
      const login = details?.owner?.login ?? null;
      const filteredContributors = login ? teamList.filter((contributor: Contributor) => contributor.login !== login) : [];

      if (filteredContributors.length > 0) {
        setContributors(filteredContributors)
      }
    } else {
      setContributors(null)
    }
  }, [details?.teamList]);

  useEffect(() => {
    if (details?.owner) {
      setOwner(details.owner)
    } else {
      setOwner(null)
    }
  }, [details?.owner]);

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

  const hasContent = repoContentQuery || contributors || repoSize || repoURL;

  const showContent = repoContentQuery && (privacy === 'public' || (privacy === 'private' && isAuthenticated));

  return (
    <>
      {hasContent && (
        <div className={styles['project-details']}>
          <h3 className={styles.title}>the details</h3>

          {repoContentQuery &&
            <ContentComponent<RepoContentQuery> title={null} query={repoContentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {repoURL && <Code
            isAuthenticated={isAuthenticated}
            repoURL={repoURL}
            message={message}
            show={show}
            messageType={messageType}
          />}

          {repoSize &&
            <h5>
              Repo Size
              <span className={styles.colon}>:</span>
              <span className={styles['repo-size']}>{repoSize}</span>
            </h5>}

          {contributors &&
            <ProjectTeamComponent account={account} projectTeam={contributors} />}

          {owner && <OwnerComponent query={query} account={account} owner={owner} />}
        </div>
      )}
    </>
  );
}