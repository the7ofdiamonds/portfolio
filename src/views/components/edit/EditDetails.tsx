import React, { useState, ChangeEvent } from 'react';

import type { MessageType, StatusBarVisibility, ProjectDetailsObject } from '@the7ofdiamonds/ui-ux';
import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { Contributors, ProjectDetails } from '@the7ofdiamonds/ui-ux';

import { Privacy, privacyFromString } from '../../../model/enum/Enums';

import styles from './Edit.module.scss';

interface EditDetailsProps {
  id: string | number | null;
  details: ProjectDetails;
  setDetails: React.Dispatch<React.SetStateAction<ProjectDetails>>;
}

export const EditDetails: React.FC<EditDetailsProps> = ({ id, details, setDetails }) => {
  const instruction: string = "Save updates to the Project Details.";

  const [privacy, setPrivacy] = useState<string | null>(details?.privacy);
  const [clientID, setClientID] = useState<string | null>(details?.clientID);
  const [content, setContent] = useState<string | null>(details?.content?.url);
  const [team, setTeam] = useState<Contributors | null>(details?.teamList ?? new Contributors);
  const [story, setStory] = useState<string>(details?.story?.url);

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
      const updatedDetails = new ProjectDetails();

      if (clientID) {
        updatedDetails.setClientID(clientID);
      }

      if (content) {
        updatedDetails.setContentURL(content);
      }

      if (story) {
        updatedDetails.setStory(story);
      }

      if (clientID || content || story) {
        if (!updatedDetails.id) {
          updatedDetails.setID(id)
        }
      }

      setDetails(updatedDetails)
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