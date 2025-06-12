import React from 'react';

import { MemberInfoComponent } from './MemberInfoComponent';

import { Account } from '@/model/Account';

import styles from './Member.module.scss';

interface MemberIntroductionProps {
  account: Account | null
}

export const MemberIntroductionComponent: React.FC<MemberIntroductionProps> = ({ account }) => {

  return (account &&
    <div className={styles['author-intro']}>
      <MemberInfoComponent account={account} />
    </div>
  );
}