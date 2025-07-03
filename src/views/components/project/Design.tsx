import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ColorsComponent,
  ContentComponent,
  GalleryComponent
} from '@the7ofdiamonds/ui-ux';

import { ContentURL } from '@/model/ContentURL';
import { Color } from '@/model/Color';
import { Image } from '@/model/Image';
import { CheckList } from '@/model/CheckList';
import { ProjectQuery } from '@/model/ProjectQuery';
import { ProjectDesign } from '@/model/ProjectDesign';

import styles from './Project.module.scss';

interface DesignProps {
  design: ProjectDesign;
  projectQuery: ProjectQuery | null;
}

export const Design: React.FC<DesignProps> = ({ design, projectQuery }) => {
  const [colors, setColors] = useState<Array<Color> | null>(null);
  const [logos, setLogos] = useState<Array<Image> | null>(null);
  const [icons, setIcons] = useState<Array<Image> | null>(null);
  const [animations, setAnimations] = useState<Array<Image> | null>(null);
  const [umlDiagrams, setUmlDiagrams] = useState<Array<Image> | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (design && design.colorsList && design.colorsList.length > 0) {
      setColors(design.colorsList)
    }
  }, [design.colorsList]);

  useEffect(() => {
    if (design
      && design.contentURL
      && design.contentURL.path === 'Design.md') {
      setContent(design.contentURL)
    }
  }, [design.contentURL]);

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
    if (design
      && design.checkList) {
      setCheckList(design.checkList)
    }
  }, [design.checkList]);

  useEffect(() => {
    if (projectQuery) {
      setQuery(projectQuery)
    }
  }, [projectQuery]);

  const hasContent = colors || logos || icons || animations || umlDiagrams || content || (checkList && query);

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

          {content &&
            <ContentComponent title={null} content={content} />}

          {checkList && query &&
            <CheckListComponent checkList={checkList} query={query} />}
        </div>
      }
    </>
  );
}