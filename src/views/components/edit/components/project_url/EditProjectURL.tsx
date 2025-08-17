import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { ProjectURLs } from '@the7ofdiamonds/ui-ux';

import { updateProjectURLs } from '@/controllers/updateSlice';

import type { AppDispatch } from '@/model/store';

import styles from './ProjectURL.module.scss';

interface EditProjectURLProps {
    projectURLs: ProjectURLs | undefined | null;
}

export const EditProjectURL: React.FC<EditProjectURLProps> = ({ projectURLs }) => {
    const urls = new ProjectURLs();
    const homepage = urls.homepage;
    const ios = urls.ios;
    const android = urls.android;

    const dispatch = useDispatch<AppDispatch>();

    const [homepageURL, setHomepageURL] = useState<string | null>(null);
    const [iosURL, setIosURL] = useState<string | null>(null);
    const [androidURL, setAndroidURL] = useState<string | null>(null);

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (projectURLs?.homepage) {
            setHomepageURL(projectURLs.homepage.url);
        }
    }, [projectURLs?.homepage, setHomepageURL]);

    useEffect(() => {
        if (projectURLs?.ios) {
            setIosURL(projectURLs.ios.url);
        }
    }, [projectURLs?.ios, setIosURL]);

    useEffect(() => {
        if (projectURLs?.android) {
            setAndroidURL(projectURLs.android.url);
        }
    }, [projectURLs?.android, setAndroidURL]);

    const handleHomepageChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'homepage_url') {
                setHomepageURL(value);
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
        }
    };

    const handleIosChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'ios_url') {
                setIosURL(value);
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
        }
    };

    const handleAndroidChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'android_url') {
                setAndroidURL(value);
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
        }
    };

    const handleUpdateProjectURLs = () => {
        dispatch(updateProjectURLs({
            homepage: homepageURL,
            ios: iosURL,
            android: androidURL
        }));
    };

    return (
        <div className={styles.edit} id='update_urls'>
            <h3>Project URLs</h3>

            {homepage &&
                (<div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="homepage_url">{homepage.name}:</label>
                    <input className={styles.input} type="text" id="homepage" value={homepageURL ?? ''} placeholder={homepage.description ?? ''} name='homepage_url' onChange={handleHomepageChange} />
                </div>)
            }

            {ios &&
                (<div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="ios_url">{ios.name}:</label>
                    <input className={styles.input} type="text" id="ios" value={iosURL ?? ''} placeholder={ios.description ?? ''} name='ios_url' onChange={handleIosChange} />
                </div>)
            }

            {android &&
                (<div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="android_url">{android.name}:</label>
                    <input className={styles.input} type="text" id="android" value={androidURL ?? ''} placeholder={android.description ?? ''} name='android_url' onChange={handleAndroidChange} />
                </div>)
            }

            <button className={styles.button} onClick={handleUpdateProjectURLs}>
                <h3>Update Project Urls</h3>
            </button>
        </div>
    )
}