import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectDeliveryObject } from '@/model/ProjectDelivery';
import Project, { ProjectObject } from '@/model/Project';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import UpdateGallery from '../components/UpdateGallery';
import UpdateCheckList from '../components/UpdateCheckList';

interface UpdateDeliveryProps {
  project: Project;
}

const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDeliveryGallery, updatedDeliveryCheckList } = useSelector((state: RootState) => state.update);

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => { setProjectObject(project.toProjectObject()) }, [project, setProjectObject]);

  useEffect(() => {
    setGallery(project.process?.delivery?.gallery ?? new Gallery)
  }, [project.process?.delivery?.gallery, setGallery]);

  useEffect(() => {
    setCheckList(project.process?.delivery?.checkList ?? new CheckList)
  }, [project.process?.delivery?.checkList, setCheckList]);

  useEffect(() => {
    setContent(project.process?.delivery?.contentURL ?? null)
  }, [project.process?.delivery?.contentURL, setContent]);

  useEffect(() => {
    if (updatedDeliveryCheckList) {
      setCheckList(new CheckList(updatedDeliveryCheckList));
    }
  }, [updatedDeliveryCheckList, setCheckList]);

  useEffect(() => {
    if (updatedDeliveryGallery) {
      setGallery(new Gallery(updatedDeliveryGallery));
    }
  }, [updatedDeliveryGallery, setGallery]);

  const handleDeliveryContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'delivery_content_url') {
        setContent(new ContentURL(value));
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDeliveryObject: ProjectDeliveryObject = {
        check_list: checkList.toCheckListObject(),
        gallery: gallery.toGalleryObject(),
        content_url: content ? content.url : null
      };

      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        process: {
          design: projectObject.process?.design ?? null,
          development: projectObject.process?.development ?? null,
          delivery: updatedDeliveryObject,
          status: projectObject.process?.status ?? null
        }
      };

      dispatch(updateProject(new Project(updatedProjectObject)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
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
        <input type="text" name='delivery_content_url' value={content?.url ?? ''} onChange={handleDeliveryContentURLChange} />
      </div>

      <button onClick={handleUpdateDelivery}>
        <h3>Update Delivery</h3>
      </button>
    </div>
  )
}

export default UpdateDelivery