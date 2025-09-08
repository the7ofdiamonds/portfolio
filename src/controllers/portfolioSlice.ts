import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
  GitHubRepoQuery,
  Portfolio,
  PortfolioObject,
  Project,
  ProjectObject,
  Repo,
  Repos,
} from '@the7ofdiamonds/ui-ux';

import { getProjectData } from './databaseSlice';
import { getRepo, getRepoLanguages } from './githubSlice';
import { getProject } from './projectSlice';

export interface PortfolioState {
  portfolioLoading: boolean;
  portfolioLoadingMessage: string | null;
  portfolioError: Error | null;
  portfolioErrorMessage: string | null;
  portfolioObject: PortfolioObject | null;
  organizationPortfolioObject: PortfolioObject | null;
  projects: Array<ProjectObject> | null;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioLoadingMessage: null,
  portfolioError: null,
  portfolioErrorMessage: null,
  portfolioObject: null,
  organizationPortfolioObject: null,
  projects: null,
};

export const getPortfolioDetails = createAsyncThunk(
  'portfolio/getPortfolio',
  async (portfolio: Portfolio, thunkAPI) => {
    try {
      if (portfolio?.projects.size === 0) {
        return null;
      }

      const portfolioPromises = Array.from(portfolio?.projects).map(
        async (project) => {
          if (project.name && project.query?.owner && project.query?.repo) {
            const projectResponse = await thunkAPI.dispatch(
              getProject(
                new GitHubRepoQuery(project.query?.owner, project.query?.repo)
              )
            );

            if (
              getProject.fulfilled.match(projectResponse) &&
              projectResponse.payload
            ) {
              return new Project(projectResponse.payload);
            }

            return null;
          }

          return null;
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
        state.portfolioErrorMessage = action.error.message || 'There was an error getting the portfolio.';
      });
  },
});
