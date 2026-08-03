import React from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Section } from '@the7ofdiamonds/ui-ux';

import { AddFrameworks } from '../views/components/add/AddFrameworks';
import { AddLanguages } from '../views/components/add/AddLanguages';
import { AddProjectTypes } from '../views/components/add/AddProjectTypes';
import { AddTechnologies } from '../views/components/add/AddTechnologies';
import type { AppDispatch, RootState } from '../../../model/store';

export interface SkillAddPageProps {
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
};

export const SkillAddPage: React.FC<SkillAddPageProps> = ({ useAppDispatch, useAppSelector }) => {
  return (
    <Section>
      <AddLanguages useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />

      <AddFrameworks useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />

      <AddProjectTypes useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />

      <AddTechnologies useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
    </Section>
  );
}