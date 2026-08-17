import React, { useEffect, useState } from 'react';

import {
  CheckList,
  CheckListComponent,
  ContentComponent,
  FeaturesRoadmap,
  ProjectDevelopment,
  ProjectQuery,
  ProjectSkills,
  ProjectVersions,
  RepoContentQuery,
  Skills,
  Features
} from '@the7ofdiamonds/ui-ux';


import { Versions } from './versions/Versions';
import { RoadmapComponent } from './roadmap/RoadmapComponent';
import { ProjectSkillsComponent } from './project_skills/ProjectSkillsComponent';

import { getRepoFile } from '../../../../../controllers/githubSlice';

import { useAppDispatch } from '../../../../../model/hooks';

import styles from './Development.module.scss';

interface DevelopmentProps {
  query: ProjectQuery;
  development: ProjectDevelopment;
  skills: Skills | null;
  features: Features | null;
}

export const Development: React.FC<DevelopmentProps> = ({ query, development, skills, features }) => {
  const dispatch = useAppDispatch();

  const [versions, setVersions] = useState<ProjectVersions | null>(null);
  const [featuresRoadmap, setFeaturesRoadmap] = useState<FeaturesRoadmap | null>(null)
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [contentQuery, setContentQuery] = useState<RepoContentQuery | null>(null);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills | null>(null);

  useEffect(() => {
    if (development?.versionsList) {
      setVersions(development.versionsList)
    } else {
      setVersions(null)
    }
  }, [development?.versionsList]);

  useEffect(() => {
    if (features?.list) {
      setFeaturesRoadmap(new FeaturesRoadmap(features.list))
    } else {
      setFeaturesRoadmap(null)
    }
  }, [features?.list]);

  useEffect(() => {
    if (development?.checkList) {
      setCheckList(development.checkList)
    } else {
      setCheckList(null)
    }
  }, [development?.checkList]);

  useEffect(() => {
    if (query?.owner && query?.repo && development?.contentURL?.url) {
      setContentQuery(new RepoContentQuery(query.owner, query.repo, 'Development.md', development?.contentURL?.branch ?? ''))
    } else {
      setContentQuery(null)
    }
  }, [query, development?.contentURL]);

  useEffect(() => {
    if (development?.skills) {
      setProjectSkills(development.skills)
    } else {
      setProjectSkills(null)
    }
  }, [development?.skills]);

  const hasContent = versions || featuresRoadmap || checkList || contentQuery || skills;

  return (
    <>{hasContent &&
      <div className={styles['project-process-development']} id="project_process_development">

        <h3 className={styles.title}>development</h3>

        {versions && <Versions projectVersions={versions} />}

        {featuresRoadmap && <RoadmapComponent roadmap={featuresRoadmap} />}

        {contentQuery &&
          <ContentComponent<RepoContentQuery> title={null} query={contentQuery} getFile={getRepoFile} dispatch={dispatch} />}

        {checkList && <CheckListComponent checkList={checkList} />}

        {projectSkills && skills && <ProjectSkillsComponent projectSkills={projectSkills} skills={skills} />}
      </div>
    }
    </>
  );
}