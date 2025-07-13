import React, { useEffect, useState } from 'react';

import {
  CheckListComponent,
  ContentComponent,
  ImageComponent,
  StatusBar
} from '@the7ofdiamonds/ui-ux';
import {
  CheckList,
  ContentURL,
  FeaturesRoadmap,
  Image,
  ProjectDevelopment,
  ProjectQuery,
  ProjectSkills,
  ProjectSolution,
  ProjectVersions,
  RepoContentQuery,
  RepoURL
} from '@the7ofdiamonds/ui-ux';

import { SkillsComponent } from '@/views/components/skills/SkillsComponent';
import { Versions } from '@/views/components/project/Versions';
import { RoadmapComponent } from '@/views/components/project/RoadmapComponent';

import { getRepoFile } from '@/controllers/githubSlice';
import {
  loginWithPopUp
} from '@the7ofdiamonds/gateway';

import { useAppDispatch, useAppSelector } from '@/model/hooks';



import styles from './Project.module.scss';

interface DevelopmentProps {
  solution: ProjectSolution | null;
  development: ProjectDevelopment;
  projectQuery: ProjectQuery | null;
}

export const Development: React.FC<DevelopmentProps> = ({ solution, development, projectQuery }) => {
  const dispatch = useAppDispatch();

  const [versions, setVersions] = useState<ProjectVersions | null>(null);
  const [featuresRoadmap, setFeaturesRoadmap] = useState<FeaturesRoadmap | null>(null)
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);
  const [skills, setSkills] = useState<ProjectSkills | null>(null);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (development
      && development.versionsList) {
      setVersions(development.versionsList)
    }
  }, [development?.versionsList]);

  useEffect(() => {
    if (solution && solution?.features) {
      setFeaturesRoadmap(new FeaturesRoadmap(solution.features))
    }
  }, [solution?.features]);

  useEffect(() => {
    if (development
      && development.contentURL
      && development.contentURL.path === 'Development.md') {
      setContent(development.contentURL)
    }
  }, [development?.contentURL]);

  useEffect(() => {
    if (development
      && development.checkList) {
      setCheckList(development.checkList)
    }
  }, [development?.checkList]);

  useEffect(() => {
    if (projectQuery) {
      setQuery(projectQuery)
    }
  }, [projectQuery]);

  useEffect(() => {
    if (development
      && development.skills) {
      setSkills(development.skills)
    }
  }, [development?.skills]);

  useEffect(() => {
    if (development
      && development.repoURL) {
      setRepoURL(development.repoURL)
    }
  }, [development?.repoURL]);

  useEffect(() => {
    if (!isAuthenticated) {
      setButtonTitle('Log in with GitHub');
      setMessage('Click Log in with GitHub to gain access to the code.');
      setMessageType('info');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setButtonTitle('See Code');
      setMessage('Gain access to the source code on GitHub.');
      setMessageType('info');
    }
  }, [isAuthenticated]);

  const handleSeeCode = () => {
    if (isAuthenticated && repoURL && repoURL.url) {
      window.open(repoURL.url, '_blank');
    } else {
      // dispatch(loginWithPopUp());
    }
  };

  const hasContent = versions || featuresRoadmap || content || (checkList && query) || skills;

  return (
    <>{hasContent &&
      <div className={styles['project-process-development']} id="project_process_development">

        <h3 className={styles.title}>development</h3>

        {versions && <Versions projectVersions={versions} />}

        {featuresRoadmap && <RoadmapComponent roadmap={featuresRoadmap} />}

        {content &&
          <ContentComponent title={null} query={new RepoContentQuery()} getFile={getRepoFile} dispatch={dispatch} />}

        {checkList && query && <CheckListComponent checkList={checkList} query={query} />}

        {skills && <SkillsComponent skills={skills} />}

        {repoURL && buttonTitle &&
          <button className={styles.repo} onClick={handleSeeCode}>
            <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
            <h3 className={styles.title}>{buttonTitle}</h3>
          </button>}

        {messageType && message && <StatusBar show={'hide'} messageType={messageType} message={message} />}
      </div>
    }
    </>
  );
}