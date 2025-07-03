import React from 'react';

import TaxListIcon from './TaxListIcon';

import { ProjectSkills } from '@/model/ProjectSkills';
import { Skills } from '@/model/Skills';

import styles from './Skills.module.scss';

interface SkillsComponentProps {
    skills: ProjectSkills | Skills | null;
}

export const SkillsComponent: React.FC<SkillsComponentProps> = ({ skills }) => {
    return (
        <div className={styles.skills} id="skills">
            <h4 className={styles.title}>skills</h4>

            {skills && skills.types && skills.types.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle="Project Types" />
            )}

            {skills && skills.languages && skills.languages.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle="Languages" />
            )}

            {skills && skills.frameworks && skills.frameworks.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle="Frameworks" />
            )}

            {skills && skills.technologies && skills.technologies.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle="Technologies" />
            )}

            {skills && skills.services && skills.services.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle="Services" />
            )}
        </div>
    );
};