import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { Main, StatusBar } from '@the7ofdiamonds/ui-ux';
import type { FeatureObject } from '@the7ofdiamonds/ui-ux';
import { Feature, Features, Version } from '@the7ofdiamonds/ui-ux';

import styles from './Features.module.scss';

interface EditFeaturesProps {
    features: Features | null;
    setFeatures: Dispatch<SetStateAction<Features | null>>;
}

export const EditFeatures: React.FC<EditFeaturesProps> = ({ features, setFeatures }) => {
    const [featuresObject, setFeaturesObject] = useState<Array<FeatureObject> | null>(null);
    const [feature, setFeature] = useState<Feature>(new Feature({ id: Date.now() }));

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (features && features?.list && features.list.size > 0) {
            setFeaturesObject(Array.from(features.list).map((feature: Feature) => {
                if (!feature?.id) feature.setID(Date.now());
                return feature.toFeatureObject()
            }))
        }
    }, [features?.list?.size]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, feature: FeatureObject) => {
        const { name, value } = e.target;

        const updatedFeatures = featuresObject ? featuresObject.map((f) =>
            f.id === feature.id ? { ...feature, [name]: value } : f
        ) : null;

        setFeaturesObject(updatedFeatures);
    };

    const handleFeatureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let id = feature.id !== '' ? feature.id : crypto.randomUUID();
        let description = feature.description;
        let version = feature.version;

        if (name === 'description') {
            description = value;
        }

        if (name === 'version') {
            version = new Version(value);
        }

        let featureObject: FeatureObject = {
            id: id,
            description: description,
            version: version ? version.toString() : null
        }

        setFeature(new Feature(featureObject));
    };

    const handleAddFeature = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!feature?.description || !feature?.description.trim()) {
                throw new Error('A description is required');
            }

            if (!feature?.version) {
                throw new Error('A version is required');
            }

            if (!feature?.id) {
                throw new Error('An id is required');
            }

            if (!features) {
                features = new Features();
            }

            features.add(feature)

            setFeature(new Feature({ id: Date.now() }));
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const handleUpdateFeatures = (features: Features) => async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!features || features?.list?.length === 0) {
                throw new Error('No features added');
            }

            setFeatures(features)
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    return (
        <Main>
            <div className={styles.edit} id="update_features">
                <h3>Features</h3>

                {featuresObject && featuresObject.map((feature) => (
                    <div className={styles['form-item']} key={feature.id}>
                        <div className={styles['form-item-flex']}>
                            <label className={styles.label} htmlFor="">ID:</label>
                            <h3>{feature.id}</h3>
                        </div>

                        <div className={styles['form-item-flex']}>
                            <label className={styles.label} htmlFor="">Feature</label>
                            <input className={styles.input} type="text" value={feature.description ?? ''} placeholder='Description' name='description' onChange={(e) => handleChange(e, feature)} />
                        </div>

                        <div className={styles['form-item-flex']}>
                            <label className={styles.label} htmlFor="">Version</label>
                            <input className={styles.input} type="text" value={feature?.version ?? ''} placeholder='Version' name='version' onChange={(e) => handleChange(e, feature)} />
                        </div>
                    </div>
                ))}

                <hr />

                <h4>Add New Feature</h4>

                <div className={styles['form-item']}>
                    <div className={styles['form-item-flex']}>
                        <label className={styles.label} htmlFor="">ID:</label>
                        <h3>{feature.id}</h3>
                    </div>

                    <div className={styles['form-item-flex']}>
                        <label className={styles.label} htmlFor="">Feature</label>
                        <input className={styles.input} type="text" value={feature.description ?? ''} placeholder='Description' name='description' onChange={handleFeatureChange} />
                    </div>

                    <div className={styles['form-item-flex']}>
                        <label className={styles.label} htmlFor="">Version</label>
                        <input className={styles.input} type="text" value={feature.version ? feature.version.toString() : ''} placeholder='Version' name='version' onChange={handleFeatureChange} />
                    </div>

                    <button className={styles.button} onClick={handleAddFeature}>
                        <h3>Add Feature</h3>
                    </button>
                </div>

                <button className={styles.button} onClick={handleUpdateFeatures(features)}>
                    <h3>Update Features</h3>
                </button>
            </div>

            <StatusBar show={showStatusBar} messageType={messageType} message={message} />
        </Main>
    )
}