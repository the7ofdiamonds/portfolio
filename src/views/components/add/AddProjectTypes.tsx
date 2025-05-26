import React from 'react';

import { ProjectType } from '@/model/Taxonomy';
import { AddTaxonomy } from './AddTaxonomy';

export const AddProjectTypes: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new ProjectType} />
  );
}