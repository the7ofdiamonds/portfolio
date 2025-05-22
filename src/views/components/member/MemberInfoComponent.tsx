import React from 'react';

import MemberBio from './MemberBio';
import MemberPic from './MemberPic';

import { User } from '@/model/User';

interface MemberInfoProps {
  user: User;
}

export const MemberInfoComponent: React.FC<MemberInfoProps> = ({ user }) => {
  return (
    <>
      <div className="author-info">
        {user.bio && <MemberBio bio={user.bio} />}

        <MemberPic user={user} />

        <h2 className="title">{user?.title}</h2>
      </div>
    </>
  );
};