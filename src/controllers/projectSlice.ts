import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  GitHubRepoQuery,
  Project,
  ProjectObject,
  Repo,
} from '@the7ofdiamonds/ui-ux';

import { getRepoDetails } from './githubSlice';
import { getProjectData } from './databaseSlice';

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

export const getProject = createAsyncThunk(
  'project/getProject',
  async (query: GitHubRepoQuery, thunkAPI) => {
    try {
      const project = new Project();

      const repoDetailsResponse = await thunkAPI.dispatch(
        getRepoDetails(query)
      );

      if (
        getRepoDetails.fulfilled.match(repoDetailsResponse) &&
        repoDetailsResponse.payload
      ) {
        const repo = new Repo(repoDetailsResponse.payload);
        project.fromRepo(repo);
      } else {
        return null;
      }

      const projectDataResponse = await thunkAPI.dispatch(
        getProjectData(query.repo)
      );

      if (
        getProjectData.fulfilled.match(projectDataResponse) &&
        projectDataResponse.payload
      ) {
        project.fromDocumentData(projectDataResponse.payload);
      }

      return project.toProjectObject();
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
      });
  },
});