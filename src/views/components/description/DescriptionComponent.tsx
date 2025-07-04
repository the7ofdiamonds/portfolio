import React from 'react';

interface DescriptionComponentProps {
  description: string;
}

export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ description }) => {

  return (
    description && (
      <div className="description-card card">
        <h4>{description}</h4>
      </div>
    )
  );
}