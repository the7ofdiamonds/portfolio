import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { ProjectObject } from '@the7ofdiamonds/ui-ux';
import {
  GitHubRepoQuery,
  Project,
  Repo,
  ProjectQuery
} from '@the7ofdiamonds/ui-ux';

import { getRepoDetails } from './githubSlice';
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
}

const initialState: ProjectState = {
  projectLoading: false,
  projectLoadingMessage: null,
  projectPageLoading: false,
  projectError: null,
  projectErrorMessage: '',
  projectObject: null,
};

export const getProject = createAsyncThunk<ProjectObject | null, ProjectQuery>(
  'project/getProject',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      let errorMessage: String | null = null;

      if (!projectQuery?.owner || !projectQuery?.repo) {
        errorMessage = new String("Both owner and repo are required.");
      }

      if (!projectQuery?.owner) {
        errorMessage = errorMessage + ' ' + "Owner was not provided.";
      }

      if (!projectQuery?.repo) {
        errorMessage = errorMessage + ' ' + "Repo was not provided.";
      }


      if (!projectQuery?.repoType) {
        errorMessage = errorMessage + ' ' + "Repo Type was not provided.";
      }

      let repo: Repo | null = null;

      if (!errorMessage && projectQuery.repoType === 'GitLab') {
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
      }

      if (!errorMessage && projectQuery.repoType === 'GitHub') {
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

      if (errorMessage) {
        throw new Error(errorMessage.toString());
      }

      if (!repo) {
        return null;
      }

      const project = new Project();
      project.fromRepo(repo);

      return project.toProjectObject();
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
      const projectList = state.portfolio.projectList;

      if (!projectQuery?.id) {
        return project;
      }

      if (typeof projectQuery.id === 'string' && projectQuery?.repoType === 'GitHub') {
        console.warn('Query id provided is a string and can not be added to list')
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
