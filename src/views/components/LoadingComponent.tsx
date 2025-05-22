import React from 'react';

import StatusBarComponent from "./StatusBarComponent";

export const LoadingComponent: React.FC = () => {
  return (
    <main className="loading">
      <h1>Loading...</h1>

      <StatusBarComponent />
    </main>
  );
}