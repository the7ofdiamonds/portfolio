import React, { useEffect, useState, ChangeEvent } from 'react';

import { Main, StatusBar } from '@the7ofdiamonds/ui-ux';
import { Feature, Features, Gallery, Project, ProjectSolution, ProjectURLs } from '@the7ofdiamonds/ui-ux';
import type { ProjectSolutionObject } from '@the7ofdiamonds/ui-ux';

import { updateSolution } from '../../../controllers/updateProjectSlice';

import { EditFeatures } from '../../../views/components/edit/components/features/EditFeatures';
import { EditProjectURL } from '../../../views/components/edit/components/project_url/EditProjectURL';
import { EditGallery } from '../../../views/components/edit/components/gallery/EditGallery';

import { useAppSelector } from '../../../model/hooks';
import type { AppDispatch } from "../../../model/store";

import styles from './Edit.module.scss';

interface EditSolutionProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  useAppDispatch: () => AppDispatch;
}

export const EditSolution: React.FC<EditSolutionProps> = ({ project, change, useAppDispatch }) => {
  const dispatch = useAppDispatch();

  const solution: ProjectSolution = project?.solution ?? new ProjectSolution();
  const instruction: string = "Save changes made to the project solution.";

  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>(instruction);
  const [messageType, setMessageType] = useState<'info' | 'error' | 'caution' | 'success'>('info');

  const [gallery, setGallery] = useState<Gallery | null>(project?.solution?.gallery ?? new Gallery());
  const [features, setFeatures] = useState<Features | null>(project?.solution?.features ?? new Features());
  const [projectURLs, setProjectURLs] = useState<ProjectURLs | null>(project?.solution?.projectURLs ?? new ProjectURLs());
  const [content, setContent] = useState<string>('');

  const { updatedSolutionGallery, updatedFeatures, updatedProjectURLs } = useAppSelector(
    (state) => state.update
  );

  // useEffect(() => {
  //   if (gallery) {
  //     solution.setGallery(gallery);
  //   }
  // }, [gallery]);

  // useEffect(() => {
  //   if (features) {
  //     solution.setFeatures(features);
  //   }
  // }, [features]);

  // useEffect(() => {
  //   if (projectURLs) {
  //     solution.setProjectURLs(projectURLs);
  //   }
  // }, [projectURLs]);

  // useEffect(() => {
  //   if (content) {
  //     solution.setContentURL(content)
  //   }
  // }, [content]);

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
      let hasData = false;

      if (gallery.images.length > 0) {
        gallery.setID(project?.id)
        solution.setGallery(gallery);
        hasData = true;
      }

      if (features.list.length > 0) {
        features.setID(project?.id)
        solution.setFeatures(features);
        hasData = true;
      }

      if (projectURLs.hasData()) {
        projectURLs.setID(project?.id)
        solution.setProjectURLs(projectURLs);
        hasData = true;
      }

      if (content) {
        solution.setContentURL(content);
        hasData = true;
      }

      if (hasData) {
        if (!solution.id) solution.setID(project?.id)
      }

     dispatch(updateSolution(solution)).then((res) => {
        const solutionObject: ProjectSolutionObject | null = res?.payload;

        if (!solutionObject) {
          setShow('show');
          setMessage("No Project Solution data to save to this project.");
          setMessageType('error');
          return;
        }

        project.setSolution(new ProjectSolution(solutionObject))
        change(project)

        setMessage("Project Solution has been updated.");
        setMessageType('success');

        return;
      }).catch((err: Error) => { throw new Error(err.message) })
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