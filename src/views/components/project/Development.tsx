import React, { useEffect, useState } from 'react';

import {
  CheckList,
  CheckListComponent,
  ContentComponent,
  FeaturesRoadmap,
  ProjectDevelopment,
  ProjectQuery,
  ProjectSkills,
  ProjectSolution,
  ProjectVersions,
  RepoContentQuery,
  RepoURL,
  Skills
} from '@the7ofdiamonds/ui-ux';
import type {
  MessageType,
  StatusBarVisibility
} from '@the7ofdiamonds/ui-ux';

import { Versions } from '../../../views/components/project/Versions';
import { RoadmapComponent } from '../../../views/components/project/RoadmapComponent';

import { getRepoFile } from '../../../controllers/githubSlice';

import { useAppDispatch } from '../../../model/hooks';

import { ProjectSkillsComponent } from './ProjectSkillsComponent';

import styles from './Project.module.scss';

interface DevelopmentProps {
  solution: ProjectSolution | null;
  development: ProjectDevelopment;
  projectQuery: ProjectQuery | null;
  skills: Skills | null;
}

export const Development: React.FC<DevelopmentProps> = ({ solution, development, projectQuery, skills }) => {
  const dispatch = useAppDispatch();

  const [versions, setVersions] = useState<ProjectVersions | null>(null);
  const [featuresRoadmap, setFeaturesRoadmap] = useState<FeaturesRoadmap | null>(null)
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<RepoContentQuery | null>(null);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills | null>(null);

  useEffect(() => {
    if (development
      && development.versionsList) {
      setVersions(development.versionsList)
    }
  }, [development?.versionsList]);

  useEffect(() => {
    if (solution && solution?.features) {
      setFeaturesRoadmap(new FeaturesRoadmap(solution.features.list))
    }
  }, [solution?.features]);

  useEffect(() => {
    if (development?.checkList?.tasks && development.checkList.tasks?.list.size > 0) {
      setCheckList(development.checkList)
    }
  }, [development?.checkList]);

  useEffect(() => {
    if (development.contentURL && development.contentURL && development.contentURL.owner && development.contentURL.repo && development.contentURL.path) {
      setQuery(new RepoContentQuery(development.contentURL.owner, development.contentURL.repo, development.contentURL.path, development.contentURL.branch ?? ''))
    }
  }, [development?.contentURL]);

  useEffect(() => {
    if (development
      && development.skills) {
      setProjectSkills(development.skills)
    }
  }, [development?.skills]);

  const hasContent = versions || featuresRoadmap || (checkList && query) || skills;

  return (
    <>{hasContent &&
      <div className={styles['project-process-development']} id="project_process_development">

        <h3 className={styles.title}>development</h3>

        {versions && <Versions projectVersions={versions} />}

        {featuresRoadmap && <RoadmapComponent roadmap={featuresRoadmap} />}

        {query &&
          <ContentComponent<RepoContentQuery> title={null} query={query} getFile={getRepoFile} dispatch={dispatch} />}

        {checkList && <CheckListComponent checkList={checkList} />}

        {projectSkills && skills && <ProjectSkillsComponent projectSkills={projectSkills} skills={skills} />}
      </div>
    }
    </>
  );
}