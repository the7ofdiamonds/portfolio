import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ColorsComponent,
  ContentComponent,
  GalleryComponent,
  RepoContentQuery
} from '@the7ofdiamonds/ui-ux';
import { CheckList, Color, Image, ProjectDesign, ProjectQuery } from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';
import { getRepoFile } from '@/controllers/githubSlice';
import { useAppDispatch } from '@/model/hooks';

interface DesignProps {
  design: ProjectDesign;
  projectQuery: ProjectQuery | null;
}

export const Design: React.FC<DesignProps> = ({ design, projectQuery }) => {
  const dispatch = useAppDispatch();

  const [colors, setColors] = useState<Array<Color>>([]);
  const [logos, setLogos] = useState<Array<Image>>([]);
  const [icons, setIcons] = useState<Array<Image>>([]);
  const [animations, setAnimations] = useState<Array<Image>>([]);
  const [umlDiagrams, setUmlDiagrams] = useState<Array<Image>>([]);
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);

  useEffect(() => {
    setColors(Array.from(design?.colors?.list ?? []))
  }, [design]);

  useEffect(() => {
    setLogos(design?.gallery?.logos ?? [])
  }, [design]);

  useEffect(() => {
    setIcons(design?.gallery?.icons ?? [])
  }, [design]);

  useEffect(() => {
    setAnimations(design?.gallery?.animations ?? [])
  }, [design]);

  useEffect(() => {
    setUmlDiagrams(design?.gallery?.umlDiagrams ?? [])
  }, [design]);

  useEffect(() => {
    if (design.contentURL && design.contentURL && design.contentURL.owner && design.contentURL.repo && design.contentURL.path) {
      setRepoContentQuery(new RepoContentQuery(design.contentURL.owner, design.contentURL.repo, design.contentURL.path, design.contentURL.branch ?? ''))
    }
  }, [design]);

  useEffect(() => {
    setCheckList(design?.checkList)
  }, [design]);

  const hasContent = colors || logos || icons || animations || umlDiagrams || repoContentQuery || checkList;

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

          {repoContentQuery &&
            <ContentComponent<RepoContentQuery> title={null} query={repoContentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {checkList &&
            <CheckListComponent checkList={checkList} />}
        </div>
      }
    </>
  );
}