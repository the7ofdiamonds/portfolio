import React from 'react';

import { Technology } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';

export const AddTechnologies: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Technology} />
  );
}