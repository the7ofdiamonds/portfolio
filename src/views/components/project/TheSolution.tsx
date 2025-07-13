import React, { useEffect, useState } from 'react';

import { ContentComponent, GalleryComponent } from '@the7ofdiamonds/ui-ux';
import {
  ContentURL,
  Feature,
  Gallery,
  Project,
  ProjectURLs,
  Version
} from '@the7ofdiamonds/ui-ux';

import FeaturesComponent from '@/views/components/project/Features';
import ProjectURLsComponent from '@/views/components/project/ProjectURLsComponent';

import styles from './Project.module.scss';

interface SolutionProps {
  project: Project
}

export const TheSolution: React.FC<SolutionProps> = ({ project }) => {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [projectURLs, setProjectURLs] = useState<ProjectURLs | null>(null);
  const [features, setFeatures] = useState<Set<Feature> | null>(null);
  const [version, setVersion] = useState<Version | null>(null);

  useEffect(() => {
    if (project.solution && project.solution.gallery
      && project.solution.gallery.images
      && project.solution.gallery.images.length > 0) {
      setGallery(project.solution.gallery)
    }
  }, [project?.solution?.gallery]);

  useEffect(() => {
    if (project?.solution && project.solution.contentURL && project.solution.contentURL.path === 'TheSolution.md') {
      setContent(project.solution.contentURL)
    }
  }, [project?.solution?.contentURL]);

  useEffect(() => {
    if (project.solution && project.solution.projectURLs) {
      setProjectURLs(project.solution.projectURLs)
    }
  }, [project?.solution?.projectURLs]);

  useEffect(() => {
    if (project.solution && project.solution.features && project.solution.features.size > 0) {
      setFeatures(project.solution.features)
    }
  }, [project?.solution?.features]);

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.versionsList
      && project.process.development.versionsList.current) {
      setVersion(new Version(project.process.development.versionsList.current))
    }
  }, [project?.process?.development?.versionsList?.current]);

  const hasContent = gallery || content || projectURLs || features || version;

  return (
    <>
      {hasContent &&
        <div className={`${styles['project-section'], styles['project-solution']}`} id="project_solution">
          <h2>THE SOLUTION</h2>

          {gallery && gallery.images && gallery.images.length > 0 &&
            <GalleryComponent gallery={gallery.images} title='' />}

          {content &&
            <ContentComponent title={null} content={content} />}

          {projectURLs &&
            <ProjectURLsComponent projectUrls={projectURLs} />}

          {features && version &&
            <FeaturesComponent features={features} currentVersion={version} />}
        </div>
      }
    </>
  );
}