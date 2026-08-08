import React, { useState, ChangeEvent } from 'react';

import { StatusBar, EditProjectURL } from '@the7ofdiamonds/ui-ux';
import { Features, Gallery, ProjectSolution, ProjectURLs } from '@the7ofdiamonds/ui-ux';

import { EditFeatures } from '../../../views/components/edit/components/features/EditFeatures';
import { EditGallery } from '../../../views/components/edit/components/gallery/EditGallery';

import styles from './Edit.module.scss';

interface EditSolutionProps {
  id: string | number | null;
  solution: ProjectSolution;
  setSolution: React.Dispatch<React.SetStateAction<ProjectURLs>>;
}

export const EditSolution: React.FC<EditSolutionProps> = ({ id, solution, setSolution }) => {
  const instruction: string = "Save changes made to the project solution.";

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>(instruction);
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery | null>(solution?.gallery ?? new Gallery());
  const [features, setFeatures] = useState<Features | null>(solution?.features ?? new Features());
  const [projectURLs, setProjectURLs] = useState<ProjectURLs | null>(solution?.projectURLs ?? new ProjectURLs());
  const [content, setContent] = useState<string>('');

  const handleSolutionContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'solution_content_url') {
        setContent(value)
      }
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const saveSolution = () => {
    try {
      const updatedSolution = new ProjectSolution();

      let hasData = false;

      if (gallery.images.length > 0) {
        gallery.setID(id)
        updatedSolution.setGallery(gallery);
        hasData = true;
      }

      if (features.list.length > 0) {
        features.setID(id)
        updatedSolution.setFeatures(features);
        hasData = true;
      }

      if (projectURLs.hasData()) {
        projectURLs.setID(id)
        updatedSolution.setProjectURLs(projectURLs);
        hasData = true;
      }

      if (content) {
        updatedSolution.setContentURL(content);
        hasData = true;
      }

      if (hasData) {
        if (!updatedSolution.id) updatedSolution.setID(id)
      }

      if (projectURLs.hasData()) {
        updatedSolution.setProjectURLs(projectURLs)
      }

      setSolution(updatedSolution)
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  return (
    <details className={styles['edit-solution']} id='edit_solution'>
      <summary><h1 className={styles.title}>solution</h1></summary>

      <div className={styles.edit}>
        <EditGallery location='solution' gallery={gallery} setGallery={setGallery} />

        <EditFeatures features={features} setFeatures={setFeatures} />

        <EditProjectURL projectURLs={projectURLs} setProjectURLs={setProjectURLs} />

        {/* Make this a component */}
        <div className={styles['form-item-flex']}>
          <label className={styles.label} htmlFor="solution_content_url">Solution Content URL:</label>
          <input className={styles.input} type="text" id="solution_content_url" value={content} placeholder='URL to the html content' name='solution_content_url' onChange={handleSolutionContentURLChange} />
        </div>

        <StatusBar show={show} messageType={messageType} message={message} />

        <button className={styles.button} onClick={saveSolution}>
          <h3>SAVE SOLUTION</h3>
        </button>
      </div>
    </details>
  )
}