import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ContentComponent,
  GalleryComponent
} from '@the7ofdiamonds/ui-ux';

import { ContentURL } from '@/model/ContentURL';
import { Gallery } from '@/model/Gallery';
import { CheckList } from '@/model/CheckList';
import { ProjectQuery } from '@/model/ProjectQuery';
import { ProjectDelivery } from '@/model/ProjectDelivery';

import styles from './Project.module.scss';

interface DeliveryProps {
  delivery: ProjectDelivery;
  projectQuery: ProjectQuery | null;
}

export const Delivery: React.FC<DeliveryProps> = ({ delivery, projectQuery }) => {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

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
        <GalleryComponent gallery={gallery.images} title="" />}

      {content &&
        <ContentComponent title={null} content={content} />}

      {checkList && query &&
        <CheckListComponent checkList={checkList} query={query} />}
    </div>
  )
  );
};