import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ContentComponent,
  GalleryComponent
} from '@the7ofdiamonds/ui-ux';
import {
  CheckList,
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
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);

  useEffect(() => {
    if (delivery && delivery.gallery) {
      setGallery(delivery.gallery)
    }
  }, [delivery.gallery]);

  useEffect(() => {
    if (delivery.contentURL && delivery.contentURL.owner && delivery.contentURL.repo && delivery.contentURL.path) {
      setRepoContentQuery(new RepoContentQuery(delivery.contentURL.owner, delivery.contentURL.repo, delivery.contentURL.path, delivery.contentURL.branch ?? ''))
    }
  }, [projectQuery]);

  useEffect(() => {
    if (delivery && delivery.checkList) {
      setCheckList(delivery.checkList)
    }
  }, [delivery.checkList]);

  const hasContent = gallery || repoContentQuery || checkList;

  return (hasContent && (
    <div className={styles['project-process-delivery']} id="project_process_delivery">
      <h3 className={styles.title}>delivery</h3>

      {gallery && gallery.images && gallery.images.length > 0 &&
        <GalleryComponent title={''} gallery={gallery.images} />}

      {repoContentQuery &&
        <ContentComponent<RepoContentQuery>
          title={null}
          query={repoContentQuery}
          getFile={getRepoFile}
          dispatch={dispatch}
        />}

      {checkList &&
        <CheckListComponent checkList={checkList} />}
    </div>
  )
  );
};