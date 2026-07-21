import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { ProjectObject } from '@the7ofdiamonds/ui-ux';
import {
  GitHubRepoQuery,
  Project,
  Repo,
  Commits,
  ProjectQuery
} from '@the7ofdiamonds/ui-ux';

import { getCommits, getRepoDetails } from './githubSlice';
import { getGitLabRepo } from './gitlabSlice';
import { getProjectData } from './databaseSlice';
import type { RootState } from '../model/store';

export interface ProjectState {
  projectLoading: boolean;
  projectLoadingMessage: string | null;
  projectPageLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  projectObject: ProjectObject | null;
  projectList: Array<number>;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectLoadingMessage: null,
  projectPageLoading: false,
  projectError: null,
  projectErrorMessage: '',
  projectObject: null,
  projectList: []
};

export const getProject = createAsyncThunk<ProjectObject | null, ProjectQuery>(
  'project/getProject',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {

      if (!projectQuery?.owner || !projectQuery?.repo) {
        console.error("Both owner and repo are required")

        if (!projectQuery?.owner) {
          console.error("Owner was not provided")
        }

        if (!projectQuery?.repo) {
          console.error("Repo was not provided")
        }

        return null;
      }

      let repo: Repo | null = null;
      let project: Project | null = null;

      const getGitLabRepoResponse = await thunkAPI.dispatch(
        getGitLabRepo(projectQuery)
      );

      if (
        getGitLabRepo.fulfilled.match(getGitLabRepoResponse) &&
        getGitLabRepoResponse.payload
      ) {
        repo = new Repo();
        repo.fromGitLab(getGitLabRepoResponse.payload);
      }

      if (!repo) {
        const githubRepoQuery = new GitHubRepoQuery({ owner: projectQuery.owner, repo: projectQuery.repo });

        const repoDetailsResponse = await thunkAPI.dispatch(
          getRepoDetails(githubRepoQuery)
        );

        if (
          getRepoDetails.fulfilled.match(repoDetailsResponse) &&
          repoDetailsResponse.payload
        ) {
          repo = new Repo(repoDetailsResponse.payload);
        }
      }

      if (repo) {
        project = new Project();
        project.fromRepo(repo);
        return project.toProjectObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addProjectList = createAsyncThunk<Array<number>, ProjectQuery>(
  'project/addProjectList',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const projectList = state.project.projectList;

      if (!projectQuery.id) {
        console.warn('No query id provided')
        return [
          ...projectList
        ];
      }

      if (typeof projectQuery.id === 'string') {
        console.warn('Query id provided is a string and can not e added to list')
        return [
          ...projectList
        ];
      }

      if (projectList.includes(projectQuery.id)) {
        console.warn('Query id already in project list')
        return [
          ...projectList
        ];
      }

      return [
        ...projectList,
        projectQuery.id,
      ];
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const removeProject = createAsyncThunk<ProjectObject | null, ProjectQuery>(
  'project/removeProject',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const project = state.project.projectObject;
      const projectList = state.project.projectList;

      if (!projectQuery.id) {
        return project;
      }

      if (typeof projectQuery.id === 'string') {
        console.warn('Query id provided is a string and can not e added to list')
        return project;
      }

      if (!projectList.includes(projectQuery.id)) {
        return project;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = null;
        state.projectObject = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = 'Now Loading Project...';
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
        state.projectLoadingMessage = null;
      })
      .addCase(addProjectList.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = null;
        state.projectList = action.payload;
      })
      .addCase(addProjectList.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = 'Now Loading Project...';
      })
      .addCase(addProjectList.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
        state.projectLoadingMessage = null;
      })
      .addCase(removeProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = null;
        state.projectObject = action.payload;
      })
      .addCase(removeProject.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectLoadingMessage = 'Now Loading Project...';
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
        state.projectLoadingMessage = null;
      });
  },
});
