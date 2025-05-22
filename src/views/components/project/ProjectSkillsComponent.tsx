import React from 'react'

import TaxListIcon from '../TaxListIcon';

import { ProjectSkills } from '@/model/ProjectSkills';

interface ProjectSkillsComponentProps {
    skills: ProjectSkills;
}

const ProjectSkillsComponent: React.FC<ProjectSkillsComponentProps> = ({ skills }) => {

    const hasContent = skills?.types || skills?.languages || skills?.frameworks || skills?.technologies || skills?.services;

    return (
        <>
            {hasContent &&
                <div className="skills" id="skills">
                    <h4 className="title">skills</h4>

                    {skills.types && skills.types.size > 0 && <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle={'Project Types'} />}

                    {skills.languages && skills.languages.size > 0 && <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle={'Languages'} />}

                    {skills.frameworks && skills.frameworks.size > 0 && <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle={'Frameworks'} />}

                    {skills.technologies && skills.technologies.size > 0 && <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle={'Technologies'} />}

                    {skills.services && skills.services.size > 0 && <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle={'Services'} />}
                </div>}
        </>
    )
}

export default ProjectSkillsComponent;