import React from 'react';

import { User } from '@/model/User';

import UserComponent from './UserComponent';

interface MemberProps {
  user: User
}

const MemberCard: React.FC<MemberProps> = ({ user }) => {

  const handleClick = () => {
    handleUsers();
    window.location.href = `/#/user/${user.login}`;
  };

  const handleUsers = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        className="user-button"
        onClick={() => handleClick()}>
        <div className="user-card card">
          <UserComponent user={user} />
        </div>
      </button>
    </>
  );
}

export default MemberCard;
