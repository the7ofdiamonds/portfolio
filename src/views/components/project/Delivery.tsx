import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ContentComponent,
  GalleryComponent
} from '@the7ofdiamonds/ui-ux';
import {
  CheckList,
  ContentURL,
  Gallery,
  ProjectDelivery,
  ProjectQuery,
  RepoContentQuery
} from '@the7ofdiamonds/ui-ux';

import { getRepoFile } from '@/controllers/githubSlice';

import { useAppDispatch } from '@/model/hooks';

import styles from './Project.module.scss';

interface DeliveryProps {
  delivery: ProjectDelivery;
  projectQuery: ProjectQuery | null;
}

export const Delivery: React.FC<DeliveryProps> = ({ delivery, projectQuery }) => {
  const dispatch = useAppDispatch();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  const contentQuery = new RepoContentQuery(query?.owner ?? '', query?.repo ?? '', '', '');

  useEffect(() => {
    if (delivery && delivery.gallery) {
      setGallery(delivery.gallery)
    }
  }, [delivery.gallery]);

  useEffect(() => {
    if (delivery
      && delivery.contentURL
      && delivery.contentURL.path === 'Delivery.md') {
      setContent(delivery.contentURL)
    }
  }, [delivery.contentURL]);

  useEffect(() => {
    if (delivery && delivery.checkList) {
      setCheckList(delivery.checkList)
    }
  }, [delivery.checkList]);

  useEffect(() => {
    if (projectQuery) {
      setQuery(projectQuery)
    }
  }, [projectQuery]);

  const hasContent = gallery || content || (checkList && query);

  return (hasContent && (
    <div className={styles['project-process-delivery']} id="project_process_delivery">
      <h3 className={styles.title}>delivery</h3>

      {gallery && gallery.images && gallery.images.length > 0 &&
        <GalleryComponent title={''} gallery={gallery.images} />}

      {content &&
        <ContentComponent<RepoContentQuery>
          title={null}
          query={contentQuery}
          getFile={getRepoFile}
          dispatch={dispatch}
        />}

      {checkList && query &&
        <CheckListComponent checkList={checkList} />}
    </div>
  )
  );
};