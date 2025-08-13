import React from 'react';

// import {user} from '@the7ofdiamonds/communications'

import { Contributor, Organization, User } from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';

interface TeamProps {
  account: Organization | User;
  projectTeam: Array<Contributor>
}

export const ProjectTeamComponent: React.FC<TeamProps> = ({ account, projectTeam }) => {
  return (
    <>
      {Array.isArray(projectTeam) && projectTeam.length > 0 && (
        <div className={styles['project-team']}>
          <h4 className="title">Project Team</h4>

          {/* <div className={styles['project-team-list']}>
            {projectTeam.map((team_member, index) => (
              <Member key={index} account={account} member={team_member} />
            ))}
          </div> */}
        </div>
      )}
    </>
  );
}