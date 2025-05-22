import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectTeamComponent from './Team';
import ContentComponent from '../content/ContentComponent';

import type { RootState } from '@/model/store';
import { User } from '@/model/User';
import { Project } from '@/model/Project';
import { Contributor } from '@/model/Contributor';
import { RepoSize } from '@/model/RepoSize';
import { ContentURL } from '@/model/ContentURL';

interface ProjectDetailsProps {
  user: User;
  project: Project;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ user, project }) => {
  const [privacy, setPrivacy] = useState<string>('public');
  const [repoSize, setRepoSize] = useState<RepoSize | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [contributors, setContributors] = useState<Array<Contributor> | null>(null);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
        <div className="project-details">
          <h3 className="title">the details</h3>

          {repoSize &&
            <h5>
              Repo Size
              <span className='colon'>:</span>
              <span className='repo-size'>{repoSize.display()}</span>
            </h5>}

          {showContent ?
            <ContentComponent title={null} content={content} /> :
            <h5>This project is private login to see the details.</h5>}

          {contributors &&
            <ProjectTeamComponent user={user} projectTeam={contributors} />}
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
