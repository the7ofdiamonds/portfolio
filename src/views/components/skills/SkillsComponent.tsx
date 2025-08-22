import React from 'react';

import { ProjectSkills, Skills, TaxListIcon } from '@the7ofdiamonds/ui-ux';
import { handleSkillClick } from '@the7ofdiamonds/ui-ux';

import styles from './Skills.module.scss';

interface SkillsComponentProps {
    skills: ProjectSkills | Skills | null;
}

export const SkillsComponent: React.FC<SkillsComponentProps> = ({ skills }) => {
    return (
        <>
            {skills && (skills.types || skills.languages || skills.frameworks || skills.technologies || skills.services) &&
                <div className={styles.skills} id="skills">
                    <h3 className={styles.title}>skills</h3>

                    {skills.types.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle="Project Types" handleClick={handleSkillClick} />
                    )}

                    {skills.languages.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle="Languages" handleClick={handleSkillClick} />
                    )}

                    {skills.frameworks.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle="Frameworks" handleClick={handleSkillClick} />
                    )}

                    {skills.technologies.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle="Technologies" handleClick={handleSkillClick} />
                    )}

                    {skills.services.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle="Services" handleClick={handleSkillClick} />
                    )}
                </div>
            }
        </>
    );
};