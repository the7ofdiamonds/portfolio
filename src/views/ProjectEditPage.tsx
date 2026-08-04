import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { ProjectQuery, Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Project, Portfolio, RepoURL } from '@the7ofdiamonds/ui-ux';

import type { AppDispatch, RootState } from "../model/store";

import { getPortfolioProject } from '../controllers/portfolioSlice';
import { updateProject } from '../controllers/updateProjectSlice';

import { EditProject } from '../views/components/edit/EditProject';

interface ProjectEditPageProps {
    portfolio: Portfolio;
    useAppDispatch: () => AppDispatch;
    useAppSelector: TypedUseSelectorHook<RootState>;
}

export const ProjectEditPage: React.FC<ProjectEditPageProps> = ({ portfolio, useAppDispatch, useAppSelector }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { owner, projectID } = useParams<string>();

    const { projectLoading, projectLoadingMessage, projectErrorMessage } = useAppSelector(
        (state) => state.project
    );
    const { projectObject } = useAppSelector(
        (state) => state.portfolio
    );
    const { updateLoading, updateLoadingMessage, updateErrorMessage, updateSuccessMessage, updateStatusCode } = useAppSelector(
        (state) => state.update
    );

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [owner, projectID]);

    useEffect(() => {
        if (!project && portfolio && owner && projectID) {
            dispatch(getPortfolioProject({
                project_query: new ProjectQuery({
                    owner: owner,
                    repo: projectID
                }), portfolio: portfolio
            }))
        }
    }, [portfolio, owner, projectID]);

    useEffect(() => {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectObject]);

    useEffect(() => {
        if (owner && projectID && projectLoading) {
            setMessageType('info');
            setMessage(`Now Loading Project by @${owner} ${projectID.replace(/-/g, " ").toUpperCase()}`);
            setShowStatusBar('show');
        } else {
            setMessage(null)
        }
    }, [owner, projectID, projectLoading]);

    useEffect(() => {
        if (projectErrorMessage) {
            setMessage(projectErrorMessage);
            setMessageType('error');
            setShowStatusBar('show');
        } else {
            setShowStatusBar('hide');
        }
    }, [projectErrorMessage]);

    useEffect(() => {
        if (updateLoading && updateLoadingMessage) {
            setMessage(updateLoadingMessage);
            setMessageType('info');
            setShowStatusBar('show');
        } else {
            setShowStatusBar('hide');
        }
    }, [updateLoading, updateLoadingMessage]);

    useEffect(() => {
        if (updateErrorMessage) {
            setMessage(updateErrorMessage);
            setMessageType('error');
            setShowStatusBar('show');
        } else {
            setShowStatusBar('hide');
        }
    }, [updateErrorMessage]);

    useEffect(() => {
        if (updateStatusCode === 403) {
            navigate('/login');
        }
    }, [updateStatusCode]);

    useEffect(() => {
        if (updateSuccessMessage) {
            setMessage(updateSuccessMessage);
            setMessageType('success');
            setShowStatusBar('show');
        }
    }, [updateSuccessMessage]);

    const handleUpdateProject = (project: Project) => {
        try {
            if (!(project instanceof Project)) {
                throw new Error("A project is required to update.");
            }

            dispatch(updateProject(project));
        } catch (error) {
            const err = error as Error;
            setMessageType('error');
            setMessage(err.message);
            setShowStatusBar('show');
        }
    };

    return (
        <Section>
            {project && <EditProject project={project} change={handleUpdateProject} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />}
            {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}