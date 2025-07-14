import React from 'react';

import { Taxonomy } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';

export const AddTechnologies: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Taxonomy} />
  );
}