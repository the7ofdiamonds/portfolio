import React, { useEffect, useState } from 'react';

import { ProjectSkillsComponent } from '@/views/components/project/ProjectSkillsComponent';
import { CheckListComponent } from '@/views/components/project/CheckListComponent';
import { Versions } from '@/views/components/project/Versions';
import { RoadmapComponent } from '@/views/components/project/RoadmapComponent';

import { ContentComponent } from '@/views/components/content/ContentComponent';
import { StatusBar } from '../StatusBar';
import { ImageComponent } from '../ImageComponent';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Image } from '@/model/Image';
import { RepoURL } from '@/model/RepoURL';
import { Project } from '@/model/Project';
import { FeaturesRoadmap } from '@/model/FeaturesRoadmap';
import { ContentURL } from '@/model/ContentURL';
import { ProjectVersions } from '@/model/ProjectVersions';
import { CheckList } from '@/model/CheckList';
import { ProjectSkills } from '@/model/ProjectSkills';
import { ProjectQuery } from '@/model/ProjectQuery';
import { ProjectDevelopment } from '@/model/ProjectDevelopment';
import { ProjectSolution } from '@/model/ProjectSolution';

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

  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (development
      && development.versionsList) {
      setVersions(development.versionsList)
    }
  }, [development.versionsList]);

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
  }, [development.contentURL]);

  useEffect(() => {
    if (development
      && development.checkList) {
      setCheckList(development.checkList)
    }
  }, [development.checkList]);

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
  }, [development.skills]);

  useEffect(() => {
    if (development
      && development.repoURL) {
      setRepoURL(development.repoURL)
    }
  }, [development.repoURL]);

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
      dispatch(signInWithGitHubPopup());
    }
  };

  const hasContent = versions || featuresRoadmap || content || (checkList && query) || skills;

  return (
    <>{hasContent &&
      <div className="project-process-development" id="project_process_development">

        <h3 className="title">development</h3>

        {versions && <Versions projectVersions={versions} />}

        {featuresRoadmap && <RoadmapComponent roadmap={featuresRoadmap} />}

        {content &&
          <ContentComponent title={''} content={content} />}

        {checkList && query && <CheckListComponent checkList={checkList} query={query} />}

        {skills && <ProjectSkillsComponent skills={skills} />}

        {repoURL && buttonTitle &&
          <button className='repo' onClick={handleSeeCode}>
            <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
            <h3 className='title'>{buttonTitle}</h3>
          </button>}

        {messageType && message && <StatusBar show={'hide'} messageType={messageType} message={message} />}
      </div>
    }
    </>
  );
}