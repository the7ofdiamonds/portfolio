import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectVersions } from '@the7ofdiamonds/ui-ux'

import { useAppDispatch } from '@/model/hooks';

import styles from './ProjectVersions.module.scss';

interface EditProjectVersionsProps {
    projectVersions: ProjectVersions;
    setProjectVersions: (projectVersions: ProjectVersions) => void
}

export const EditProjectVersions: React.FC<EditProjectVersionsProps> = ({ projectVersions, setProjectVersions }) => {
    const [history, setHistory] = useState<Set<string>>(new Set());
    const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');
    const [future, setFuture] = useState<Set<string>>(new Set());

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

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
            setMessage(err.message);
            setMessageType('error');
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
            setMessage(err.message);
            setMessageType('error');
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
            setMessage(err.message);
            setMessageType('error');
        }
    };

    const handleUpdateVersions = () => {
        try {
            projectVersions.setHistory(history)
            projectVersions.setCurrent(currentVersion)
            projectVersions.setFuture(future)
            setProjectVersions(projectVersions)
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
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