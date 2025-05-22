import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import { addLanguage } from '../../../controllers/addSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';
// import {
//   getProjectTypes,
//   getLanguages,
//   getFrameworks,
//   getTechnologies,
// } from '../../../controllers/taxonomiesSlice';

import StatusBarComponent from '../StatusBarComponent';

import Taxonomy from '@/model/Taxonomy';

export const AddLanguages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { addLoading, addStatusCode, addSuccessMessage, addErrorMessage } =
    useSelector((state: RootState) => state.add);
  // const { languagesObject } = useSelector(
  //   (state: RootState) => state.taxonomies
  // );

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');
  const [icon_url, setIconUrl] = useState('');
  const [class_name, setClassName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'id') {
        setId(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'icon_url') {
        setIconUrl(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };


  const handleAddLanguage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const language = new Taxonomy({
        id: id,
        type: 'languages',
        title: title,
        icon_url: icon_url,
        class_name: class_name
      });

      dispatch(addLanguage(language));

      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  useEffect(() => {
    if (addLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addLoading]);

  useEffect(() => {
    if (addSuccessMessage) {
      dispatch(setMessage(addSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addSuccessMessage]);

  useEffect(() => {
    if (addErrorMessage) {
      dispatch(setMessage(addErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addErrorMessage]);

  return (
    <>
      <main>
        <h2>Add Languages</h2>

        <form action="">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="icon_url"
            placeholder="icon_url"
            value={icon_url}
            onChange={handleChange}
          />

          <button onClick={handleAddLanguage}>
            <h3>add</h3>
          </button>
        </form>

        <StatusBarComponent />
      </main>
    </>
  );
}