import React, { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectDevelopmentObject } from '@/model/ProjectDevelopment';
import ProjectVersions, { ProjectVersionsObject } from '@/model/ProjectVersions';
import Project, { ProjectObject } from '@/model/Project';
import ProjectSkills from '@/model/ProjectSkills';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import UpdateCheckList from '../components/UpdateCheckList';
import UpdateSkills from '../components/UpdateSkills';
import UpdateProjectVersions from '../components/UpdateProjectVersions';
import UpdateGallery from '../components/UpdateGallery';
import RepoURL from '@/model/RepoURL';

interface UpdateDevelopmentProps {
  project: Project;
}

const UpdateDevelopment: React.FC<UpdateDevelopmentProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDevelopmentCheckList, updatedVersionsList, updatedProjectSkills, updatedDevelopmentGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills>(new ProjectSkills);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [projectVersions, setProjectVersions] = useState<ProjectVersions>(new ProjectVersions);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setGallery(project.process?.development?.gallery ?? new Gallery)
  }, [project?.process?.development?.gallery, setGallery])

  useEffect(() => {
    setCheckList(project.process?.development?.checkList ?? new CheckList)
  }, [project, setCheckList]);

  useEffect(() => {
    setProjectSkills(project.process?.development?.skills ?? new ProjectSkills)
  }, [project, setProjectSkills]);

  useEffect(() => {
    setRepoURL(project.process?.development?.repoURL ?? null)
  }, [project, setRepoURL]);

  useEffect(() => {
    setContent(project.process?.development?.contentURL ?? null)
  }, [project, setContent]);

  useEffect(() => {
    setProjectVersions(project.process?.development?.versionsList ?? new ProjectVersions)
  }, [project, setProjectVersions]);

  useEffect(() => {
    if (updatedDevelopmentGallery) {
      setGallery(new Gallery(updatedDevelopmentGallery));
    }
  }, [updatedDevelopmentGallery, setGallery]);

  useEffect(() => {
    if (updatedDevelopmentCheckList) {
      setCheckList(new CheckList(updatedDevelopmentCheckList))
    }
  }, [updatedDevelopmentCheckList, setCheckList]);

  useEffect(() => {
    if (updatedProjectSkills) {
      setProjectSkills(new ProjectSkills(updatedProjectSkills))
    }
  }, [updatedProjectSkills, setProjectSkills]);

  useEffect(() => {
    if (updatedVersionsList) {
      const projectVersionsObject: ProjectVersionsObject = {
        history: updatedVersionsList?.history,
        current: updatedVersionsList?.current,
        future: updatedVersionsList?.future
      }
      setProjectVersions(new ProjectVersions(projectVersionsObject))
    }
  }, [updatedVersionsList, setProjectVersions]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'repo_url') {
      setRepoURL(new RepoURL(value))
    }
  }

  const handleDevelopmentContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'content_url') {
      setContent(new ContentURL(value));
    }
  }

  const handleUpdateDevelopment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDevelopment: ProjectDevelopmentObject = {
        gallery: gallery.toGalleryObject(),
        repo_url: repoURL ? repoURL.url : null,
        content_url: content ? content.url : null,
        skills: projectSkills.toProjectSkillsObject(),
        check_list: checkList.toCheckListObject(),
        versions_list: projectVersions.toProjectVersionsObject()
      };

      const updatedProject: ProjectObject = {
        ...projectObject,
        process: {
          ...projectObject.process,
          design: projectObject.process?.design ?? null,
          development: updatedDevelopment,
          delivery: projectObject.process?.delivery ?? null,
          status: projectObject.process?.status ?? null
        }
      }

      dispatch(updateProject(new Project(updatedProject)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <div className='update' id='update_development'>
      <h2 className="title">development</h2>

      <UpdateCheckList location='development' checkList={checkList} />

      <br />

      <UpdateSkills projectSkills={projectSkills} />

      <br />

      <UpdateGallery location='development' gallery={gallery} />

      <br />

      <UpdateProjectVersions projectVersions={projectVersions} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="repo_url">Repo URL:</label>
        <input type="text" name='repo_url' value={repoURL && repoURL.url ? repoURL.url : ''} onChange={handleRepoURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="development_content_url">Development Content URL:</label>
        <input type="text" name='development_content_url' value={content?.url ?? ''} onChange={handleDevelopmentContentURLChange} />
      </div>

      <button onClick={handleUpdateDevelopment}>
        <h3>Update Development</h3>
      </button>
    </div>
  )
}

export default UpdateDevelopment