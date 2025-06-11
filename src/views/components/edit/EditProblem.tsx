import React, { useEffect, useState, ChangeEvent } from 'react';

import { useAppSelector } from '@/model/hooks';
import { Gallery } from '@/model/Gallery';
import { Project } from '@/model/Project';

import { UpdateGallery } from '@/views/components/update/components/UpdateGallery';
import { ProjectProblem } from '@/model/ProjectProblem';

import { StatusBar } from '@/views/components/status_bar/StatusBar';

interface EditProblemProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProblem: React.FC<EditProblemProps> = ({ project, change }) => {
  const { updatedProblemGallery } = useAppSelector(
    (state) => state.update
  );

  const [gallery, setGallery] = useState<Gallery>(new Gallery);
  const [contentURL, setContentURL] = useState<string>('');
  const [whitepaperURL, setWhitepaperURL] = useState<string>('');
  const [show, setShow] = useState<string>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');

  useEffect(() => {
    if (project.problem?.gallery) {
      setGallery(project.problem.gallery);
    }
  }, [project.problem?.gallery]);

  useEffect(() => {
    if (project.problem?.contentURL?.url) {
      setContentURL(project.problem.contentURL.url);
    }
  }, [project.problem?.contentURL?.url]);

  useEffect(() => {
    if (project.problem?.whitepaperURL?.url) {
      setWhitepaperURL(project.problem.whitepaperURL.url);
    }
  }, [project.problem?.whitepaperURL]);

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
        if (project.problem) {
          project.problem.setContentURL(value);
        } else {
          const projetProblem = new ProjectProblem();
          projetProblem.setContentURL(value);
          project.setProblem(projetProblem);
        }
      }
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const handleWhitepaperURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'whitepaper_url') {
        setWhitepaperURL(value);
        if (project.problem) {
          project.problem.setWhitepaperURL(value);
        } else {
          const projetProblem = new ProjectProblem();
          projetProblem.setWhitepaperURL(value);
          project.setProblem(projetProblem);
        }
      }
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  return (
    <div className="update" id="update_problem">

      <h2 className="title">Problem</h2>

      <UpdateGallery location='problem' gallery={gallery} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="problem_content_url">Problem Content URL:</label>
        <input type="text" name='problem_content_url' value={contentURL} onChange={handleProblemContentURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="whitepaper_url">Whitepaper URL:</label>
        <input type="text" name='whitepaper_url' value={whitepaperURL} onChange={handleWhitepaperURLChange} />
      </div>

      <button onClick={change(project)}>
        <h3>SAVE PROBLEM</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  );
};