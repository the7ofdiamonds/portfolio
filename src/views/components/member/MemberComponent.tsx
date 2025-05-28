import React from 'react';

import { MemberInfoComponent } from './MemberInfoComponent';

import { Account } from '@/model/Account';

interface MemberIntroductionProps {
  account: Account | null
}

export const MemberIntroductionComponent: React.FC<MemberIntroductionProps> = ({ account }) => {

  return (account &&
    <div className="author-intro">
      <MemberInfoComponent account={account} />
    </div>
  );
}