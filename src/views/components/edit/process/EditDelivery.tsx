import React, { useEffect, useState, ChangeEvent } from 'react';

import { Project } from '@/model/Project';
import { Gallery } from '@/model/Gallery';
import { CheckList } from '@/model/CheckList';

import { UpdateCheckList } from '@/views/components/update/components/UpdateCheckList';
import { UpdateGallery } from '@/views/components/update/components/UpdateGallery';

import { StatusBar } from '@/views/components/status_bar/StatusBar';

interface EditDeliveryProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDelivery: React.FC<EditDeliveryProps> = ({ project, change }) => {
  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [content, setContent] = useState<string>('');
  const [show, setShow] = useState<string>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');

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

  return (
    <div className="update" id="update_delivery">

      <h2 className="title">delivery</h2>

      <UpdateCheckList location='delivery' checkList={checkList} />

      <br />

      <UpdateGallery location='delivery' gallery={gallery} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="delivery_content_url">
          Delivery Content URL:
        </label>
        <input type="text" name='delivery_content_url' value={content} onChange={handleDeliveryContentURLChange} />
      </div>

      <button onClick={change(project)}>
        <h3>SAVE DELIVERY</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}