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

export const getProject = createAsyncThunk<ProjectObject | null, Project>(
  'project/getProject',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      if (!projectQuery.repoType || !projectQuery.owner || !projectQuery.repo) {
        return null;
      }

      let repo: Repo | null = null;
      let project: Project | null = null;

      if (projectQuery.repoType === 'GitHub') {
        const repoDetailsResponse = await thunkAPI.dispatch(
          getRepoDetails(projectQuery)
        );

        if (
          getRepoDetails.fulfilled.match(repoDetailsResponse) &&
          repoDetailsResponse.payload
        ) {
          repo = new Repo(repoDetailsResponse.payload);
        }
      }

      if (projectQuery.repoType === 'GitLab') {
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
