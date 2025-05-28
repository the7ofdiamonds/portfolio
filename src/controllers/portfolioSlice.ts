import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { getProjectData } from './databaseSlice';
import { getRepo, getRepoLanguages } from './githubSlice';

import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { Portfolio, PortfolioObject } from '@/model/Portfolio';
import { Project } from '@/model/Project';
import { Repo } from '@/model/Repo';
import { Repos } from '@/model/Repos';

export interface PortfolioState {
  portfolioLoading: boolean;
  portfolioError: Error | null;
  portfolioErrorMessage: string;
  portfolioObject: PortfolioObject | null;
  organizationPortfolioObject: Array<Record<string, any>> | null;
  projects: Array<Record<string, any>> | null;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolioObject: null,
  organizationPortfolioObject: null,
  projects: null,
};

export const getPortfolioDetails = createAsyncThunk(
  'portfolio/getPortfolio',
  async (repos: Repos, thunkAPI) => {
    try {
      if (!Array.isArray(repos.queries) || repos.queries.length === 0) {
        return null;
      }

      const portfolioPromises = repos.collection.map(async (repo) => {
        if (repo.name) {
          const project = new Project();
          project.fromRepo(repo);

          const projectDataResponse = await thunkAPI.dispatch(
            getProjectData(repo.name)
          );

          if (
            getProjectData.fulfilled.match(projectDataResponse) &&
            projectDataResponse.payload?.data
          ) {
            project.fromDocumentData(projectDataResponse.payload.data);
          }

          return project;
        }

        return null;
      });

      const projects = (await Promise.all(portfolioPromises)).filter(
        (project) => project !== null
      );

      const portfolio = new Portfolio();
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
        state.portfolioErrorMessage = '';
        state.portfolioObject = action.payload;
      })
      .addMatcher(isAnyOf(getPortfolioDetails.pending), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
      })
      .addMatcher(isAnyOf(getPortfolioDetails.rejected), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = (action.error as Error) || null;
        state.portfolioErrorMessage = action.error.message || '';
      });
  },
});