import React from 'react';

import { Section } from '@the7ofdiamonds/ui-ux';

import { AddFrameworks } from '@/views/components/add/AddFrameworks';
import { AddLanguages } from '@/views/components/add/AddLanguages';
import { AddProjectTypes } from '@/views/components/add/AddProjectTypes';
import { AddTechnologies } from '@/views/components/add/AddTechnologies';

export const SkillAddPage: React.FC = () => {
  return (
    <Section>
      <AddLanguages />

      <AddFrameworks />

      <AddProjectTypes />

      <AddTechnologies />
    </Section>
  );
}