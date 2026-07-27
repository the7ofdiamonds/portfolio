import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import type {
  OrganizationObject,
  PortfolioObject,
  ProjectObject,
  UserObject
} from '@the7ofdiamonds/ui-ux';
import {
  GitHubRepoQuery,
  Portfolio,
  Project,
  Repo,
  ProjectQuery
} from '@the7ofdiamonds/ui-ux';

import { getProject, removeProject } from './projectSlice';
import { getRepoDetails } from './githubSlice';
import { getProjectData } from './databaseSlice';
import type { RootState } from '../model/store';

export interface PortfolioState {
  portfolioLoading: boolean;
  portfolioLoadingMessage: string | null;
  portfolioError: Error | null;
  portfolioErrorMessage: string | null;
  portfolioProjectObject: ProjectObject | null;
  portfolioObject: PortfolioObject | null;
  organizationPortfolioObject: PortfolioObject | null;
  projects: Array<ProjectObject> | null;
  projectList: Array<string | number>;
  hasDetails: boolean;
  projectObject: ProjectObject | null;
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
  projectList: [],
  hasDetails: false,
  projectObject: null
};

export const getPortfolio = createAsyncThunk<ProjectObject | null, Project>(
  'portfolio/getPortfolioProject',
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

export const getPortfolioFromUser = createAsyncThunk<PortfolioObject | null, UserObject>(
  'portfolio/getPortfolioFromUser',
  async (user: UserObject, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      // const user = state.user.userObject;

      let portfolio: Portfolio | null = null;

      if (user?.portfolio?.projects && user.portfolio.projects.length > 0) {
        portfolio = new Portfolio()
        portfolio.addProjectObjects(user?.portfolio?.projects)
      }

      if (user?.organizations && user.organizations.length > 0) {
        user.organizations.forEach((org: OrganizationObject) => {
          if (org?.portfolio?.projects && org.portfolio.projects.length > 0) {
            if (!portfolio) portfolio = new Portfolio()
            portfolio.addProjectObjects(org?.portfolio?.projects)
          }
        })
      }

      if (!portfolio) return null;

      return portfolio.toPortfolioObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addProjectList = createAsyncThunk<Array<number>, ProjectQuery>(
  'portfolio/addProjectList',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const projectList = state.portfolio.projectList;

      if (!projectQuery.id) {
        console.warn('No query id provided')
        return [
          ...projectList
        ];
      }

      if (typeof projectQuery.id === 'string' && projectQuery?.repoType === 'GitHub') {
        console.warn('Query id provided is a string and can not be added to list')
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


export const maintainPortfolio = createAsyncThunk<boolean, ProjectQuery>(
  'portfolio/maintainPortfolio',
  async (projectQuery: ProjectQuery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const projectList = state.portfolio.projectList;

      let status: 'success' | 'failure' | null = null;

      const projectListResponse = await thunkAPI.dispatch(addProjectList(projectQuery));

      if (
        addProjectList.fulfilled.match(projectListResponse) &&
        projectListResponse.payload
      ) {
        if (projectList.length >= projectListResponse.payload.length) {
          console.warn('Project was not added to projectList at portfolioSlice');
          status = 'failure';
        } else {
          status = 'success';
        }
      }

      const removeProjectResponse = await thunkAPI.dispatch(removeProject(projectQuery));

      if (
        removeProject.fulfilled.match(removeProjectResponse) &&
        removeProjectResponse.payload
      ) {
        console.warn('Project data still exist at projectSlice');
        status = 'failure';
      }

      if (status === 'failure') {
        return false;
      }

      return true;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getPortfolioDetails = createAsyncThunk(
  'portfolio/getPortfolioDetails',
  async (portfolio: Portfolio, thunkAPI) => {
    try {
      const projects = portfolio?.projects;

      if (!projects || projects.size === 0) return null;

      let updatedPortfolio = new Portfolio();

      for (const project of portfolio.projects) {
        const projectResponse = await thunkAPI.dispatch(getProject(project.query));

        if (
          getProject.fulfilled.match(projectResponse) &&
          projectResponse.payload
        ) {
          const updatedProject = new Project(projectResponse.payload)
          updatedPortfolio.addProject(updatedProject)
          await thunkAPI.dispatch(maintainPortfolio(updatedProject.query));
        }
      }

      return updatedPortfolio.toPortfolioObject();
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
);

type PortfolioQuery = {
  project_query: ProjectQuery;
  portfolio: Portfolio;
};

export const getPortfolioProject = createAsyncThunk<ProjectObject | null, PortfolioQuery>(
  'portfolio/getPortfolioProject',
  async (portfolioQuery: PortfolioQuery, thunkAPI) => {
    try {
      const { project_query, portfolio } = portfolioQuery;

      let project: ProjectObject | null = null;

      if (!project_query || !portfolio || portfolio.projects.length === 0) return null;

      project = portfolio?.filterProject(project_query);

      const state = thunkAPI.getState() as RootState;
      const projectList = state.portfolio.projectList;

      if (project?.query?.id && (projectList.length === 0 || !projectList.includes(project.query.id))) {
        const projectResponse = await thunkAPI.dispatch(getProject(project.query));

        if (
          getProject.fulfilled.match(projectResponse) &&
          projectResponse.payload
        ) {
          project = new Project(projectResponse.payload);
        }

        await thunkAPI.dispatch(maintainPortfolio(project.query));
      }

      if (!project || !(project instanceof Project)) {
        return null;
      }

      return project.toProjectObject();
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
      .addCase(getPortfolioDetails.pending, (state, action) => {
        state.portfolioLoading = true;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.portfolioLoadingMessage = 'Now Loading Portfolio Details';
      })
      .addCase(getPortfolioFromUser.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.portfolioObject = action.payload;
      })
      .addCase(addProjectList.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.projectList = action.payload;
      })
      .addCase(getPortfolioDetails.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioLoadingMessage = null;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.portfolioObject = action.payload;
        state.hasDetails = true;
      })
      .addCase(getPortfolioProject.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.projectObject = action.payload;
      })
      .addMatcher(isAnyOf(getPortfolioFromUser.pending, getPortfolioProject.pending), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = null;
        state.portfolioErrorMessage = null;
        state.portfolioObject = null;
      })
      .addMatcher(isAnyOf(getPortfolioDetails.rejected, getPortfolioFromUser.rejected, getPortfolioProject.rejected), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = (action.error as Error) || null;
        state.portfolioErrorMessage =
          action.error.message || 'There was an error getting the portfolio.';
      });
  },
});
