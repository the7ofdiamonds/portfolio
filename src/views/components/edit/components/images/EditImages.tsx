import React, { useState, ChangeEvent } from 'react'

import { Image } from '@the7ofdiamonds/ui-ux';

import styles from './Images.module.scss';

interface EditImagesProps {
    plural: string;
    singular: string;
    images: Array<Image>;
    setVal: (value: Array<Image>) => void;
}

const EditImages: React.FC<EditImagesProps> = ({ plural, singular, images, setVal }) => {
    const [newImage, setNewImage] = useState<Image>(new Image({ id: '', title: '', url: '', class_name: '' }));

    const handleNewLogo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const image = new Image()
        image.setID(crypto.randomUUID());

        if (name === 'title') {
            image.setTitle(value)
        }

        if (name === 'url') {
            image.setURL(value)
        }

        if (name === 'class_name') {
            image.setClassName(value)
        }

        setNewImage(image)
        images.push(newImage)
        setVal(images)
        setNewImage(new Image);

    };

    const handleAddNewImage = () => {
        if (newImage && newImage.title && (newImage.url || newImage.className)) {
            images.push(newImage)
            setVal(images)
            setNewImage(new Image({ id: '', title: '', url: '', class_name: '' }));
        };
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        state: any[]
    ) => {
        const { name, value, dataset } = e.target;
        const index = dataset.index ? parseInt(dataset.index, 10) : -1;

        if (index === -1) return;

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], [name]: value };

        setVal(updatedState);
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {Array.isArray(images) && images.length > 0 && (
                <>
                    <h3>{plural}</h3>

                    {images.map((item: Image, index: number) => (
                        <div className={styles['form-item']} key={item.id}>
                            <div className={styles['form-item-flex']}>
                                <label className={styles.label} htmlFor="id">ID:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="ID"
                                    value={item.id ?? ""}
                                    name="id"
                                    disabled
                                />
                            </div>

                            <div className={styles['form-item-flex']}>
                                <label className={styles.label} htmlFor="title">Title:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Title"
                                    value={item.title ?? ""}
                                    name="title"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, images)}
                                />
                            </div>

                            <div className={styles['form-item-flex']}>
                                <label className={styles.label} htmlFor="url">URL:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="URL"
                                    value={item.url ?? ""}
                                    name="url"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, images)}
                                />
                            </div>

                            <div className={styles['form-item-flex']}>
                                <label className={styles.label} htmlFor="class_name">Class Name:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Class Name"
                                    value={item.className ?? ""}
                                    name="class_name"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, images)}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}

            <hr />

            <h4>{`Add New ${singular}`}</h4>

            <div className={styles['form-item']}>
                <input className={styles.input}
                    type="text" name="title" placeholder="Title" value={newImage.title ?? ''} onChange={handleNewLogo} />
                <input className={styles.input}
                    type="text" name="url" placeholder="URL" value={newImage.url ?? ''} onChange={handleNewLogo} />
                <input className={styles.input}
                    type="text" name="class_name" placeholder="Class Name" value={newImage.className ?? ''} onChange={handleNewLogo} />
                <button className={styles.button} type="submit" onClick={handleAddNewImage}><h3>{`Add ${singular}`}</h3></button>
            </div>
        </form>
    )
}

export default EditImages