import React, { useEffect, useState } from 'react';

// import {user} from '@the7ofdiamonds/communications'

import { Contributor, Organization, User } from '@the7ofdiamonds/ui-ux';

import { UserCard } from '@the7ofdiamonds/communications';

import styles from './Project.module.scss';

interface TeamProps {
  account: Organization | User;
  projectTeam: Array<Contributor>
}

export const ProjectTeamComponent: React.FC<TeamProps> = ({ account, projectTeam }) => {
  const [team, setTeam] = useState<Array<Contributor>>([]);

  useEffect(() => {
    let pTeam: Array<Contributor> = [];

    if (account instanceof Organization) {
      account?.team?.forEach((user) => {
        pTeam = projectTeam.map((contributor) => {
          console.log(contributor.login)
          console.log(user.login)

          if (contributor.login === user.login) {
            return user as Contributor;
          }

          return contributor;
        })
      })

      setTeam(pTeam)
    } else if (account instanceof User) {
      pTeam = projectTeam.map((contributor) => {
        if (contributor.login === account.login) {
          return account as Contributor;
        }

        return contributor;
      })

      setTeam(pTeam)
    }
  }, [account, projectTeam])

  return (
    <>
      {team.length > 0 && (
        <div className={styles['project-team']}>
          <h4 className="title">Project Team</h4>

          <div className={styles['project-team-list']}>
            {team.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}