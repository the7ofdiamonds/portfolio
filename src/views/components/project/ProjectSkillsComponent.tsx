import React, { useEffect, useState } from 'react'

import { ProjectSkills, Skills } from '@the7ofdiamonds/ui-ux';

import { SkillsComponent } from '../skills/SkillsComponent';

interface ProjectSkillsComponentProps {
    skills: Skills;
    projectSkills: ProjectSkills;
}

export const ProjectSkillsComponent: React.FC<ProjectSkillsComponentProps> = ({ skills, projectSkills }) => {
    const [skillsUsed, setSkillsUsed] = useState<Skills | null>(null);

    useEffect(() => {
        if (skills && skills.list.length > 0) {
            setSkillsUsed(skills.fromProjectSkills(projectSkills));
        }
    }, [skills, projectSkills])

    return (
        <SkillsComponent skills={skillsUsed} />
    )
}