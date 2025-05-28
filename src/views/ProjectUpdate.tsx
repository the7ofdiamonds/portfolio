import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { updateProject } from '@/controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Project } from '@/model/Project';
import { Owner } from '@/model/Owner';
import { Portfolio } from '@/model/Portfolio';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { RepoURL } from '@/model/RepoURL';
import { User } from '@/model/User';
import { EditProject } from './components/edit/EditProject';

interface ProjectUpdateProps {
    user: User;
}

export const ProjectUpdate: React.FC<ProjectUpdateProps> = ({ user }) => {
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
            dispatch(setMessage(projectLoadingMessage));
            dispatch(setMessageType('info'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [projectLoading, projectLoadingMessage]);

    useEffect(() => {
        if (projectErrorMessage) {
            dispatch(setMessage(projectErrorMessage));
            dispatch(setMessageType('info'));
            dispatch(setShowStatusBar(Date.now));
        }
    }, [projectErrorMessage]);

    useEffect(() => {
        if (updateLoading && updateLoadingMessage) {
            dispatch(setMessage(updateLoadingMessage));
            dispatch(setMessageType('info'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [updateLoading, updateLoadingMessage]);

    useEffect(() => {
        if (updateErrorMessage) {
            dispatch(setMessage(updateErrorMessage));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [updateErrorMessage]);

    useEffect(() => {
        if (updateSuccessMessage) {
            dispatch(setMessage(updateSuccessMessage));
            dispatch(setMessageType('success'));
            dispatch(setShowStatusBar(Date.now()));
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
            dispatch(setMessageType('error'));
            dispatch(setMessage(err.message));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <section className='update-project'>
            <h1 className='title'>update project</h1>
            <EditProject project={project} change={handleUpdateProject} />
        </section>
    )
}