import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import type { AppDispatch, RootState } from '@/model/store';
import Gallery from '@/model/Gallery';
import Project, { ProjectObject } from '@/model/Project';
import DocumentURL, { DocumentURLObject } from '@/model/DocumentURL';

import UpdateGallery from './components/UpdateGallery';
import ContentURL from '@/model/ContentURL';

interface UpdateProblemProps {
  project: Project;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedProblemGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject())
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentURL, setContentURL] = useState<string | null>(null);
  const [whitepaperURL, setWhitepaperURL] = useState<string | null>(null);

  useEffect(() => {
    setProjectObject(project.toProjectObject());
  }, [project, setProjectObject]);

  useEffect(() => {
    setGallery(project.problem?.gallery ?? null);
  }, [project, setGallery]);

  useEffect(() => {
    setContentURL(project.problem?.contentURL?.url ?? '');
  }, [project, setContentURL]);

  useEffect(() => {
    setWhitepaperURL(project.problem?.whitepaperURL?.url ?? null);
  }, [project.problem?.whitepaperURL, setWhitepaperURL]);

  useEffect(() => {
    if (updatedProblemGallery) {
      setGallery(new Gallery(updatedProblemGallery));
    }
  }, [updatedProblemGallery, setGallery]);

  const handleProblemContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'problem_content_url') {
        setContentURL(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleWhitepaperURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;
      const validDocumentURL = new DocumentURL(value);
      if (name === 'whitepaper_url') {
        setWhitepaperURL(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateProblem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        problem: {
          gallery: gallery ? gallery.toGalleryObject() : null,
          content_url: contentURL ? contentURL : null,
          whitepaper_url: whitepaperURL ? whitepaperURL : null
        },
      };

      dispatch(updateProject(new Project(updatedProjectObject)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <div className="update" id="update_problem">

      <h2 className="title">Problem</h2>

      {gallery && <UpdateGallery location='problem' gallery={gallery} />}

      <hr />

      <div className="form-item-flex">
        <label htmlFor="problem_content_url">Problem Content URL:</label>
        <input type="text" name='problem_content_url' value={contentURL ?? ''} onChange={handleProblemContentURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="whitepaper_url">Whitepaper URL:</label>
        <input type="text" name='whitepaper_url' value={whitepaperURL ?? ''} onChange={handleWhitepaperURLChange} />
      </div>

      <button onClick={handleUpdateProblem}>
        <h3>UPDATE PROBLEM</h3>
      </button>
    </div>
  );
};

export default UpdateProblem;