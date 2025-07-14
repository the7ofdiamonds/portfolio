import React, { useEffect, useState } from 'react';

import {
  GalleryComponent,
  ContentComponent,
  DocumentComponent,
  ProjectQuery,
  RepoContentQuery
} from '@the7ofdiamonds/ui-ux';

import { ContentURL, DocumentURL, Gallery, Project } from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';
import { getRepoFile } from '@/controllers/githubSlice';
import { useAppDispatch } from '@/model/hooks';

interface ProblemProps {
  project: Project;
}

export const TheProblem: React.FC<ProblemProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [query, setQuery] = useState<RepoContentQuery | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [whitepaperURL, setWhitepaperURL] = useState<DocumentURL | null>(null);

  useEffect(() => {
    if (project?.problem && project.problem.gallery && project.problem.gallery.images
      && project.problem.gallery.images.length > 0
    ) {
      setGallery(project.problem.gallery)
    }
  }, [project?.problem?.gallery]);

  useEffect(() => {
    if (project.query && project.query.owner && project.query.repo) {
      setQuery(new RepoContentQuery(project.query.owner, project.query.repo, '', ''))
    }
  }, [project.query]);

  useEffect(() => {
    if (project?.problem && project.problem.contentURL && project.problem.contentURL.path === 'TheProblem.md') {
      setContent(project.problem.contentURL)
    }
  }, [project?.problem?.contentURL]);

  useEffect(() => {
    if (project?.problem && project.problem?.whitepaperURL) {
      setWhitepaperURL(project.problem.whitepaperURL)
    }
  }, [project?.problem?.whitepaperURL]);

  const hasContent = gallery || content || whitepaperURL;

  return (
    <>
      {hasContent &&
        <>
          <div className={`${styles['project-section'], styles['project-problem']}`} id="project_problem">
            <h2 className={styles.title}>the problem</h2>

            {gallery && gallery.images && < GalleryComponent title={'Problem'} gallery={gallery.images} />}

            {query && <ContentComponent<RepoContentQuery> title={null} query={query} getFile={getRepoFile} dispatch={dispatch} />}
          </div>

          {whitepaperURL && whitepaperURL.url && <DocumentComponent documentURL={whitepaperURL.url} />}
        </>
      }
    </>
  );
}