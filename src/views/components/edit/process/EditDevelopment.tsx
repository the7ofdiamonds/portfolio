import React, { useState, useEffect, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import {
  CheckList,
  Gallery,
  Project,
  ProjectDevelopment,
  ProjectProcess,
  ProjectSkills,
  ProjectVersions
} from '@the7ofdiamonds/ui-ux';

import { EditCheckList } from '../components/check_list/EditCheckList';
import { EditGallery } from '../components/gallery/EditGallery';
import { EditSkills } from '../components/skills/EditSkills';
import { EditProjectVersions } from '../components/project_versions/EditProjectVersions';

import styles from './EditProcess.module.scss';

interface EditDevelopmentProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDevelopment: React.FC<EditDevelopmentProps> = ({ project, change }) => {
  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills>(new ProjectSkills);
  const [repoURL, setRepoURL] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [projectVersions, setProjectVersions] = useState<ProjectVersions>(new ProjectVersions);
  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  useEffect(() => {
    if (project.process?.development?.gallery) {
      setGallery(project.process.development.gallery)
    }
  }, [project?.process?.development?.gallery])

  useEffect(() => {
    if (project.process?.development?.checkList) {
      setCheckList(project.process.development.checkList)
    }
  }, [project.process?.development?.checkList]);

  useEffect(() => {
    if (project.process?.development?.skills) {
      setProjectSkills(project.process.development.skills)
    }
  }, [project.process?.development?.skills]);

  useEffect(() => {
    if (project.process?.development?.repoURL?.url) {
      setRepoURL(project.process.development.repoURL.url)
    }
  }, [project.process?.development?.repoURL]);

  useEffect(() => {
    if (project.process?.development?.contentURL?.url) {
      setContent(project.process.development.contentURL.url)
    }
  }, [project.process?.development?.contentURL]);

  useEffect(() => {
    if (project.process?.development?.versionsList) {
      setProjectVersions(project.process.development.versionsList)
    }
  }, [project.process?.development?.versionsList]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'repo_url') {
        setRepoURL(value);
        if (project.process && project.process.development) {
          project.process.development.setContentURL(value);
        } else {
          const projectDevelopment = new ProjectDevelopment();
          projectDevelopment.setRepoURL(value);
          const projectProcess = new ProjectProcess();
          projectProcess.setDevelopment(projectDevelopment);
          project.setProcess(projectProcess);
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
      setShow('show');
    }
  }

  const handleDevelopmentContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'content_url') {
        setContent(value);
        if (project.process && project.process.development) {
          project.process.development.setContentURL(value);
        } else {
          const projectDevelopment = new ProjectDevelopment();
          projectDevelopment.setContentURL(value);
          const projectProcess = new ProjectProcess();
          projectProcess.setDevelopment(projectDevelopment);
          project.setProcess(projectProcess);
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
      setShow('show');
    }
  }

  return (
    <div className={styles.edit} id='edit_development'>
      <h2 className={styles.title}>development</h2>

      <EditCheckList location='development' checkList={checkList} />

      <br />

      <EditSkills projectSkills={projectSkills} />

      <br />

      <EditGallery location='development' gallery={gallery} setVal={function (value: Gallery): void {
        throw new Error('Function not implemented.');
      }} />

      <br />

      <EditProjectVersions projectVersions={projectVersions} />

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="repo_url">Repo URL:</label>
        <input className={styles.input} type="text" name='repo_url' value={repoURL} onChange={handleRepoURLChange} />
      </div>

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="development_content_url">Development Content URL:</label>
        <input className={styles.input} type="text" name='development_content_url' value={content} onChange={handleDevelopmentContentURLChange} />
      </div>

      <button className={styles.button} onClick={change(project)}>
        <h3>SAVE DEVELOPMENT</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}