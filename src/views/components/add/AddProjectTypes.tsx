import React from 'react';

import { ProjectType } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';

export const AddProjectTypes: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new ProjectType} />
  );
}