import React, { useEffect, useState } from 'react';

import { ContentComponent, GalleryComponent, RepoContentQuery } from '@the7ofdiamonds/ui-ux';
import {
  Feature,
  Gallery,
  Project,
  ProjectURLs,
  Version,
  ProjectQuery,
  ProjectSolution
} from '@the7ofdiamonds/ui-ux';

import FeaturesComponent from './features/Features';
import ProjectURLsComponent from './project_urls/ProjectURLsComponent';

import styles from './Solution.module.scss';

import { getRepoFile } from '../../../../controllers/githubSlice';
import { useAppDispatch } from '../../../../model/hooks';

interface SolutionProps {
  query: ProjectQuery;
  solution: ProjectSolution;
  version: Version;
}

export const TheSolution: React.FC<SolutionProps> = ({ query, solution, version }) => {
  const dispatch = useAppDispatch();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentQuery, setContentQuery] = useState<RepoContentQuery | null>(null);
  const [projectURLs, setProjectURLs] = useState<ProjectURLs | null>(null);
  const [features, setFeatures] = useState<Set<Feature> | null>(null);

  useEffect(() => {
    if (solution?.gallery?.images.length > 0) {
      setGallery(solution.gallery)
    }
  }, [solution?.gallery]);

  useEffect(() => {
    if (query?.owner && query?.repo && solution?.contentURL?.url) {
      setContentQuery(new RepoContentQuery(query.owner, query.repo, 'TheSolution.md', solution?.contentURL?.branch ?? ''))
    }
  }, [query, solution?.contentURL]);

  useEffect(() => {
    if (solution?.projectURLs) {
      setProjectURLs(solution.projectURLs)
    } else {
      setProjectURLs(null)
    }
  }, [solution?.projectURLs]);

  useEffect(() => {
    if (solution?.features?.list?.size > 0) {
      setFeatures(solution.features.list)
    }
  }, [solution?.features?.list]);

  const hasContent = gallery || contentQuery || projectURLs || (features && version);

  return (
    <>
      {hasContent &&
        <div className={`${styles['project-section'], styles['project-solution']}`} id="project_solution">
          <h2>THE SOLUTION</h2>

          {gallery && gallery.images && gallery.images.length > 0 &&
            <GalleryComponent gallery={gallery.images} title='' />}

          {contentQuery &&
            <ContentComponent<RepoContentQuery> title={null} query={contentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {projectURLs &&
            <ProjectURLsComponent projectUrls={projectURLs} />}

          {features && version &&
            <FeaturesComponent features={features} currentVersion={version} />}
        </div>
      }
    </>
  );
}