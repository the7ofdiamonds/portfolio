import type { CreateSliceOptions } from '@reduxjs/toolkit';
import {
  createSlice,
  createAsyncThunk,
  isAnyOf
} from '@reduxjs/toolkit';

import type {
  ProjectQueryObject,
  ProjectSolutionObject,
  ProjectProcessObject,
  ProjectProblemObject,
  OwnerObject,
  ProjectDetailsObject,
  ProjectObject
} from '@the7ofdiamonds/ui-ux';
import {
  ProjectQuery,
  ProjectSolution,
  ProjectProcess,
  ProjectProblem,
  Owner,
  ProjectDetails,
  Project
} from '@the7ofdiamonds/ui-ux';

import { getAPI } from '../services/Config';

import { addSecureHeaders } from '../utilities/Headers';

export interface UpdateProjectState {
  updateLoading: boolean,
  updateLoadingMessage: string | null,
  updateSuccessMessage: string | null,
  updateError: Error | null,
  updateErrorMessage: string | null,
  updateStatusCode: number | null,
  updatedQuery: ProjectQueryObject | null;
  updatedSolution: ProjectSolutionObject | null;
  updatedProcess: ProjectProcessObject | null;
  updatedProblem: ProjectProblemObject | null;
  updatedOwner: OwnerObject | null;
  updatedDetails: ProjectDetailsObject | null;
  updatedProject: ProjectObject | null;
}

const initialState: UpdateProjectState = {
  updateLoading: false,
  updateLoadingMessage: null,
  updateSuccessMessage: null,
  updateError: null,
  updateErrorMessage: null,
  updateStatusCode: null,
  updatedQuery: null,
  updatedSolution: null,
  updatedProcess: null,
  updatedProblem: null,
  updatedOwner: null,
  updatedDetails: null,
  updatedProject: null
};

export const updateQuery = createAsyncThunk(
  'updateProject/updateQuery',
  async (projectQuery: ProjectQuery) => {
    try {

      if (!projectQuery.hasData()) return null;

      if (!projectQuery.id) {
        throw new Error("Project Query ID is required to be added to project.")
      }

      return projectQuery.toProjectQueryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateSolution = createAsyncThunk(
  'updateProject/updateSolution',
  async (projectSolution: ProjectSolution) => {
    try {

      if (!projectSolution.hasData()) return null;

      if (!projectSolution.id) {
        throw new Error("Project Solution ID is required to be added to project.")
      }

      return projectSolution.toProjectSolutionObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProcess = createAsyncThunk(
  'updateProject/updateProcess',
  async (projectProcess: ProjectProcess) => {
    try {

      if (!projectProcess.hasData()) return null;

      if (!projectProcess.id) {
        throw new Error("Project Process ID is required to be added to project.")
      }

      return projectProcess.toProjectProcessObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProblem = createAsyncThunk(
  'updateProject/updateProblem',
  async (projectProblem: ProjectProblem) => {
    try {

      if (!projectProblem.hasData()) return null;

      if (!projectProblem.id) {
        throw new Error("Project Problem ID is required to be added to project.")
      }

      return projectProblem.toProjectProblemObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateOwner = createAsyncThunk(
  'updateProject/updateOwner',
  async (owner: Owner) => {
    try {

      if (!owner.hasData()) return null;

      if (!owner.id) {
        throw new Error("Owner ID is required to be added to project.")
      }

      return owner.toOwnerObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDetails = createAsyncThunk(
  'updateProject/updateDetails',
  async (projectDetails: ProjectDetails) => {
    try {

      if (!projectDetails.hasData()) return null;

      if (!projectDetails.id) {
        throw new Error("Details ID is required to be added to project.")
      }

      return projectDetails.toDetailsObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'updateProject/updateProject',
  async (project: Project) => {
    try {

      if (!project.hasData()) throw new Error("No new data to update project.");
      ;
      //       const api = getAPI();
      // console.log(api)
      //       const headers: SecureHeaders = await addSecureHeaders();

      //       if (headers.errorMessage) {
      //         return headers;
      //       }
      return project.toProjectObject();

      // const response = await fetch(`${api}/saveProject/${project.id}`, {
      //   method: 'POST',
      //   headers:
      //     headers instanceof SecureHeaders
      //       ? new Headers(headers.toObject())
      //       : {},
      //   body: JSON.stringify(project.toProjectDataObject()),
      // });

      // return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      err.stack;
      throw new Error(err.message);
    }
  }
);

const updateProjectSliceOptions: CreateSliceOptions<UpdateProjectState> = {
  name: 'update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedProject = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        console.log(state.updatedProject)
        state.updateLoadingMessage = 'Updating your project...';
      })
      .addCase(updateSolution.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the solution section of your project...';
      })
      .addCase(updateProcess.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the process section of your project...';
      })
      .addCase(updateProblem.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the problem section of your project...';
      })
      .addCase(updateDetails.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the details section of your project...';
      })
      .addMatcher(
        isAnyOf(
          updateProject.fulfilled,
          updateSolution.fulfilled,
          updateProcess.fulfilled,
          updateProblem.fulfilled,
          updateDetails.fulfilled
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateStatusCode = action.payload?.status_code ?? null;
          state.updateErrorMessage = action.payload?.error_message ?? null;
          state.updateSuccessMessage = action.payload?.success_message ?? null;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProject.rejected,
          updateSolution.rejected,
          updateProcess.rejected,
          updateProblem.rejected,
          updateDetails.rejected
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateError = (action.error as Error) || null;
          state.updateErrorMessage = action.error.message || '';
        }
      );
  },
};

export const updateProjectSlice = createSlice(updateProjectSliceOptions);