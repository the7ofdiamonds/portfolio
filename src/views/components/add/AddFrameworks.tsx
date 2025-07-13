import React from 'react';

import { Framework } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';

export const AddFrameworks: React.FC = () => {

  return (
    <AddTaxonomy taxonomy={new Framework} />
  );
}