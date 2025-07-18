import React, { useEffect, useState, ChangeEvent } from 'react';

import { ProjectProcess, StatusBar } from '@the7ofdiamonds/ui-ux';
import { CheckList, Colors, Gallery, Project, ProjectDesign } from '@the7ofdiamonds/ui-ux';

import { EditGallery } from '../components/gallery/EditGallery';
import { EditColorsList } from '@/views/components/edit/components/colors/EditColorsList';
import { EditCheckList } from '@/views/components/edit/components/check_list/EditCheckList';

import styles from './EditProcess.module.scss';

interface EditDesignProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDesign: React.FC<EditDesignProps> = ({ project, change }) => {
  const [design, setDesign] = useState<ProjectDesign>(new ProjectDesign);
  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [colors, setColors] = useState<Colors>(new Colors);
  const [content, setContent] = useState<string>('');

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  useEffect(() => {
    if (project?.process?.design) {
      setDesign(project.process.design)
    }
  }, [project?.process?.design]);

  useEffect(() => {
    if (project?.process?.design?.gallery) {
      setGallery(project.process.design.gallery)
    }
  }, [project?.process?.design?.gallery]);

  useEffect(() => {
    if (project?.process?.design?.checkList) {
      setCheckList(project.process.design.checkList)
    }
  }, [project?.process?.design?.checkList]);

  useEffect(() => {
    if (project?.process?.design?.colors) {
      setColors(project.process.design.colors)
    }
  }, [project?.process?.design?.colors]);

  useEffect(() => {
    if (project?.process?.design?.contentURL?.url) {
      setContent(project.process.design.contentURL.url)
    }
  }, [project?.process?.design?.contentURL]);

  const handleDesignContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'design_content_url') {
        setContent(value);
        design.setContentURL(value)
        setDesign(design)
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
      setShow('show');
    }
  }

  const saveProjectDesign = () => {
    if (!project.process) {
      project.process = new ProjectProcess();
    }

    design.setGallery(gallery)
    design.setCheckList(checkList)
    design.setColors(colors)
    design.setContentURL(content)
    project.process.setDesign(design)
    change(project)
  }

  return (
    <div className={styles.edit} id='edit_design'>
      <h2 className={styles.title}>design</h2>

      <EditCheckList location='design' checkList={checkList} setCheckList={setCheckList}/>

      <br />

      <EditGallery location='design' gallery={gallery} setVal={setGallery} />

      <br />

      <EditColorsList colors={colors} setColors={setColors}/>

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="design_content_url">Design Content URL:</label>
        <input className={styles.input} type="text" name='design_content_url' value={content} onChange={handleDesignContentURLChange} />
      </div>

      <button className={styles.button} onClick={saveProjectDesign}>
        <h3>SAVE DESIGN</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}