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

  const [colors, setColors] = useState<Array<Color> | null>(null);
  const [logos, setLogos] = useState<Array<Image> | null>(null);
  const [icons, setIcons] = useState<Array<Image> | null>(null);
  const [animations, setAnimations] = useState<Array<Image> | null>(null);
  const [umlDiagrams, setUmlDiagrams] = useState<Array<Image> | null>(null);
  const [repoContentQuery, setRepoContentQuery] = useState<RepoContentQuery | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);

  useEffect(() => {
    if (design && design.colors && design.colors.list.size > 0) {
      setColors(Array.from(design.colors.list))
    }
  }, [design.colors]);

  useEffect(() => {
    if (design
      && design.gallery
      && design.gallery.logos
      && design.gallery.logos.length > 0) {
      setLogos(design.gallery.logos)
    }
  }, [design?.gallery?.logos]);

  useEffect(() => {
    if (design
      && design.gallery
      && design.gallery.icons
      && design.gallery.icons.length > 0) {
      setIcons(design.gallery.icons)
    }
  }, [design?.gallery?.icons]);

  useEffect(() => {
    if (design
      && design.gallery
      && design.gallery.animations
      && design.gallery.animations.length > 0) {
      setAnimations(design.gallery.animations)
    }
  }, [design?.gallery?.animations]);

  useEffect(() => {
    if (design
      && design.gallery
      && design.gallery.umlDiagrams
      && design.gallery.umlDiagrams.length > 0) {
      setUmlDiagrams(design.gallery.umlDiagrams)
    }
  }, [design?.gallery?.umlDiagrams]);

  useEffect(() => {
    if (projectQuery && projectQuery.owner && projectQuery.repo) {
      setRepoContentQuery(new RepoContentQuery(projectQuery.owner, projectQuery.repo, 'Design.md', ''))
    }
  }, [projectQuery]);

  useEffect(() => {
    if (design
      && design.checkList) {
      setCheckList(design.checkList)
    }
  }, [design.checkList]);

  const hasContent = colors || logos || icons || animations || umlDiagrams || repoContentQuery || checkList;

  return (
    <>
      {hasContent &&
        <div className={styles['project-process-design']} id="project_process_design">
          <h3 className={styles.title}>design</h3>

          {colors &&
            <ColorsComponent colors={colors} />}

          {logos &&
            <GalleryComponent title={'Logos'} gallery={logos} />}

          {icons &&
            <GalleryComponent title={'icons'} gallery={icons} />}

          {animations &&
            <GalleryComponent title={'animations'} gallery={animations} />}

          {umlDiagrams &&
            <GalleryComponent title={'uml diagrams'} gallery={umlDiagrams} />}

          {repoContentQuery &&
            <ContentComponent<RepoContentQuery> title={null} query={repoContentQuery} getFile={getRepoFile} dispatch={dispatch} />}

          {checkList &&
            <CheckListComponent checkList={design.checkList} />}
        </div>
      }
    </>
  );
}