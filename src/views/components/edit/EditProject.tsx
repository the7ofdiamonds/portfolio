import React, { useEffect, useState, ChangeEvent } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { EditName, EditTitle, EditSubtitle, EditPromotionalText, EditDescription, EditPath, Main, StatusBar } from '@the7ofdiamonds/ui-ux';
import { Project, ProjectSolution, ProjectProcess, ProjectProblem, ProjectDetails } from '@the7ofdiamonds/ui-ux';

import { EditDetails } from '../../../views/components/edit/EditDetails';
import { EditProcess } from '../../../views/components/edit/process/EditProcess';
import { EditSolution } from '../../../views/components/edit/EditSolution';
import { EditProblem } from '../../../views/components/edit/EditProblem';

import type { AppDispatch, RootState } from "../../../model/store";

import styles from './Edit.module.scss';

interface EditProjectProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
    useAppDispatch: () => AppDispatch;
    useAppSelector: TypedUseSelectorHook<RootState>;
}

export const EditProject: React.FC<EditProjectProps> = ({ project, change, useAppDispatch, useAppSelector }) => {
    const instructions = "Save updates made to project.";

    const [name, setName] = useState<string | null>(project?.name);
    const [title, setTitle] = useState<string | null>(project?.title);
    const [subtitle, setSubtitle] = useState<string | null>(project?.subtitle);
    const [promotionalText, setPromotionalText] = useState<string | null>(project?.promotionalText);
    const [description, setDescription] = useState<string | null>(project?.description);
    const [path, setPath] = useState<string | null>(project?.path);
    const [solution, setSolution] = useState<ProjectSolution | null>(project?.solution);
    const [process, setProcess] = useState<ProjectProcess | null>(project?.process);
    const [problem, setProblem] = useState<ProjectProblem | null>(project?.problem);
    const [details, setDetails] = useState<ProjectDetails | null>(project?.details);

    const [message, setMessage] = useState<string | null>(instructions);
    const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;
            const { name, value } = target;

            if (name === 'name') {
                setName(value)
                project.setName(value);
            }


            if (name === 'title') {
                setTitle(value)
                project.setTitle(value);
            }


            if (name === 'subtitle') {
                setSubtitle(value)
                project.setSubtitle(value);
            }


            if (name === 'promotional_text') {
                setPromotionalText(value)
                project.setPromotionalText(value);
            }


            if (name === 'description') {
                setDescription(value)
                project.setDescription(value);
            }


            if (name === 'path') {
                setPath(value)
                project.setPath(value);
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const saveProject = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            change(project)
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };
    console.log(solution)
    console.log(process)
    console.log(problem)
    console.log(details)

    return (
        <Main>
            <h1 className={styles.title}>{`edit project ${title}`}</h1>

            <EditName title={name} handleChange={handleChange} saveName={saveProject} />

            <hr />

            <EditTitle title={title} handleChange={handleChange} saveTitle={saveProject} />

            <hr />

            <EditSubtitle subtitle={subtitle} handleChange={handleChange} saveSubtitle={saveProject} />

            <hr />

            <EditPromotionalText promotionalText={promotionalText} handleChange={handleChange} savePromotionalText={saveProject} />

            <hr />

            <EditDescription description={description} handleChange={handleChange} saveDescription={saveProject} />

            <hr />

            <EditPath path={path} handleChange={handleChange} savePath={saveProject} />

            <hr />

            <EditSolution id={project?.id ?? 0} solution={solution} setSolution={setSolution} />

            <hr />

            <EditProcess id={project?.id ?? 0} process={process} setProcess={setProcess} />

            <hr />

            <EditProblem id={project?.id ?? 0} problem={problem} setProblem={setProblem} />

            <hr />

            <EditDetails id={project?.id ?? 0} details={details} setDetails={setDetails} />

            <br />

            <StatusBar show={showStatusBar} messageType={messageType} message={message} />

            <button className={styles.button} onClick={saveProject}>
                <h3>SAVE PROJECT</h3>
            </button>
        </Main>
    )
}