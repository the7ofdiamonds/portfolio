import React from 'react';

import { Technology } from '@/model/Taxonomy';
import { AddTaxonomy } from './AddTaxonomy';

export const AddTechnologies: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Technology} />
  );
}