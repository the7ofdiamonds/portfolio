import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

import { Taxonomy, StatusBar,Image } from '@the7ofdiamonds/ui-ux';

import { addSkill } from '@/controllers/skillsSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

export interface AddTaxonomyProps {
  taxonomy: Taxonomy;
};

export const AddTaxonomy: React.FC<AddTaxonomyProps> = ({ taxonomy }) => {
  const dispatch = useAppDispatch();

  const { skillsLoading, skillsStatusCode, skillsSuccessMessage, skillsErrorMessage, taxType } =
    useAppSelector((state) => state.skills);

  const [id, setID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [url, setUrl] = useState('');
  const [className, setClassName] = useState('');
  const [show, setShow] = useState('show');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(`Add ${taxonomy.type} to your skill set.`);

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
      setMessage(err.message);
      setMessageType('error');
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
      setMessage(err.message);
      setMessageType('error');
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

      setShow('show')
      setMessageType('info');

      setID('');
      setTitle('');
      setDescription('');
      setPath('');
      setUrl('');
      setClassName('');
    } catch (error) {
      const err = error as Error;
      setMessageType('error');
      setMessage(err.message);
      setShow('show');
    }
  };

  useEffect(() => {
    if (skillsLoading) {
      setShow('show');
    }
  }, [skillsLoading]);

  useEffect(() => {
    if (skillsSuccessMessage && taxType === taxonomy.type) {
      setMessage(skillsSuccessMessage);
      setMessageType('success');
      setShow('show');
    }
  }, [skillsSuccessMessage]);

  useEffect(() => {
    if (skillsErrorMessage) {
      setMessage(skillsErrorMessage);
      setMessageType('error');
      setShow('show');
    }
  }, [skillsErrorMessage]);

  return (
    <>
      <main>
        <h2>Add {taxonomy.type}</h2>

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

        <StatusBar show={show} messageType={messageType} message={message} />
      </main>
    </>
  );
}