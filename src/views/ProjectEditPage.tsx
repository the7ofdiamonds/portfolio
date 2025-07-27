import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

import { updateProject } from '@/controllers/updateSlice';

import { getProject } from '@/controllers/projectSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

import { GitHubRepoQuery, Owner, Project, Portfolio, RepoURL, User } from '@the7ofdiamonds/ui-ux';

import { EditProject } from '@/views/components/edit/EditProject';

import styles from '@/views/components/edit/Edit.module.scss';

interface ProjectEditPageProps {
    user: User;
}

export const ProjectEditPage: React.FC<ProjectEditPageProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { login, projectID } = useParams();

    const { projectLoading, projectLoadingMessage, projectErrorMessage, projectObject } = useAppSelector(
        (state) => state.project
    );
    const { portfolioObject } = useAppSelector(
        (state) => state.portfolio
    );
    const { updateLoading, updateLoadingMessage, updateErrorMessage, updateSuccessMessage, updateStatusCode } = useAppSelector(
        (state) => state.update
    );

    const [portfolio, setPortfolio] = useState<Portfolio | null>(user.portfolio);

    const [owner, setOwner] = useState<Owner>(new Owner());
    const [id, setId] = useState<string>();
    const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>();

    const [project, setProject] = useState<Project>(new Project());

    const [title, setTitle] = useState<string>(projectID ?? '');

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    useEffect(() => {
        if (login) {
            setOwner(new Owner({ login: login }))
        }
    }, [login]);

    useEffect(() => {
        if (projectID) {
            setId(projectID);
        }
    }, [projectID]);

    useEffect(() => {
        if (user.portfolio) {
            setPortfolio(user.portfolio);
        }
    }, [user?.portfolio]);

    useEffect(() => {
        if (portfolio && portfolio.size > 0 && id) {
            const filteredProject = portfolio.filterProject(id);
            if (filteredProject) {
                setProject(filteredProject);
            }
        }
    }, [id, portfolio]);

    useEffect(() => {
        if (id && owner.login) {
            setRepoQuery(new GitHubRepoQuery(owner.login, id))
        }
    }, [owner, id]);

    useEffect(() => {
        if (repoQuery) {
            dispatch(getProject(repoQuery));
        }
    }, [repoQuery]);

    useEffect(() => {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectObject]);

    useEffect(() => {
        if (projectLoading && projectLoadingMessage) {
            setMessage(projectLoadingMessage);
            setMessageType('info');
            setShowStatusBar('show');
        }
    }, [projectLoading, projectLoadingMessage]);

    useEffect(() => {
        if (projectErrorMessage) {
            setMessage(projectErrorMessage);
            setMessageType('info');
            setShowStatusBar('show');
        }
    }, [projectErrorMessage]);

    useEffect(() => {
        if (updateLoading && updateLoadingMessage) {
            setMessage(updateLoadingMessage);
            setMessageType('info');
            setShowStatusBar('show');
        }
    }, [updateLoading, updateLoadingMessage]);

    useEffect(() => {
        if (updateErrorMessage) {
            setMessage(updateErrorMessage);
            setMessageType('error');
            setShowStatusBar('show');
        }
    }, [updateErrorMessage]);

    useEffect(() => {
        if (updateSuccessMessage) {
            setMessage(updateSuccessMessage);
            setMessageType('success');
            setShowStatusBar('show');
        }
    }, [updateSuccessMessage]);

    useEffect(() => {
        if (updateStatusCode === 403) {
            navigate('/login');
        }
    }, [updateStatusCode]);

    useEffect(() => {
        if (project && project.title) {
            setTitle(project.title);
        }
    }, [project]);

    const handleUpdateProject = (project: Project) => (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            dispatch(updateProject(project))
                .then((res) => {
                    if (res.meta.requestStatus === 'fulfilled') {
                        let id = res.payload.id;
                        let repoURL = new RepoURL(res.payload.repo_url);

                        if (repoURL.owner) {
                            const repoQuery = new GitHubRepoQuery(repoURL.owner, id);
                            dispatch(getProject(repoQuery));
                        }
                    }
                });
        } catch (error) {
            const err = error as Error;
            setMessageType('error');
            setMessage(err.message);
            setShowStatusBar('show');
        }
    };

    return (
        <Section>
            <h1 className={styles.title}>edit project</h1>
            <EditProject project={project} change={handleUpdateProject} />
            {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}