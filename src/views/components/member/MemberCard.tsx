import React, { useEffect, useState } from 'react';

import { User } from '@/model/User';
import { Contributor } from '@/model/Contributor';
import { Account } from '@/model/Account';

import MemberPic from './MemberPic';

import styles from './Member.module.scss';

interface MemberProps {
  account: Account,
  member: User | Contributor
}

const MemberCard: React.FC<MemberProps> = ({ account, member }) => {
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
    if (account.login === member.login) {
      window.location.href = '/about'
    } else {
      window.location.href = `/user/${member.login}`
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
        className={styles['user-button']}
        onClick={() => handleClick()}>
        <div className={`${styles['author-card']} ${styles.card}`}>
          <MemberPic account={member} />
          <h3 className={styles.title}>{title}</h3>
        </div>
      </button>
    </>
  );
}

export default MemberCard;
