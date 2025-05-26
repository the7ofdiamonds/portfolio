import React from 'react';

import { Language } from '@/model/Taxonomy';
import { AddTaxonomy } from './AddTaxonomy';

export const AddLanguages: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Language} />
  );
}