import React, { useEffect, useState, ChangeEvent } from 'react';

import type { MessageType, StatusBarVisibility, ProjectDetailsObject } from '@the7ofdiamonds/ui-ux';
import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { Contributors, Project, ProjectDetails } from '@the7ofdiamonds/ui-ux';

import type { AppDispatch } from "../../../model/store";

import { Privacy, privacyFromString } from '../../../model/enum/Enums';

import { updateDetails } from '../../../controllers/updateProjectSlice';

import styles from './Edit.module.scss';

interface EditDetailsProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  useAppDispatch: () => AppDispatch;
}

export const EditDetails: React.FC<EditDetailsProps> = ({ project, change, useAppDispatch }) => {
  const dispatch = useAppDispatch();

  const details: ProjectDetails = project?.details ?? new ProjectDetails();
  const instruction: string = "Save updates to the Project Details.";

  const [privacy, setPrivacy] = useState<string | null>(project?.details?.privacy);
  const [clientID, setClientID] = useState<string | null>(project?.details?.clientID);
  const [content, setContent] = useState<string | null>(project?.details?.content?.url);
  const [team, setTeam] = useState<Contributors | null>(project?.details?.teamList);
  const [story, setStory] = useState<string>(project?.details?.story?.url);

  const [show, setShow] = useState<StatusBarVisibility>('hide');
  const [message, setMessage] = useState<string>(instruction);
  const [messageType, setMessageType] = useState<MessageType>('info');

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const target = e.target;

      const { name, value } = target;

      if (name === 'privacy') setPrivacy(privacyFromString(value));
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target;
      const { name, value } = target;

      if (name === 'client_id') {
        setClientID(value);
      }

      if (name === 'content_url') {
        setContent(value);
      }

      if (name === 'story') {
        setStory(value);
      }

      console.log(value)
    } catch (error) {
      const err = error as Error;
      setShow('show');
      setMessage(err.message);
      setMessageType('error');
    }
  };

  const saveDetails = () => {
    try {
      setMessage(instruction);

      if (clientID) {
        details.setClientID(clientID);
      }

      if (content) {
        details.setContentURL(content);
      }

      if (story) {
        details.setStory(story);
      }

      if (clientID || content || story) {
        if (!details.id) {
          details.setID(project.id)
        }
      }

      dispatch(updateDetails(details)).then((res) => {
        const detailsObject: ProjectDetailsObject | null = res?.payload;

        if (!detailsObject) {
          setShow('show');
          setMessage("No Project Details data to save to this project.");
          setMessageType('error');
          return;
        }

        project.setDetails(new ProjectDetails(detailsObject));
        change(project)

        setMessage("Project Details has been updated.");
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
    <details className={styles['edit-details']} id="edit_details">
      <summary><h2 className={styles.title}>Details</h2></summary>

      <div className={styles.edit}>
        <form className={styles.form} action="" id='edit_details'>
          <div className={styles['form-item-flex']}>
            <label className={styles.label} htmlFor="privacy">Privacy:</label>
            <select className={styles.select} id="privacy" name='privacy' value={privacy ?? ''} onChange={handleChangeSelect}>
              <option value={Privacy.Private}>Private</option>
              <option value={Privacy.Public}>Public</option>
            </select>
          </div>

          <div className={styles['form-item-flex']}>
            <label className={styles.label} htmlFor="client_id">Client ID:</label>
            <input className={styles.input} type="text" id='client_id' name='client_id' value={clientID ?? ''} onChange={handleChange} />
          </div>

          <div className={styles['form-item-flex']}>
            <label className={styles.label} htmlFor="content_url">Content URL:</label>
            <input className={styles.input} type="string" id="content_url" name="content_url" value={content ?? ''} onChange={handleChange} />
          </div>

          <div className={styles['form-item-flex']}>
            <label className={styles.label} htmlFor="story">Story URL:</label>
            <input className={styles.input} type="string" id="story" name="story" value={story ?? ''} onChange={handleChange} />
          </div>
        </form>

        <StatusBar show={show} messageType={messageType} message={message} />

        <button className={styles.button} onClick={saveDetails}>
          <h3>SAVE DETAILS</h3>
        </button>
      </div>
    </details>
  )
}