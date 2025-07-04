import React, { useEffect, useState } from 'react';

import {
  GalleryComponent,
  ContentComponent,
  DocumentComponent
} from '@the7ofdiamonds/ui-ux';

import { Project } from '@/model/Project';
import { ContentURL } from '@/model/ContentURL';
import { Gallery } from '@/model/Gallery';
import { DocumentURL } from '@/model/DocumentURL';

import styles from './Project.module.scss';

interface ProblemProps {
  project: Project;
}

export const TheProblem: React.FC<ProblemProps> = ({ project }) => {
  const [gallery, setGallery] = useState<Gallery | null>(null);
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

            {content && <ContentComponent title='' content={content} />}
          </div>

          {whitepaperURL && <DocumentComponent documentURL={whitepaperURL} />}
        </>
      }
    </>
  );
}