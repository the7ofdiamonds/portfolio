import React from 'react';

import Member from '../member/MemberCard';

import { User } from '@/model/User';
import { Contributor } from '@/model/Contributor';

interface TeamProps {
  user: User;
  projectTeam: Array<Contributor>
}

const Team: React.FC<TeamProps> = ({ user, projectTeam }) => {
  return (
    <>
      {Array.isArray(projectTeam) && projectTeam.length > 0 && (
        <div className="project-team">
          <h4 className="title">Project Team</h4>

          <div className="project-team-list">
            {projectTeam.map((team_member, index) => (
              <Member key={index} account={user} member={team_member} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
