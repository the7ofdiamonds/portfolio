import React, { useEffect, useState, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { CheckList, Colors, Gallery, ProjectDesign, ContentURL } from '@the7ofdiamonds/ui-ux';

import { EditGallery } from '../components/gallery/EditGallery';
import { EditColorsList } from '../../../../views/components/edit/components/colors/EditColorsList';
import { EditCheckList } from '../../../../views/components/edit/components/check_list/EditCheckList';

import styles from './EditProcess.module.scss';

interface EditDesignProps {
  id: string | number | null;
  design: ProjectDesign;
  setDesign: React.Dispatch<React.SetStateAction<ProjectDesign>>;
}

export const EditDesign: React.FC<EditDesignProps> = ({ id, design, setDesign }) => {

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery>(design?.gallery ?? new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(design?.checkList ?? new CheckList);
  const [colors, setColors] = useState<Colors>(design?.colors ?? new Colors);
  const [content, setContent] = useState<ContentURL>(design?.contentURL ?? new ContentURL);

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
    const updatedProjectDesign = ProjectDesign();

    updatedProjectDesign.setGallery(gallery)
    updatedProjectDesign.setCheckList(checkList)
    updatedProjectDesign.setColors(colors)
    updatedProjectDesign.setContentURL(content)

    setDesign(updatedProjectDesign)
  }

  return (
    <div className={styles.edit} id='edit_design'>
      <h2 className={styles.title}>design</h2>

      <EditCheckList location='design' checkList={checkList} setCheckList={setCheckList} />

      <br />

      <EditGallery location='design' gallery={gallery} setVal={setGallery} />

      <br />

      <EditColorsList colors={colors} setColors={setColors} />

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