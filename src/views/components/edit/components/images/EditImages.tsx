import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

import { Badge, Image, StatusBar } from '@the7ofdiamonds/ui-ux';

import styles from './Images.module.scss';

interface EditImagesProps {
    plural: string;
    singular: string;
    images: Array<Image>;
    setImages: Dispatch<SetStateAction<Array<Image> | null>>;
}

const EditImages: React.FC<EditImagesProps> = ({ plural, singular, images, setImages }) => {
    const newImg = new Image({ id: Date.now() });
    const [newImage, setNewImage] = useState<Image>(newImg);

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const { name, value } = e.target;

            setNewImage((oldImage: Image) => (
                new Image({
                    ...oldImage.toImageObject(),
                    [name]: value
                })
            ))
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const handleAddNewImage = (image: Image) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {

            if (!image.id) {
                throw new Error("ID is required.")
            }

            if (!image.title || !image.title.trim()) {
                throw new Error("Title is required.")
            }

            if ((!image.url || !image.url.trim()) && (!image.className || !image.className.trim())) {
                throw new Error("Either URL or class name is required.")
            }

            images.push(image)
            setNewImage(newImg);
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        state: Image[]
    ) => {
        const { name, value, dataset } = e.target;
        const index = dataset.index ? parseInt(dataset.index, 10) : -1;

        if (index === -1) return;

        const updatedState = [...state];
        updatedState[index] = new Image({ ...updatedState[index].toImageObject(), [name]: value });

        setImages(updatedState);
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {Array.isArray(images) && images.length > 0 && (
                <>
                    <Badge amount={images.length}>
                        <h3>{plural}</h3>
                    </Badge>

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
                                    id="id"
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
                <div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="id">ID:</label>
                    <input className={styles.input} type="text" name="id" placeholder="ID" value={newImage.id ?? ''} onChange={handleNewImage} />
                </div>

                <div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="id">Title:</label>
                    <input className={styles.input} type="text" name="title" placeholder="Title" value={newImage.title ?? ''} onChange={handleNewImage} />
                </div>

                <div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="title">URL:</label>
                    <input className={styles.input} type="text" name="url" placeholder="URL" value={newImage.url ?? ''} onChange={handleNewImage} />
                </div>

                <div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="url">Class Name:</label>
                    <input className={styles.input} type="text" name="class_name" placeholder="Class Name" value={newImage.className ?? ''} onChange={handleNewImage} />
                </div>

                <button className={styles.button} type="submit" onClick={handleAddNewImage(newImage)}>
                    <h3>{`Add ${singular}`}</h3>
                </button>
            </div>

            <StatusBar show={showStatusBar} messageType={messageType} message={message} />
        </form>
    )
}

export default EditImages