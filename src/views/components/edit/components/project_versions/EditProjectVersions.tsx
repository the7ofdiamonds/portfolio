import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectVersions, ProjectVersionsObject } from '@/model/ProjectVersions'

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateVersions } from '@/controllers/updateSlice';

import styles from './ProjectVersions.module.scss';

interface EditProjectVersionsProps {
    projectVersions: ProjectVersions;
}

export const EditProjectVersions: React.FC<EditProjectVersionsProps> = ({ projectVersions }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [history, setHistory] = useState<Set<string>>(new Set());
    const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');
    const [future, setFuture] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (projectVersions.history) {
            setHistory(projectVersions.history)
        }
    }, [projectVersions]);

    useEffect(() => {
        if (projectVersions.future) {
            setFuture(projectVersions.future)
        }
    }, [projectVersions]);

    const handleCurrentVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'current_version') {
                setCurrentVersion(value);
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handlePreviousVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const { value, dataset } = e.target;
            const index = dataset.index ? parseInt(dataset.index, 10) : -1;

            if (index === -1) return;

            const updatedPreviousVersions = [...history];
            updatedPreviousVersions[index] = value;

            setHistory(new Set(updatedPreviousVersions));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateCurrentVersion = () => {
        try {

            if (!history.has(currentVersion)) {
                let updatedPreviousVersion = [currentVersion, ...history];

                setHistory(new Set(updatedPreviousVersion));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateVersions = () => {
        try {
            const updatedProjectVersions: ProjectVersionsObject = {
                history: Array.from(history),
                current: currentVersion,
                future: Array.from(future)
            };

            dispatch(updateVersions(new ProjectVersions(updatedProjectVersions)));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    return (
        <div className={styles.edit}>
            <h3>Project Versions</h3>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()} id='update_gallery_logos'>
                {history.size > 0 && (
                    <>
                        <h4>Version History</h4>

                        {Array.from(history).map((version: string, index: number) => (
                            <div className={styles['form-item']} key={index}>

                                <div className={styles['form-item-flex']}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Versions"
                                        value={version ?? ""}
                                        name="title"
                                        data-index={index}
                                        onChange={(e) => handlePreviousVersionChange(e)}
                                    />
                                </div>
                            </div>
                        ))}

                        <hr />
                    </>
                )}


                <h4>Update Current Version</h4>

                <div className={styles['form-item-flex']}>
                    <input
                        className={styles.input}
                        type="text"
                        id="current_version"
                        value={currentVersion ?? ''}
                        placeholder='Current Project Version'
                        name='current_version'
                        onChange={handleCurrentVersionChange}
                    />
                    <button className={styles.button} type='button' onClick={handleUpdateCurrentVersion}>
                        <h3>Update Current Version</h3>
                    </button>
                </div>

                <br />

                <button className={styles.button} type='submit' onClick={handleUpdateVersions}>
                    <h3>Update Project Versions</h3>
                </button>
            </form>
        </div>
    )
}