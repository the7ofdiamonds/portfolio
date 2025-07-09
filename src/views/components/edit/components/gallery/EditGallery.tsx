import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { Gallery, GalleryObject, Image } from '@the7ofdiamonds/ui-ux';

import { updateDeliveryGallery, updateDesignGallery, updateDevelopmentGallery, updateProblemGallery, updateSolutionGallery } from '@/controllers/updateSlice';

import EditImages from '../images/EditImages';

import type { AppDispatch } from '@/model/store';

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

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setLogos(logos)
            setVal(gallery)
        }
    }, [logos]);

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setIcons(icons)
            setVal(gallery)
        }
    }, [icons]);

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setAnimations(animations)
            setVal(gallery)
        }
    }, [animations]);

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setUmlDiagrams(umlDiagrams)
            setVal(gallery)
        }
    }, [umlDiagrams]);

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setScreenshots(screenshots)
            setVal(gallery)
        }
    }, [screenshots]);

    useEffect(() => {
        if (gallery && setVal) {
            gallery.setPreviews(previews)
            setVal(gallery)
        }
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
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
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