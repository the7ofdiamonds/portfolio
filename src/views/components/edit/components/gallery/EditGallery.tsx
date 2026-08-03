import React, { useEffect, useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { Gallery, Image, StatusBar } from '@the7ofdiamonds/ui-ux';
import type { GalleryObject } from '@the7ofdiamonds/ui-ux';

import EditImages from '../images/EditImages';

import styles from './Gallery.module.scss';

interface EditGalleryProps {
    gallery: Gallery | null;
    setGallery: Dispatch<SetStateAction<Gallery | null>>;
}

export const EditGallery: React.FC<EditGalleryProps> = ({ gallery, setGallery }) => {
    const [logos, setLogos] = useState<Array<Image>>(gallery?.logos ?? []);
    const [icons, setIcons] = useState<Array<Image>>(gallery?.icons ?? []);
    const [animations, setAnimations] = useState<Array<Image>>(gallery?.animations ?? []);
    const [umlDiagrams, setUmlDiagrams] = useState<Array<Image>>(gallery?.umlDiagrams ?? []);
    const [screenshots, setScreenshots] = useState<Array<Image>>(gallery?.screenshots ?? []);
    const [previews, setPreviews] = useState<Array<Image>>(gallery?.previews ?? []);

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    const handleUpdateGallery = (gallery: Gallery) => async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {

            if (!gallery) {
                gallery = new Gallery();
            }

            if (logos && logos.length > 0) {
                gallery.setLogos(logos)
            }

            if (icons && icons.length > 0) {
                gallery.setIcons(icons)
            }


            if (animations.length > 0) {
                gallery.setAnimations(animations)
            }

            if (umlDiagrams.length > 0) {
                gallery.setUmlDiagrams(umlDiagrams)
            }

            if (screenshots.length > 0) {
                gallery.setScreenshots(screenshots)
            }

            if (previews.length > 0) {
                gallery.setPreviews(previews)
            }

            if (!(gallery.images.length > 0)) {
                throw new Error('No images added to the gallery.');
            }

            setGallery(gallery)

            setMessage("Gallery has been updated.");
            setMessageType('success');
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    return (
        <details className={styles.details}>
            <summary className={styles.summary}>Gallery</summary>

            <div className={styles.edit}>
                <EditImages plural={'Logos'} singular={'Logo'} images={logos} setImages={setLogos} />

                <EditImages plural={'Icons'} singular={'Icon'} images={icons} setImages={setIcons} />

                <EditImages plural={'Animations'} singular={'Animation'} images={animations} setImages={setAnimations} />

                <EditImages plural={'UML Diagrams'} singular={'UML Diagram'} images={umlDiagrams} setImages={setUmlDiagrams} />

                <EditImages plural={'Screenshots'} singular={'Screenshot'} images={screenshots} setImages={setScreenshots} />

                <EditImages plural={'Previews'} singular={'Preview'} images={previews} setImages={setPreviews} />

                <StatusBar show={showStatusBar} messageType={messageType} message={message} />

                <button className={styles.button} type="button" onClick={handleUpdateGallery(gallery)}><h3>Update Gallery</h3></button>
            </div>
        </details>
    )
}