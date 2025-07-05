import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Section,StatusBar } from '@the7ofdiamonds/ui-ux';

import { updateProject } from '@/controllers/updateSlice';
import {

    setShowStatusBar,
} from '@/controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import UpdateDetails from './components/update/UpdateDetails';
import UpdateProcess from './components/update/process/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';

import type { AppDispatch, RootState } from '@/model/store';
import { Project, ProjectObject } from '@/model/Project';
import { Owner } from '@/model/Owner';
import { Portfolio } from '@/model/Portfolio';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { RepoURL } from '@/model/RepoURL';
import { User } from '@/model/User';
import { useAppDispatch, useAppSelector } from '@/model/hooks';

interface ProjectUpdateProps {
    user: User;
}

export const ProjectUpdatePage: React.FC<ProjectUpdateProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { login, projectID } = useParams();

    const { projectLoading, projectLoadingMessage, projectErrorMessage, projectObject } = useAppSelector(
        (state: RootState) => state.project
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

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');

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
            setShowStatusBar(Date.now());
        }
    }, [updateLoading, updateLoadingMessage]);

    useEffect(() => {
        if (updateErrorMessage) {
            setMessage(updateErrorMessage);
            setMessageType('error');
            setShowStatusBar(Date.now());
        }
    }, [updateErrorMessage]);

    useEffect(() => {
        if (updateSuccessMessage) {
            setMessage(updateSuccessMessage);
            setMessageType('success');
            setShowStatusBar(Date.now());
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'title') {
                setTitle(value);

                const updatedProjectObject: ProjectObject = {
                    ...project.toProjectObject(),
                    title: value
                }

                setProject(new Project(updatedProjectObject))
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const handleUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
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
            <h1 className='title'>update project</h1>

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

                <button onClick={handleUpdateProject}>
                    <h3>Update Title</h3>
                </button>
            </form>

            <hr />

            <UpdateSolution project={project} />

            <hr />

            <UpdateProcess project={project} />

            <hr />

            <UpdateProblem project={project} />

            <hr />

            <UpdateDetails project={project} />

            <br />

            <button onClick={handleUpdateProject}>
                <h3 className='title'>Update Project</h3>
            </button>

            <StatusBar show={'hide'} messageType={messageType} message={message} />
        </Section>
    )
}