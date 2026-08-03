import React from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { ProjectType } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';
import type { AppDispatch, RootState } from '../../../model/store';

export interface AddProjectTypesProps {
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
};

export const AddProjectTypes: React.FC<AddProjectTypesProps> = ({ useAppDispatch, useAppSelector }) => {

  return (
    <AddTaxonomy taxonomy={new ProjectType} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
  );
}