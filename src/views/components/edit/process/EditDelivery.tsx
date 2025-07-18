import React, { useEffect, useState, ChangeEvent } from 'react';

import { ProjectDelivery, ProjectProcess, StatusBar } from '@the7ofdiamonds/ui-ux';
import { CheckList, Gallery, Project } from '@the7ofdiamonds/ui-ux';

import { EditCheckList } from '@/views/components/edit/components/check_list/EditCheckList';
import { EditGallery } from '@/views/components/edit/components/gallery/EditGallery';

import styles from './EditProcess.module.scss';

interface EditDeliveryProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDelivery: React.FC<EditDeliveryProps> = ({ project, change }) => {
  const [delivery, setDelivery] = useState<ProjectDelivery>(new ProjectDelivery)
  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [content, setContent] = useState<string>('');

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  useEffect(() => {
    if (project.process?.delivery) {
      setDelivery(project.process.delivery);
    }
  }, [project.process?.delivery]);

  useEffect(() => {
    if (project.process?.delivery?.gallery) {
      setGallery(project.process.delivery.gallery);
    }
  }, [project.process?.delivery?.gallery]);

  useEffect(() => {
    if (project.process?.delivery?.checkList) {
      setCheckList(project.process.delivery.checkList);
    }
  }, [project.process?.delivery?.checkList]);

  useEffect(() => {
    if (project.process?.delivery?.contentURL?.url) {
      setContent(project.process.delivery.contentURL.url);
    }
  }, [project.process?.delivery?.contentURL]);

  const handleDeliveryContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'delivery_content_url') {
        setContent(value);
      }
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const saveDelivery = () => {
    if (!project.process) {
      project.process = new ProjectProcess();
    }

    delivery.setGallery(gallery)
    delivery.setCheckList(checkList)
    delivery.setContentURL(content)
    project.process.setDelivery(delivery)
    change(project)
  }

  return (
    <div className={styles.edit} id="edit_delivery">

      <h2 className={styles.title}>delivery</h2>

      <EditCheckList location='delivery' checkList={checkList} setCheckList={setCheckList} />

      <br />

      <EditGallery location='delivery' gallery={gallery} setVal={setGallery} />

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="delivery_content_url">
          Delivery Content URL:
        </label>
        <input className={styles.input} type="text" name='delivery_content_url' value={content} onChange={handleDeliveryContentURLChange} />
      </div>

      <button className={styles.button} onClick={saveDelivery}>
        <h3>SAVE DELIVERY</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}