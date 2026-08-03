import React from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Framework } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';
import type { AppDispatch, RootState } from '../../../model/store';

export interface AddFrameworksProps {
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
};

export const AddFrameworks: React.FC<AddFrameworksProps> = ({ useAppDispatch, useAppSelector }) => {

  return (
    <AddTaxonomy taxonomy={new Framework} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
  );
}