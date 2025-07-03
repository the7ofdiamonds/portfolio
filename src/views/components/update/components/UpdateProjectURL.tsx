import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { updateProjectURLs } from '@/controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';

import type { AppDispatch } from '@/model/store';
import ProjectURLs from '@/model/ProjectURLs';

interface UpdateProjectURLProps {
    projectURLs: ProjectURLs | undefined | null;
}

const UpdateProjectURL: React.FC<UpdateProjectURLProps> = ({ projectURLs }) => {
    const urls = new ProjectURLs();
    const homepage = urls.homepage;
    const ios = urls.ios;
    const android = urls.android;

    const dispatch = useDispatch<AppDispatch>();

    const [homepageURL, setHomepageURL] = useState<string | null>(null);
    const [iosURL, setIosURL] = useState<string | null>(null);
    const [androidURL, setAndroidURL] = useState<string | null>(null);

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
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
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
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
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
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
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
        <div className='update' id='update_urls'>
            <h3>Project URLs</h3>

            {homepage &&
                (<div className="form-item-flex">
                    <label htmlFor="homepage_url">{homepage.name}:</label>
                    <input type="text" id="homepage" value={homepageURL ?? ''} placeholder={homepage.description} name='homepage_url' onChange={handleHomepageChange} />
                </div>)
            }

            {ios &&
                (<div className="form-item-flex">
                    <label htmlFor="ios_url">{ios.name}:</label>
                    <input type="text" id="ios" value={iosURL ?? ''} placeholder={ios.description} name='ios_url' onChange={handleIosChange} />
                </div>)
            }

            {android &&
                (<div className="form-item-flex">
                    <label htmlFor="android_url">{android.name}:</label>
                    <input type="text" id="android" value={androidURL ?? ''} placeholder={android.description} name='android_url' onChange={handleAndroidChange} />
                </div>)
            }

            <button onClick={handleUpdateProjectURLs}>
                <h3>Update Project Urls</h3>
            </button>
        </div>
    )
}

export default UpdateProjectURL