import React from 'react';

import { StatusBarComponent } from "./status_bar/StatusBarComponent";

import styles from './Loading.module.scss';

export const LoadingComponent: React.FC = () => {
  return (
    <main className={styles.loading}>
      <h1>Loading...</h1>

      <StatusBarComponent />
    </main>
  );
}