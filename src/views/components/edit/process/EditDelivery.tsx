import React, { useEffect, useState, ChangeEvent } from 'react';

import { ProjectDelivery, ProjectProcess, StatusBar } from '@the7ofdiamonds/ui-ux';
import { CheckList, ContentURL, Gallery } from '@the7ofdiamonds/ui-ux';

import { EditCheckList } from '../../../../views/components/edit/components/check_list/EditCheckList';
import { EditGallery } from '../../../../views/components/edit/components/gallery/EditGallery';

import styles from './EditProcess.module.scss';

interface EditDeliveryProps {
  id: string | number | null;
  delivery: ProjectDelivery;
  setDelivery: React.Dispatch<React.SetStateAction<ProjectDelivery>>;
}

export const EditDelivery: React.FC<EditDeliveryProps> = ({ id, delivery, setDelivery }) => {

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery>(delivery?.gallery ?? new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(delivery?.checkList ?? new CheckList);
  const [content, setContent] = useState<ContentURL>(delivery?.contentURL ?? new ContentURL);

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
    const updatedDelivery = new ProjectDelivery();

    updatedDelivery.setGallery(gallery)
    updatedDelivery.setCheckList(checkList)
    updatedDelivery.setContentURL(content)

    setDelivery(updatedDelivery)
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