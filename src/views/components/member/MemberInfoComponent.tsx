import React, { useEffect, useState } from 'react';

import {MemberBio} from './MemberBio';
import MemberPic from './MemberPic';

import { Account } from '@/model/Account';
import { User } from '@/model/User';

import styles from './Member.module.scss';

interface MemberInfoProps {
  account: Account;
}

export const MemberInfoComponent: React.FC<MemberInfoProps> = ({ account }) => {
  const [bio, setBio] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    if (account instanceof User) {
      setBio(account.bio)
      setTitle(account.title)
    }
  }, [account]);

  return (
    <>
      <div className={styles['author-info']}>
        {bio && <MemberBio bio={bio} />}

        <MemberPic account={account} />

        {title && <h2 className={styles['title']}>{title}</h2>}
      </div>
    </>
  );
};