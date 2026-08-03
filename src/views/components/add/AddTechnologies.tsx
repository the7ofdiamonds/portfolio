import React from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Technology } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';
import type { AppDispatch, RootState } from '../../../model/store';

export interface AddTechnologiesProps {
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
};

export const AddTechnologies: React.FC<AddTechnologiesProps> = ({ useAppDispatch, useAppSelector }) => {
  return (
    <AddTaxonomy taxonomy={new Technology} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
  );
}