import React, { useEffect, useState } from 'react';

import Taxonomy from '@/model/Taxonomy';

import IconComponent from './IconComponent';

interface ProjectSkillsProp {
  skillsSet: Set<Taxonomy>;
}

const ProjectSkills: React.FC<ProjectSkillsProp> = ({ skillsSet }) => {
  const [skills, setSkills] = useState<Set<Taxonomy>>(skillsSet);

  useEffect(() => {
    setSkills(skillsSet);
  }, [skillsSet, setSkills]);

  const handleClick = (skill: Taxonomy) => {
    handleSkills();
    window.location.href = `/#/projects/${skill.path}/${skill.id}`;
  };

  const handleSkills = () => {
    const skillsElement = document.getElementById('top');

    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {skills && skills.size > 0 && (
        <div className="project-skills-bar">
          {Array.from(skills).map((skill, index) => (
            <div className="icon" key={index}>
              {skill.image &&
                (skill.image.className !== '' || skill.image.url !== '')
                ? <button
                  key={index}
                  className="skills-button"
                  onClick={() => handleClick(skill)}>
                  <IconComponent imageClass={skill.image} />
                </button> : <button
                  key={index}
                  className="tag"
                  onClick={() => handleClick(skill)}>
                  <h6>{skill.title}</h6>
                </button>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectSkills;
