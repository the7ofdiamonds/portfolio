import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import type {
  PortfolioObject,
  ProjectObject
} from '@the7ofdiamonds/ui-ux';
import {
  GitHubRepoQuery,
  Portfolio,
  Project,
  Repo
} from '@the7ofdiamonds/ui-ux';

import { getProject } from './projectSlice';
import { getRepoDetails } from './githubSlice';
import { getProjectData } from './databaseSlice';

export interface PortfolioState {
  portfolioLoading: boolean;
  portfolioLoadingMessage: string | null;
  portfolioError: Error | null;
  portfolioErrorMessage: string | null;
  portfolioProjectObject: ProjectObject | null;
  portfolioObject: PortfolioObject | null;
  organizationPortfolioObject: PortfolioObject | null;
  projects: Array<ProjectObject> | null;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioLoadingMessage: null,
  portfolioError: null,
  portfolioErrorMessage: null,
  portfolioProjectObject: null,
  portfolioObject: null,
  organizationPortfolioObject: null,
  projects: null,
};

export const getPortfolioProject = createAsyncThunk<ProjectObject | null, Project>(
  'project/getPortfolioProject',
  async (project: Project, thunkAPI) => {
    try {

      if (!project?.query || !project?.query?.owner || !project?.query?.repo) {
        return null;
      }

      const repoQuery = new GitHubRepoQuery(
        project.query.owner,
        project.query.repo
      );

      const repoDetailsResponse = await thunkAPI.dispatch(
        getRepoDetails(repoQuery)
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
        getProjectData(project.query.repo)
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

export const getPortfolioDetails = createAsyncThunk(
  'portfolio/getPortfolio',
  async (portfolio: Portfolio, thunkAPI) => {
    try {
      if (portfolio?.projects.size === 0) {
        return null;
      }

      const portfolioPromises = Array.from(portfolio?.projects).map(
        async (project) => {
          const projectResponse = await thunkAPI.dispatch(getPortfolioProject(project));

          if (
            getProject.fulfilled.match(projectResponse) &&
            projectResponse.payload
          ) {
            return new Project(projectResponse.payload);
          }

          return project;
        }
      );

      const projects = (await Promise.all(portfolioPromises)).filter(
        (project) => project !== null
      );

      portfolio.setProjects(new Set(projects));

      return portfolio.toPortfolioObject();
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolioDetails.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.portfolioObject = action.payload;
      })
      .addMatcher(isAnyOf(getPortfolioDetails.pending), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
      })
      .addMatcher(isAnyOf(getPortfolioDetails.rejected), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = (action.error as Error) || null;
        state.portfolioErrorMessage =
          action.error.message || 'There was an error getting the portfolio.';
      });
  },
});
