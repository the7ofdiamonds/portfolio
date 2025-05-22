import React from 'react';

import { MemberInfoComponent } from './MemberInfoComponent';

import { User } from '@/model/User';

interface MemberIntroductionProps {
  user: User | null
}

export const MemberIntroductionComponent: React.FC<MemberIntroductionProps> = ({ user }) => {

  return (user &&
    <div className="author-intro">
      <MemberInfoComponent user={user} />
    </div>
  );
}