import React, { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Project } from '@/model/Project';
import { ProjectSolution } from '@/model/ProjectSolution';
import { Gallery } from '@/model/Gallery';
import { Feature } from '@/model/Feature';
import { ProjectURLs } from '@/model/ProjectURLs';

import { EditFeatures } from '@/views/components/edit/components/features/EditFeatures';
import { EditProjectURL } from '@/views/components/edit/components/project_url/EditProjectURL';
import { EditGallery } from '@/views/components/edit/components/gallery/EditGallery';
import { StatusBar } from '@/views/components/status_bar/StatusBar';

import styles from './Edit.module.scss';

interface EditSolutionProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditSolution: React.FC<EditSolutionProps> = ({ project, change }) => {
  const { updatedSolutionGallery, updatedFeatures, updatedProjectURLs } = useAppSelector(
    (state) => state.update
  );

  const [content, setContent] = useState<string>('');
  const [show, setShow] = useState<string>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');

  // useEffect(() => {
  //   if (updatedSolutionGallery) {
  //     if (project.solution) {
  //       project.solution.setGallery(new Gallery(updatedSolutionGallery));
  //     } else {
  //       const solution = new ProjectSolution();
  //       solution.setGallery(new Gallery(updatedSolutionGallery));
  //       project.setSolution(solution);
  //     }
  //   }
  // }, [updatedSolutionGallery]);

  // useEffect(() => {
  //   if (updatedFeatures) {
  //     if (project.solution) {
  //       project.solution.setFeatures(new Set(updatedFeatures.map((feature) => new Feature(feature))));
  //     } else {
  //       const solution = new ProjectSolution();
  //       solution.setFeatures(new Set(updatedFeatures.map((feature) => new Feature(feature))));
  //       project.setSolution(solution);
  //     }
  //   }
  // }, [updatedFeatures]);

  // useEffect(() => {
  //   if (updatedProjectURLs &&
  //     (updatedProjectURLs.homepage !== undefined || updatedProjectURLs.ios !== undefined || updatedProjectURLs.android !== undefined)) {
  //     const updatedProjectURLsObject = {
  //       homepage: { url: updatedProjectURLs.homepage },
  //       ios: { url: updatedProjectURLs.ios },
  //       android: { url: updatedProjectURLs.android }
  //     }

  //     if (project.solution) {
  //       project.solution.setProjectURLs(new ProjectURLs(updatedProjectURLsObject));
  //     } else {
  //       const solution = new ProjectSolution();
  //       solution.setProjectURLs(new ProjectURLs(updatedProjectURLsObject));
  //       project.setSolution(solution);
  //     }
  //   }
  // }, [updatedProjectURLs]);

  const handleSolutionContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'solution_content_url') {
        setContent(value)
        if (project.solution) {
          project.solution.setContentURL(value);
        } else {
          const solution = new ProjectSolution();
          solution.setContentURL(value);
          project.setSolution(solution);
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
    <div className={styles.edit} id='edit_solution'>
      <h1 className={styles.title}>solution</h1>

      <EditGallery location='solution' gallery={project.solution?.gallery} />

      <br />

      <EditFeatures features={project.solution?.features} />

      <br />

      <EditProjectURL projectURLs={project.solution?.projectURLs} />

      <hr />

      <div className={styles['form-item-flex']}>
        <label className={styles.label} htmlFor="solution_content_url">Solution Content URL:</label>
        <input className={styles.input} type="text" id="solution_content_url" value={content} placeholder='URL to the html content' name='solution_content_url' onChange={handleSolutionContentURLChange} />
      </div>

      <button className={styles.button} onClick={change(project)}>
        <h3>SAVE SOLUTION</h3>
      </button>

      <StatusBar show={show} messageType={messageType} message={message} />
    </div>
  )
}