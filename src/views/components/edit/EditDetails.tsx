import React, { useEffect, useState, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { Contributor, Project, ProjectDetails } from '@the7ofdiamonds/ui-ux';

import { Privacy, privacyFromString } from '@/model/enum/Enums';

import styles from './Edit.module.scss';

interface EditDetailsProps {
  project: Project;
  change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditDetails: React.FC<EditDetailsProps> = ({ project, change }) => {
  const [privacy, setPrivacy] = useState<string>('private');
  const [clientID, setClientID] = useState<string>('0');
  const [content, setContent] = useState<string>('');
  const [team, setTeam] = useState<Array<Contributor>>([]);
  const [story, setStory] = useState<string>('');
  const [show, setShow] = useState<'show' | 'hide'>('hide');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');

  useEffect(() => {
    if (project?.details?.privacy) {
      setPrivacy(project.details.privacy)
    }
  }, [project?.details?.privacy]);

  useEffect(() => {
    if (project?.details?.clientID) {
      setClientID(project.details.clientID)
    }
  }, [project?.details?.clientID]);

  useEffect(() => {
    if (project?.details?.content?.url) {
      setContent(project.details.content.url)
    }
  }, [project?.details?.content]);

  useEffect(() => {
    if (project?.details?.teamList) {
      setTeam(project.details.teamList)
    }
  }, [project?.details?.teamList]);

  useEffect(() => {
    if (project?.details?.story?.url) {
      setStory(project.details.story.url)
    }
  }, [project?.details?.story]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const target = e.target;

      const { name, value } = target;

      if (name === 'privacy') {
        setPrivacy(privacyFromString(value));
        if (project.details) {
          project.details.setPrivacy(privacyFromString(value));
        } else {
          const projetDetails = new ProjectDetails();
          projetDetails.setPrivacy(privacyFromString(value));
          project.setDetails(projetDetails);
        }
      }
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
        if (project.details) {
          project.details.setClientID(value);
        } else {
          const projetDetails = new ProjectDetails();
          projetDetails.setClientID(value);
          project.setDetails(projetDetails);
        }
      }

      if (name === 'content_url') {
        setContent(value);
        if (project.details) {
          project.details.setContentURL(value);
        } else {
          const projetDetails = new ProjectDetails();
          projetDetails.setContentURL(value);
          project.setDetails(projetDetails);
        }
      }

      if (name === 'story') {
        setStory(value);
        if (project.details) {
          project.details.setStory(value);
        } else {
          const projetDetails = new ProjectDetails();
          projetDetails.setStory(value);
          project.setDetails(projetDetails);
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
    <>
      <h2 className={styles.title}>Details</h2>

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
          <input className={styles.input} type="text" id='client_id' name='client_id' value={clientID} onChange={handleChange} />
        </div>

        <div className={styles['form-item-flex']}>
          <label className={styles.label} htmlFor="content_url">Content URL:</label>
          <input className={styles.input} type="string" id="content_url" name="content_url" value={content} onChange={handleChange} />
        </div>

        <div className={styles['form-item-flex']}>
          <label className={styles.label} htmlFor="story">Story URL:</label>
          <input className={styles.input} type="string" id="story" name="story" value={story} onChange={handleChange} />
        </div>

        <button className={styles.button} onClick={change(project)}>
          <h3>SAVE DETAILS</h3>
        </button>
      </form>

      <StatusBar show={show} messageType={messageType} message={message} />
    </>
  )
}