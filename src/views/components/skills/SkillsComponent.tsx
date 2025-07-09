import React from 'react';

import { TaxListIcon, Taxonomy } from '@the7ofdiamonds/ui-ux';

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
                <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle="Project Types" handleClick={function (taxonomy: Taxonomy): void {
                    throw new Error('Function not implemented.');
                } } />
            )}

            {skills && skills.languages && skills.languages.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle="Languages" handleClick={function (taxonomy: Taxonomy): void {
                    throw new Error('Function not implemented.');
                } } />
            )}

            {skills && skills.frameworks && skills.frameworks.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle="Frameworks" handleClick={function (taxonomy: Taxonomy): void {
                    throw new Error('Function not implemented.');
                } } />
            )}

            {skills && skills.technologies && skills.technologies.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle="Technologies" handleClick={function (taxonomy: Taxonomy): void {
                    throw new Error('Function not implemented.');
                } } />
            )}

            {skills && skills.services && skills.services.size > 0 && (
                <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle="Services" handleClick={function (taxonomy: Taxonomy): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
        </div>
    );
};