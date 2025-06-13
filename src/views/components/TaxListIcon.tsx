import React, { useEffect, useState } from 'react';

import { Taxonomy } from '@/model/Taxonomy';

import ProjectSkillsBar from './ProjectSkillsBar';

import styles from './TaxListIcon.module.scss';

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
      <div className={styles['tax-list']}>
        {title && <h5 className={styles.title}>{title}</h5>}

        <div className={styles['tax-row']}>
          <ProjectSkillsBar skillsSet={projectSkills} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
