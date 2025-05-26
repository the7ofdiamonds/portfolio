import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';

import { addSkill } from '@/controllers/addSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';

import { StatusBarComponent } from '@/views/components/StatusBarComponent';

import { Image } from '@/model/Image';
import { Taxonomy } from '@/model/Taxonomy';

export interface AddTaxonomyProps {
  taxonomy: Taxonomy;
};

export const AddTaxonomy: React.FC<AddTaxonomyProps> = ({ taxonomy }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { addLoading, addStatusCode, addSuccessMessage, addErrorMessage } =
    useSelector((state: RootState) => state.add);

  const [id, setID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [url, setUrl] = useState('');
  const [className, setClassName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'id') {
        setID(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'description') {
        setDescription(value);
      } else if (name === 'path') {
        setPath(value);
      } else if (name === 'url') {
        setUrl(value);
      } else if (name === 'class_name') {
        setClassName(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const target = e.target as HTMLTextAreaElement;

      const { name, value } = target;

      if (name === 'description') {
        setDescription(value);
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
      taxonomy.setID(id);
      taxonomy.setTitle(title);
      taxonomy.setDescription(description);
      taxonomy.setPath(path);

      const image = new Image();
      image.setID(id);
      image.setTitle(title);
      image.setURL(url);
      image.setClassName(className);
      taxonomy.setImage(image);

      dispatch(addSkill(taxonomy));
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
        <h2>Add {taxonomy.title}</h2>

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

          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleTextAreaChange}
          />

          <input
            type="text"
            name="path"
            placeholder="Slug"
            value={path}
            onChange={handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={url}
            onChange={handleChange}
          />

          <input
            type="text"
            name="class_name"
            placeholder="Image Class Name"
            value={className}
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