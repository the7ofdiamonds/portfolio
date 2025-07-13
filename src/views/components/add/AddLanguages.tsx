import React from 'react';

import { Language } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';

export const AddLanguages: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Language} />
  );
}