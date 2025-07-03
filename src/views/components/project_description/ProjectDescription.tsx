import React from 'react';

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {

  return (
    <>
      {description && (
        <div className="project-description">
          <p>{description}</p>
        </div>
      )}
    </>
  );
}

export default ProjectDescription;
