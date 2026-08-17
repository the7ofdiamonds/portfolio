import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ColorsComponent,
  ContentComponent,
  GalleryComponent,
  RepoContentQuery
} from '@the7ofdiamonds/ui-ux';
import { CheckList, Color, Image, ProjectDesign, ProjectQuery } from '@the7ofdiamonds/ui-ux';

import { getRepoFile } from '../../../../../controllers/githubSlice';
import { useAppDispatch } from '../../../../../model/hooks';

import styles from './Design.module.scss';

interface DesignProps {
  query: ProjectQuery;
  design: ProjectDesign;
}

export const Design: React.FC<DesignProps> = ({ query, design }) => {
  const dispatch = useAppDispatch();

  const [colors, setColors] = useState<Array<Color>>([]);
  const [logos, setLogos] = useState<Array<Image>>([]);
  const [icons, setIcons] = useState<Array<Image>>([]);
  const [animations, setAnimations] = useState<Array<Image>>([]);
  const [umlDiagrams, setUmlDiagrams] = useState<Array<Image>>([]);
  const [contentQuery, setContentQuery] = useState<RepoContentQuery | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);

  useEffect(() => {
    if (design?.colors?.list) {
      setColors(Array.from(design?.colors?.list))
    } else {
      setColors(null)
    }
  }, [design?.colors?.list]);

  useEffect(() => {
    if (design?.gallery?.logos) {
      setLogos(design?.gallery?.logos)
    } else {
      setLogos(null)
    }
  }, [design?.gallery?.logos]);

  useEffect(() => {
    if (design?.gallery?.icons) {
      setIcons(design?.gallery?.icons)
    } else {
      setIcons(null)
    }
  }, [design?.gallery?.icons]);

  useEffect(() => {
    if (design?.gallery?.animations) {
      setAnimations(design?.gallery?.animations)
    } else {
      setAnimations(null)
    }
  }, [design?.gallery?.animations]);

  useEffect(() => {
    if (design?.gallery?.umlDiagrams) {
      setUmlDiagrams(design?.gallery?.umlDiagrams)
    } else {
      setUmlDiagrams(null)
    }
  }, [design?.gallery?.umlDiagrams]);

  useEffect(() => {
    if (query?.owner && query?.repo && design?.contentURL?.url) {
      setContentQuery(new RepoContentQuery(query.owner, query.repo, 'Design.md', design?.contentURL?.branch ?? ''))
    } else {
      setContentQuery(null)
    }
  }, [query, design?.contentURL]);

  useEffect(() => {
    if (design?.checkList?.tasks?.list?.size > 0) {
      setCheckList(design?.checkList)
    } else {
      setCheckList(null)
    }
  }, [design?.checkList]);

  const hasContent = colors || logos || icons || animations || umlDiagrams || contentQuery || checkList;

  return (
    <>
      {hasContent &&
        <div className={styles['project-process-design']} id="project_process_design">
          <h3 className={styles.title}>design</h3>

          {colors && colors.length > 0 &&
            <ColorsComponent colors={colors} />}

          {logos && logos.length > 0 &&
            <GalleryComponent title={'Logos'} gallery={logos} />}

          {icons && icons.length > 0 &&
            <GalleryComponent title={'icons'} gallery={icons} />}

          {animations && animations.length > 0 &&
            <GalleryComponent title={'animations'} gallery={animations} />}

          {umlDiagrams && umlDiagrams.length > 0 &&
            <GalleryComponent title={'uml diagrams'} gallery={umlDiagrams} />}

          {contentQuery &&
            <ContentComponent<RepoContentQuery> title={null} query={contentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {checkList &&
            <CheckListComponent checkList={checkList} />}
        </div>
      }
    </>
  );
}