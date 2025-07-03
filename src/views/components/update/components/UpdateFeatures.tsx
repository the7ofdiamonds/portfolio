import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateFeatures } from '@/controllers/updateSlice';

import type { AppDispatch } from '@/model/store';
import Feature, { FeatureObject } from '@/model/Feature';
import Version from '@/model/Version';

interface UpdateFeaturesProps {
    features: Set<Feature> | undefined | null;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({ features }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [featuresObject, setFeaturesObject] = useState<Array<FeatureObject> | null>(null);
    const [feature, setFeature] = useState<Feature>(new Feature());

    useEffect(() => {
        if (features) {
            setFeaturesObject(Array.from(features).map((feature) => feature.toFeatureObject()))
        }
    }, [features]);

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
            if (!feature.description.trim()) {
                throw new Error('A description is required');
            }

            const updatedFeatures = featuresObject ? [...featuresObject, feature.toFeatureObject()] : [feature.toFeatureObject()];

            setFeaturesObject(updatedFeatures);

            setFeature(new Feature());
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateFeatures = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!featuresObject || featuresObject.length === 0) {
                throw new Error('No features added');
            }

            dispatch(updateFeatures(new Set(featuresObject.map((featureObject) => new Feature(featureObject)))));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <div className="update" id="update_features">
            <h3>Features</h3>

            {featuresObject && featuresObject.map((feature) => (
                <div className="form-item" key={feature.id}>
                    <div className="form-item-flex">
                        <label htmlFor="">ID:</label>
                        <h3>{feature.id}</h3>
                    </div>

                    <div className="form-item-flex">
                        <label htmlFor="">Feature</label>
                        <input type="text" value={feature.description} placeholder='Description' name='description' onChange={(e) => handleChange(e, feature)} />
                    </div>

                    <div className="form-item-flex">
                        <label htmlFor="">Version</label>
                        <input type="text" value={feature?.version ?? ''} placeholder='Version' name='version' onChange={(e) => handleChange(e, feature)} />
                    </div>
                </div>
            ))}

            <hr />

            <h4>Add New Feature</h4>

            <div className="form-item">
                <div className="form-item-flex">
                    <label htmlFor="">ID:</label>
                    <h3>{feature.id}</h3>
                </div>

                <div className="form-item-flex">
                    <label htmlFor="">Feature</label>
                    <input type="text" value={feature.description} placeholder='Description' name='description' onChange={handleFeatureChange} />
                </div>

                <div className="form-item-flex">
                    <label htmlFor="">Version</label>
                    <input type="text" value={feature.version ? feature.version.toString() : ''} placeholder='Version' name='version' onChange={handleFeatureChange} />
                </div>

                <button onClick={handleAddFeature}>
                    <h3>Add Feature</h3>
                </button>
            </div>

            <button onClick={handleUpdateFeatures}>
                <h3>Update Features</h3>
            </button>
        </div>
    )
}

export default UpdateFeatures