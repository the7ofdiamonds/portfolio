import React, { useEffect, useState } from 'react';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

export const NotFoundPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <Section>
      <h2>404 - Page Not Found</h2>

      {showStatusBar && message && <StatusBar show={showStatusBar} messageType={'error'} message={message} />}
    </Section>
  );
}