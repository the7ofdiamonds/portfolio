import React, { useEffect, useState, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { Gallery, ProjectProblem } from '@the7ofdiamonds/ui-ux';
import type { ProjectProblemObject } from '@the7ofdiamonds/ui-ux';

import { EditGallery } from '../../../views/components/edit/components/gallery/EditGallery';

import styles from './Edit.module.scss';

interface EditProblemProps {
  id: string | number | null;
  problem: ProjectProblem;
  setProblem: React.Dispatch<React.SetStateAction<ProjectProblem>>;
}

export const EditProblem: React.FC<EditProblemProps> = ({ id, problem, setProblem }) => {
  const instruction: string = "Save updates made to the project problem.";


  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>(instruction);
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery>(problem?.gallery ?? new Gallery());
  const [contentURL, setContentURL] = useState<string>(problem?.contentURL?.url ?? '');
  const [whitepaperURL, setWhitepaperURL] = useState<string>(problem?.whitepaperURL?.url ?? '');

  const handleProblemContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;
      const { name, value } = target;

      if (name === 'problem_content_url') setContentURL(value);
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

      if (name === 'whitepaper_url') setWhitepaperURL(value);
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const saveProblem = () => {
    try {
      setMessage(instruction);

      let hasData = false;

      if (gallery.images.length > 0) {
        gallery.setID(id)
        problem.setGallery(gallery);
        hasData = true;
      }

      if (contentURL.trim()) {
        problem.setContentURL(contentURL);
        hasData = true;
      }

      if (hasData) {
        if (!problem.id) problem.setID(id)
      }
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  return (
    <details className={styles['edit-problem']} id="edit_problem">
      <summary><h2 className={styles.title}>Problem</h2></summary>

      <div className={styles.edit}>
        <EditGallery location='problem' gallery={gallery} setGallery={setGallery} />

        <hr />

        <div className={styles['form-item-flex']}>
          <label className={styles.label} htmlFor="problem_content_url">Problem Content URL:</label>
          <input className={styles.input} type="text" name='problem_content_url' value={contentURL} onChange={handleProblemContentURLChange} />
        </div>

        <div className={styles['form-item-flex']}>
          <label className={styles.label} htmlFor="whitepaper_url">Whitepaper URL:</label>
          <input className={styles.input} type="text" name='whitepaper_url' value={whitepaperURL} onChange={handleWhitepaperURLChange} />
        </div>

        <StatusBar show={show} messageType={messageType} message={message} />

        <button className={styles.button} onClick={saveProblem}>
          <h3>SAVE PROBLEM</h3>
        </button>
      </div>
    </details>
  );
};