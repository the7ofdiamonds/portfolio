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

import { getRepoFile } from '../../../../../controllers/githubSlice';

import { useAppDispatch } from '../../../../../model/hooks';

import styles from './Delivery.module.scss';

interface DeliveryProps {
  query: ProjectQuery;
  delivery: ProjectDelivery | null;
}

export const Delivery: React.FC<DeliveryProps> = ({ query, delivery }) => {
  const dispatch = useAppDispatch();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentQuery, setContentQuery] = useState<RepoContentQuery | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);

  useEffect(() => {
    if (delivery?.gallery?.images?.length > 0) {
      setGallery(delivery.gallery)
    } else {
      setGallery(null)
    }
  }, [delivery?.gallery]);

  useEffect(() => {
    if (query?.owner && query?.repo && delivery?.contentURL?.url) {
      setContentQuery(new RepoContentQuery(query.owner, query.repo, 'Delivery.md', delivery?.contentURL?.branch ?? ''))
    } else {
      setContentQuery(null)
    }
  }, [query, delivery?.contentURL]);

  useEffect(() => {
    if (delivery?.checkList?.tasks?.list?.size > 0) {
      setCheckList(delivery.checkList)
    } else {
      setCheckList(null)
    }
  }, [delivery?.checkList]);

  const hasContent = gallery || contentQuery || checkList;

  return (hasContent && (
    <div className={styles['project-process-delivery']} id="project_process_delivery">
      <h3 className={styles.title}>delivery</h3>

      {gallery &&
        <GalleryComponent title={''} gallery={gallery.images} />}

      {contentQuery &&
        <ContentComponent<RepoContentQuery>
          title={null}
          query={contentQuery}
          getFile={getRepoFile}
          dispatch={dispatch}
        />}

      {checkList &&
        <CheckListComponent checkList={checkList} />}
    </div>
  )
  );
};