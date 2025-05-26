import React from 'react';

import { Framework } from '@/model/Taxonomy';
import { AddTaxonomy } from './AddTaxonomy';

export const AddFrameworks: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Framework} />
  );
}