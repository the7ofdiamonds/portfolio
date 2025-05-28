import React, { useEffect, useState } from 'react';

import MemberBio from './MemberBio';
import MemberPic from './MemberPic';

import { Account } from '@/model/Account';
import { User } from '@/model/User';

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
      <div className="author-info">
        {bio && <MemberBio bio={bio} />}

        <MemberPic account={account} />

        {title && <h2 className="title">{title}</h2>}
      </div>
    </>
  );
};