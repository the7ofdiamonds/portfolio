import React, { useState, useEffect, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import {
  CheckList,
  Gallery,
  ProjectDevelopment,
  ProjectSkills,
  ProjectVersions
} from '@the7ofdiamonds/ui-ux';

import { EditCheckList } from '../components/check_list/EditCheckList';
import { EditGallery } from '../components/gallery/EditGallery';
import { EditSkills } from '../components/skills/EditSkills';
import { EditProjectVersions } from '../components/project_versions/EditProjectVersions';

import styles from './EditProcess.module.scss';

interface EditDevelopmentProps {
  id: string | number | null;
  development: ProjectDevelopment;
  setDevelopment: React.Dispatch<React.SetStateAction<ProjectDevelopment>>;
}

export const EditDevelopment: React.FC<EditDevelopmentProps> = ({ id, development, setDevelopment }) => {

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery>(development?.gallery ?? new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(development?.checkList ?? new CheckList);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills>(development?.skills ?? new ProjectSkills);
  const [repoURL, setRepoURL] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [projectVersions, setProjectVersions] = useState<ProjectVersions>(development?.versionsList ?? new ProjectVersions);

  // useEffect(() => {
  //   if (project.process?.development?.repoURL?.url) {
  //     setRepoURL(project.process.development.repoURL.url)
  //   }
  // }, [project.process?.development?.repoURL]);

  // useEffect(() => {
  //   if (project.process?.development?.contentURL?.url) {
  //     setContent(project.process.development.contentURL.url)
  //   }
  // }, [project.process?.development?.contentURL]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'repo_url') {
        // setRepoURL(value);
        // if (project.process && project.process.development) {
        //   project.process.development.setContentURL(value);
        // } else {
        //   const projectDevelopment = new ProjectDevelopment();
        //   projectDevelopment.setRepoURL(value);
        //   const projectProcess = new ProjectProcess();
        //   projectProcess.setDevelopment(projectDevelopment);
        //   project.setProcess(projectProcess);
        // }
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
        // setContent(value);
        // if (project.process && project.process.development) {
        //   project.process.development.setContentURL(value);
        // } else {
        //   const projectDevelopment = new ProjectDevelopment();
        //   projectDevelopment.setContentURL(value);
        //   const projectProcess = new ProjectProcess();
        //   projectProcess.setDevelopment(projectDevelopment);
        //   project.setProcess(projectProcess);
        // }
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
      setShow('show');
    }
  }

  const saveDevelopment = () => {
    const updatedDevelopment = new ProjectDevelopment();

    updatedDevelopment.setGallery(gallery)
    updatedDevelopment.setCheckList(checkList)
    updatedDevelopment.setSkills(projectSkills)
    updatedDevelopment.setRepoURL(repoURL)
    updatedDevelopment.setContentURL(content)
    updatedDevelopment.setVersionsList(projectVersions)

    setDevelopment(updatedDevelopment)
  }

  return (
    <div className={styles.edit} id='edit_development'>
      <h2 className={styles.title}>development</h2>

      <EditCheckList location='development' checkList={checkList} setCheckList={setCheckList} />

      <br />

      <EditSkills projectSkills={projectSkills} setProjectSkills={setProjectSkills} />

      <br />

      <EditGallery location='development' gallery={gallery} setVal={setGallery} />

      <br />

      <EditProjectVersions projectVersions={projectVersions} setProjectVersions={setProjectVersions} />

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="repo_url">Repo URL:</label>
        <input className={styles.input} type="text" name='repo_url' value={repoURL} onChange={handleRepoURLChange} />
      </div>

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="development_content_url">Development Content URL:</label>
        <input className={styles.input} type="text" name='development_content_url' value={content} onChange={handleDevelopmentContentURLChange} />
      </div>

      <button className={styles.button} onClick={saveDevelopment}>
        <h3>SAVE DEVELOPMENT</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}