import React, { useEffect, useState } from 'react';

import {
  GalleryComponent,
  ContentComponent,
  DocumentComponent,
  RepoContentQuery
} from '@the7ofdiamonds/ui-ux';

import { DocumentURL, Gallery, ProjectProblem, ProjectQuery } from '@the7ofdiamonds/ui-ux';

import { getRepoFile } from '../../../../controllers/githubSlice';
import { useAppDispatch } from '../../../../model/hooks';

import styles from './Problem.module.scss';

interface ProblemProps {
  query: ProjectQuery;
  problem: ProjectProblem;
}

export const TheProblem: React.FC<ProblemProps> = ({ query, problem }) => {
  const dispatch = useAppDispatch();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentQuery, setContentQuery] = useState<RepoContentQuery | null>(null);
  const [whitepaperURL, setWhitepaperURL] = useState<DocumentURL | null>(null);

  useEffect(() => {
    if (problem?.gallery?.images?.length > 0) {
      setGallery(problem.gallery)
    }
  }, [problem?.gallery]);

  useEffect(() => {
    if (query?.owner && query?.repo && problem?.contentURL?.url) {
      setContentQuery(new RepoContentQuery(query.owner, query.repo, 'TheProblem.md', problem?.contentURL?.branch ?? ''))
    }
  }, [query, problem?.contentURL]);

  useEffect(() => {
    if (problem?.whitepaperURL) {
      setWhitepaperURL(problem.whitepaperURL)
    }
  }, [problem?.whitepaperURL]);

  const hasContent = contentQuery || gallery || whitepaperURL;

  return (
    <>
      {hasContent &&
        <>
          <div className={`${styles['project-section'], styles['project-problem']}`} id="project_problem">
            <h2 className={styles.title}>the problem</h2>

            {gallery && gallery.images && <GalleryComponent title={''} gallery={gallery.images} />}

            {contentQuery && <ContentComponent<RepoContentQuery> title={null} query={contentQuery} getFile={getRepoFile} dispatch={dispatch} />}
          </div>

          {whitepaperURL && whitepaperURL.url && <DocumentComponent documentURL={whitepaperURL.url} />}
        </>
      }
    </>
  );
}