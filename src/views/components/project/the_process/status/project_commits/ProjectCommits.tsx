import React, { useEffect, useState } from 'react';

import { Commits } from '@the7ofdiamonds/ui-ux';

import styles from './ProjectCommits.module.scss';

interface ProjectCommitsProps {
  commits: Commits;
}

export const ProjectCommits: React.FC<ProjectCommitsProps> = ({ commits }) => {
  const hasContent = commits && commits.list.length > 0;

  return (hasContent && (
    <table className={styles['project-commits']}>
      <caption><h3>Latest Commits</h3></caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Author</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {commits.list.map((commit, index) => (
          <tr key={`${commit.date}-${index}`}>
            <td>{commit.date}</td>
            <td>{commit.author}</td>
            <td>{commit.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  );
};