import React, { useEffect, useState, ChangeEvent } from 'react';

import { Project } from '@/model/Project';
import { Gallery } from '@/model/Gallery';
import { CheckList } from '@/model/CheckList';
import { Color } from '@/model/Color';

import { EditGallery } from '../components/gallery/EditGallery';
import { EditColorsList } from '@/views/components/edit/components/colors/EditColorsList';
import { EditCheckList } from '@/views/components/edit/components/check_list/EditCheckList';
import { StatusBar } from '@/views/components/status_bar/StatusBar';

import styles from './EditProcess.module.scss';

interface EditDesignProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDesign: React.FC<EditDesignProps> = ({ project, change }) => {
  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [colorsList, setColorsList] = useState<Array<Color>>([]);
  const [content, setContent] = useState<string>('');
  const [show, setShow] = useState<string>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');

  useEffect(() => {
    if (project.process?.design?.gallery) {
      setGallery(project.process.design.gallery)
    }
  }, [project.process?.design?.gallery, setGallery]);

  useEffect(() => {
    if (project.process?.design?.checkList) {
      setCheckList(project.process.design.checkList)
    }
  }, [project.process?.design?.checkList]);

  useEffect(() => {
    if (project.process?.design?.colorsList) {
      setColorsList(project.process.design.colorsList)
    }
  }, [project.process?.design?.colorsList]);

  useEffect(() => {
    if (project.process?.design?.contentURL?.url) {
      setContent(project.process.design.contentURL.url)
    }
  }, [project.process?.design?.contentURL]);

  const handleDesignContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'design_content_url') {
        setContent(value);
        if (project.process && project.process.design) {
          project.process.design.setContentURL(value)
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
    <div className={styles.edit} id='edit_design'>
      <h2 className={styles.title}>design</h2>

      <EditCheckList location='design' checkList={checkList} />

      <br />

      <EditGallery location='design' gallery={gallery} />

      <br />

      <EditColorsList colorsObject={colorsList} />

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="design_content_url">Design Content URL:</label>
        <input className={styles.input} type="text" name='design_content_url' value={content} onChange={handleDesignContentURLChange} />
      </div>

      <button className={styles.button} onClick={change(project)}>
        <h3>SAVE DESIGN</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}