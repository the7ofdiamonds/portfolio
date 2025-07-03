import React from 'react'

import { TaxListIcon } from '@the7ofdiamonds/ui-ux';

import { ProjectSkills } from '@/model/ProjectSkills';

import styles from './ProjectSkills.module.scss';

interface ProjectSkillsComponentProps {
    skills: ProjectSkills;
}

export const ProjectSkillsComponent: React.FC<ProjectSkillsComponentProps> = ({ skills }) => {

    const hasContent = skills?.types || skills?.languages || skills?.frameworks || skills?.technologies || skills?.services;

    return (
        <>
            {hasContent &&
                <div className={styles.skills} id="skills">
                    <h4 className={styles.title}>skills</h4>

                    {skills.types && skills.types.size > 0 && <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle={'Project Types'} />}

                    {skills.languages && skills.languages.size > 0 && <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle={'Languages'} />}

                    {skills.frameworks && skills.frameworks.size > 0 && <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle={'Frameworks'} />}

                    {skills.technologies && skills.technologies.size > 0 && <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle={'Technologies'} />}

                    {skills.services && skills.services.size > 0 && <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle={'Services'} />}
                </div>}
        </>
    )
}