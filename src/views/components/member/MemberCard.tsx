import React, { useEffect, useState } from 'react';

import { User } from '@/model/User';
import { Contributor } from '@/model/Contributor';

import MemberPic from './MemberPic';

interface MemberProps {
  user: User,
  member: User | Contributor
}

const MemberCard: React.FC<MemberProps> = ({ user, member }) => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    if (member instanceof User) {
      setTitle(member.title)
    }
  }, [member]);

  useEffect(() => {
    if (member instanceof Contributor) {
      setTitle(member.login)
    }
  }, [member]);

  const handleClick = () => {
    handleUsers();
    if (user.login === member.login) {
      window.location.href = '/#/about'
    } else {
      window.location.href = `/#/user/${member.login}`
    };
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
        <div className="author-card card">
          <MemberPic user={member} />
          <h3 className="title">{title}</h3>
        </div>
      </button>
    </>
  );
}

export default MemberCard;
