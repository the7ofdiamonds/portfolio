import React, { useEffect, useState, ChangeEvent } from 'react';

import { StatusBar } from '@the7ofdiamonds/ui-ux';

import { EditDetails } from '@/views/components/edit/EditDetails';
import { EditProcess } from '@/views/components/edit/process/EditProcess';
import { EditSolution } from '@/views/components/edit/EditSolution';
import { EditProblem } from '@/views/components/edit/EditProblem';

import { Project } from '@/model/Project';

import styles from './Edit.module.scss';

interface EditProjectProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProject: React.FC<EditProjectProps> = ({ project, change }) => {
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (project && project.title) {
            setTitle(project.title);
        }
    }, [project]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'title') {
                project.setTitle(value);
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    return (
        <>
            <form className={styles.form} action="" id="edit_project">
                <div className={styles['form-item-flex']}>
                    <label className={styles.label} htmlFor="title">Title:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <button className={styles.button} onClick={change(project)}>
                    <h3>SAVE TITLE</h3>
                </button>
            </form>

            <hr />

            <EditSolution project={project} change={change} />

            <hr />

            <EditProcess project={project} change={change} />

            <hr />

            <EditProblem project={project} change={change} />

            <hr />

            <EditDetails project={project} change={change} />

            <br />

            <button className={styles.button} onClick={change(project)}>
                <h3>SAVE PROJECT</h3>
            </button>

            <StatusBar show={showStatusBar} messageType={messageType} message={message} />
        </>
    )
}