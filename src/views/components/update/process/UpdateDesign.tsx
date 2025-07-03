import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../../model/store';
import ProjectDesign, { ProjectDesignObject } from '../../../../model/ProjectDesign';
import Project, { ProjectObject } from '@/model/Project';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import Color from '@/model/Color';
import ContentURL, { ContentURLObject } from '@/model/ContentURL';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import UpdateCheckList from '../components/UpdateCheckList';
import UpdateGallery from '../components/UpdateGallery';
import UpdateColorsList from '../components/UpdateColorsList';

interface UpdateDesignProps {
  project: Project;
}

const UpdateDesign: React.FC<UpdateDesignProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDesignGallery, updatedDesignCheckList, updatedColors } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [checkList, setCheckList] = useState<CheckList>(new CheckList);
  const [colorsList, setColorsList] = useState<Array<Color>>([]);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setGallery(project.process?.design?.gallery ?? new Gallery)
  }, [project.process?.design?.gallery, setGallery]);

  useEffect(() => {
    setCheckList(project.process?.design?.checkList ?? new CheckList)
  }, [project.process?.design?.checkList, setCheckList]);

  useEffect(() => {
    setColorsList(project.process?.design?.colorsList ?? [])
  }, [project.process?.design?.colorsList, setColorsList]);

  useEffect(() => {
    setContent(project.process?.design?.contentURL ?? null)
  }, [project.process?.design?.contentURL, setContent]);

  useEffect(() => {
    if (updatedDesignGallery) {
      setGallery(new Gallery(updatedDesignGallery))
    }
  }, [updatedDesignGallery, setGallery]);

  useEffect(() => {
    if (updatedDesignCheckList) {
      setCheckList(new CheckList(updatedDesignCheckList))
    }
  }, [updatedDesignCheckList, setCheckList]);

  useEffect(() => {
    if (updatedColors) {
      setColorsList(updatedColors.map((color) => new Color(color)))
    }
  }, [updatedColors, setColorsList]);

  const handleDesignContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'design_content_url') {
      const contentObject: ContentURLObject = {
        owner: null,
        repo: null,
        path: null,
        branch: null,
        url: value,
        isValid: false
      }

      setContent(new ContentURL(value));
    }
  }

  const handleUpdateDesign = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const projectDesignObject: ProjectDesignObject = {
        gallery: gallery ? gallery.toGalleryObject() : null,
        check_list: checkList ? checkList.toCheckListObject() : null,
        colors_list: colorsList.map((color) => color.toColorObject()),
        content_url: content ? content.url : null
      };

      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        process: {
          design: projectDesignObject,
          development: projectObject.process?.development ?? null,
          delivery: projectObject.process?.delivery ?? null,
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
    <div className='update' id='update_design'>
      <h2 className="title">design</h2>

      <UpdateCheckList location='design' checkList={checkList} />

      <br />

      <UpdateGallery location='design' gallery={gallery} />

      <br />

      <UpdateColorsList colorsObject={colorsList} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="design_content_url">Design Content URL:</label>
        <input type="text" name='design_content_url' value={content?.url ?? ''} onChange={handleDesignContentURLChange} />
      </div>

      <button onClick={handleUpdateDesign}>
        <h3>Update Design</h3>
      </button>
    </div>
  )
}

export default UpdateDesign