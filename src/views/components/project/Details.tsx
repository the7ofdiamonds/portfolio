import React, { useEffect, useState } from 'react';

import { ProjectTeamComponent } from '@/views/components/project/ProjectTeam';
import { ContentComponent } from '@/views/components/content/ContentComponent';

import { Project } from '@/model/Project';
import { Contributor } from '@/model/Contributor';
import { RepoSize } from '@/model/RepoSize';
import { ContentURL } from '@/model/ContentURL';
import { Account } from '@/model/Account';

import styles from './Project.module.scss';

interface ProjectDetailsProps {
  account: Account;
  project: Project;
}

export const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ account, project }) => {
  const [privacy, setPrivacy] = useState<string>('public');
  const [repoSize, setRepoSize] = useState<RepoSize | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
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
    if (project.details && project.details.content) {
      setContent(project.details.content)
    }
  }, [project]);

  useEffect(() => {
    if (project.details && project.details.teamList && project.details.teamList.length > 0) {
      setContributors(project.details.teamList)
    }
  }, [project]);

  const hasContent = project && project.details &&
    (content || contributors || repoSize);

  const showContent = content && (privacy === 'public' || (privacy === 'private' && isAuthenticated));

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
            <ContentComponent title={null} content={content} /> :
            <h5>This project is private login to see the details.</h5>}

          {contributors &&
            <ProjectTeamComponent account={account} projectTeam={contributors} />}
        </div>
      )}
    </>
  );
}