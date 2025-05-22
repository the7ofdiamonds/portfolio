import React, { useEffect, useState } from 'react';

import Taxonomy from '@/model/Taxonomy';

import ProjectSkillsBar from './ProjectSkillsBar';

interface TaxListIconProps {
  taxonomiesTitle: string;
  taxonomiesSet: Set<Taxonomy>;
}

const TaxListIcon: React.FC<TaxListIconProps> = ({ taxonomiesTitle, taxonomiesSet }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [projectSkills, setProjectSkills] = useState<Set<Taxonomy>>(new Set());

  useEffect(() => {
    setTitle(taxonomiesTitle)
  }, [taxonomiesTitle, setTitle]);

  useEffect(() => {
    setProjectSkills(taxonomiesSet);
  }, [taxonomiesSet, setProjectSkills]);

  return (
    projectSkills.size > 0 && (
      <div className="tax-list">
        {title && <h5 className="title">{title}</h5>}

        <div className="tax-row">
          <ProjectSkillsBar skillsSet={projectSkills} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
