import React, { useEffect, useState } from 'react';

import { ContentComponent, RepoContentQuery } from '@the7ofdiamonds/ui-ux';

import { ProjectTeamComponent } from '@/views/components/project/ProjectTeam';

import {
  Account,
  Contributor,
  Project,
  RepoSize
} from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';
import { useAppDispatch } from '@/model/hooks';
import { getRepoFile } from '@/controllers/githubSlice';

interface ProjectDetailsProps {
  account: Account;
  project: Project;
}

export const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ account, project }) => {
  const dispatch = useAppDispatch();

  const [privacy, setPrivacy] = useState<string>('public');
  const [repoSize, setRepoSize] = useState<RepoSize | null>(null);
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [contributors, setContributors] = useState<Array<Contributor> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    setIsAuthenticated(Boolean(accessToken && refreshToken));
  }, [project]);

  useEffect(() => {
    if (project.details && project.details.privacy) {
      setPrivacy(project.details.privacy)
    }
  }, [project]);

  useEffect(() => {
    if (project.details && project.details.repoSize) {
      setRepoSize(project.details.repoSize)
    }
  }, [project]);

  useEffect(() => {
    if (project.query && project.query.owner && project.query.repo) {
      setRepoContentQuery(new RepoContentQuery(project.query.owner, project.query.repo, 'Details.md', ''))
    }
  }, [project.query]);

  useEffect(() => {
    if (project.details && project.details.teamList && project.details.teamList.length > 0) {
      setContributors(project.details.teamList)
    }
  }, [project]);

  const hasContent = project && project.details &&
    (repoContentQuery || contributors || repoSize);

  const showContent = repoContentQuery && (privacy === 'public' || (privacy === 'private' && isAuthenticated));

  return (
    <>
      {hasContent && (
        <div className={styles['project-details']}>
          <h3 className={styles.title}>the details</h3>

          {repoSize &&
            <h5>
              Repo Size
              <span className={styles.colon}>:</span>
              <span className={styles['repo-size']}>{repoSize.display()}</span>
            </h5>}

          {showContent ?
            <ContentComponent<RepoContentQuery> title={null} query={repoContentQuery} getFile={getRepoFile} dispatch={dispatch} /> :
            <h5>This project is private login to see the details.</h5>}

          {contributors &&
            <ProjectTeamComponent account={account} projectTeam={contributors} />}
        </div>
      )}
    </>
  );
}