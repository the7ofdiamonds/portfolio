import React, { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch } from '@/model/hooks';
import { Project } from '@/model/Project';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';

import { EditDetails } from '@/views/components/edit/EditDetails';
import { EditProcess } from '@/views/components/edit/process/EditProcess';
import { EditSolution } from '@/views/components/edit/EditSolution';
import { EditProblem } from '@/views/components/edit/EditProblem';

import { StatusBarComponent } from '@/views/components/StatusBarComponent';

interface EditProjectProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProject: React.FC<EditProjectProps> = ({ project, change }) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');

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
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <>
            <form action="" id="add_project">
                <div className="form-item-flex">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <button onClick={change(project)}>
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

            <button onClick={change(project)}>
                <h3 className='title'>SAVE PROJECT</h3>
            </button>

            <StatusBarComponent />
        </>
    )
}