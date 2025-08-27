import React from 'react';

import { ProjectSkills, Skills, TaxListIcon } from '@the7ofdiamonds/ui-ux';
import { useHandleSkillClick } from '@the7ofdiamonds/ui-ux';

import styles from './Skills.module.scss';

interface SkillsComponentProps {
    skills: ProjectSkills | Skills | null;
}

export const SkillsComponent: React.FC<SkillsComponentProps> = ({ skills }) => {
    const handleSkillClick = useHandleSkillClick();

    return (
        <>
            {skills && (skills.types || skills.softwareApplications || skills.databases || skills.languages || skills.frameworks || skills.technologies || skills.cicdTools || skills.platforms || skills.cloudProviders) &&
                <div className={styles.skills} id="skills">
                    <h3 className={styles.title}>skills</h3>

                    {skills.types.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle="Project Types" handleClick={handleSkillClick} />
                    )}

                    {skills.softwareApplications.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.softwareApplications} taxonomiesTitle="Software" handleClick={handleSkillClick} />
                    )}

                    {skills.databases.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.databases} taxonomiesTitle="Databases" handleClick={handleSkillClick} />
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

                    {skills.buildTools.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.buildTools} taxonomiesTitle="Build Tools" handleClick={handleSkillClick} />
                    )}

                    {skills.servers.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.servers} taxonomiesTitle="Servers" handleClick={handleSkillClick} />
                    )}

                    {skills.cicdTools.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.cicdTools} taxonomiesTitle="CI/CD" handleClick={handleSkillClick} />
                    )}

                    {skills.platforms.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.platforms} taxonomiesTitle="Platforms" handleClick={handleSkillClick} />
                    )}

                    {skills.cloudProviders.size > 0 && (
                        <TaxListIcon taxonomiesSet={skills.cloudProviders} taxonomiesTitle="Cloud Providers" handleClick={handleSkillClick} />
                    )}
                </div>
            }
        </>
    );
};