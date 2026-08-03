import React from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Language } from '@the7ofdiamonds/ui-ux';

import { AddTaxonomy } from './AddTaxonomy';
import type { AppDispatch, RootState } from '../../../model/store';

export interface AddLanguagesProps {
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
};

export const AddLanguages: React.FC<AddLanguagesProps> = ({ useAppDispatch, useAppSelector }) => {

  return (
    <AddTaxonomy taxonomy={new Language} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
  );
}