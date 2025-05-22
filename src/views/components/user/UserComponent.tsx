import React from 'react';

import UserBio from './UserBio';
import UserPic from './UserPic';

import { User } from '@/model/User';
import UserContact from './UserContact';

interface UserComponentProps {
  user: User;
}

const UserComponent: React.FC<UserComponentProps> = ({ user }) => {

  return (
    <>
      <div className="user-info">
        <UserPic user={user} />

        <h2 className="title">{user?.title}</h2>

        {user.bio && <UserBio bio={user.bio} />}

        {user.contactMethods && <UserContact contactMethods={user.contactMethods} />}
      </div>
    </>
  );
};

export default UserComponent;
