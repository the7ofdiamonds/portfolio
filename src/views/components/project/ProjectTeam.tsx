import React from 'react';

import Member from '../member/MemberCard';

import { Contributor } from '@/model/Contributor';
import { Account } from '@/model/Account';

interface TeamProps {
  account: Account;
  projectTeam: Array<Contributor>
}

export const ProjectTeamComponent: React.FC<TeamProps> = ({ account, projectTeam }) => {
  return (
    <>
      {Array.isArray(projectTeam) && projectTeam.length > 0 && (
        <div className="project-team">
          <h4 className="title">Project Team</h4>

          <div className="project-team-list">
            {projectTeam.map((team_member, index) => (
              <Member key={index} account={account} member={team_member} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}