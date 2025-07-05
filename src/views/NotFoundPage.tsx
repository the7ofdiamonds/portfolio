import React, { useEffect } from 'react';

import { Section } from '@the7ofdiamonds/ui-ux';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <Section>
      <h2>404 - Page Not Found</h2>
    </Section>
  );
}