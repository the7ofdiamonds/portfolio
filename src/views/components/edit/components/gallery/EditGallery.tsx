import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateDeliveryGallery, updateDesignGallery, updateDevelopmentGallery, updateProblemGallery, updateSolutionGallery } from '@/controllers/updateSlice';

import EditImages from '../images/EditImages';

import type { AppDispatch } from '@/model/store';
import { Gallery, GalleryObject } from '@/model/Gallery'
import { Image } from '@/model/Image';

import styles from './Gallery.module.scss';

interface EditGalleryProps {
    location: string;
    gallery: Gallery;
    setVal: (value: Gallery) => void
}

export const EditGallery: React.FC<EditGalleryProps> = ({ location, gallery, setVal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [logos, setLogos] = useState<Array<Image>>(gallery?.logos ?? []);
    const [icons, setIcons] = useState<Array<Image>>(gallery?.icons ?? []);
    const [animations, setAnimations] = useState<Array<Image>>(gallery?.animations ?? []);
    const [umlDiagrams, setUmlDiagrams] = useState<Array<Image>>(gallery?.umlDiagrams ?? []);
    const [screenshots, setScreenshots] = useState<Array<Image>>(gallery?.screenshots ?? []);
    const [previews, setPreviews] = useState<Array<Image>>(gallery?.previews ?? []);

    useEffect(() => {
        gallery.setLogos(logos)
        setVal(gallery)
    }, [logos]);

    useEffect(() => {
        gallery.setIcons(icons)
        setVal(gallery)
    }, [icons]);

    useEffect(() => {
        gallery.setAnimations(animations)
        setVal(gallery)
    }, [animations]);

    useEffect(() => {
        gallery.setUmlDiagrams(umlDiagrams)
        setVal(gallery)
    }, [umlDiagrams]);

    useEffect(() => {
        gallery.setScreenshots(screenshots)
        setVal(gallery)
    }, [screenshots]);

    useEffect(() => {
        gallery.setPreviews(previews)
        setVal(gallery)
    }, [previews]);

    const handleUpdateGallery = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const updatedGalleryObject: GalleryObject = {
                logos: logos.length > 0 ? logos.map((image) => image.toImageObject()) : null,
                icons: icons.length > 0 ? icons.map((image) => image.toImageObject()) : null,
                animations: animations.length > 0 ? animations.map((image) => image.toImageObject()) : null,
                uml_diagrams: umlDiagrams.length > 0 ? umlDiagrams.map((image) => image.toImageObject()) : null,
                screenshots: screenshots.length > 0 ? screenshots.map((image) => image.toImageObject()) : null,
                previews: previews.length > 0 ? previews.map((image) => image.toImageObject()) : null
            };

            if (location === 'solution') {
                dispatch(updateSolutionGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'design') {
                dispatch(updateDesignGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'development') {
                dispatch(updateDevelopmentGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'delivery') {
                dispatch(updateDeliveryGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'problem') {
                dispatch(updateProblemGallery(new Gallery(updatedGalleryObject)));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <details className={styles.details}>
            <summary className={styles.summary}>Gallery</summary>
            <div className={styles.edit}>

                <EditImages plural={'Logos'} singular={'Logo'} images={logos} setVal={setLogos} />

                <EditImages plural={'Icons'} singular={'Icon'} images={icons} setVal={setIcons} />

                <EditImages plural={'Animations'} singular={'Animation'} images={animations} setVal={setAnimations} />

                <EditImages plural={'UML Diagrams'} singular={'UML Diagram'} images={umlDiagrams} setVal={setUmlDiagrams} />

                <EditImages plural={'Screenshots'} singular={'Screenshot'} images={screenshots} setVal={setScreenshots} />

                <EditImages plural={'Previews'} singular={'Preview'} images={previews} setVal={setPreviews} />

                <hr />

                <button className={styles.button} type="button" onClick={handleUpdateGallery}><h3>Update Gallery</h3></button>
            </div>
        </details>
    )
}