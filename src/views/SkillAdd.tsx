import React from 'react';

import { AddFrameworks } from '@/views/components/add/AddFrameworks';
import { AddLanguages } from '@/views/components/add/AddLanguages';
import { AddProjectTypes } from '@/views/components/add/AddProjectTypes';
import { AddTechnologies } from '@/views/components/add/AddTechnologies';

export const AddSkill: React.FC = () => {
  return (
    <section className="add">
      <>
        <AddLanguages />

        <AddFrameworks />

        <AddProjectTypes />

        <AddTechnologies />
      </>
    </section>
  );
}