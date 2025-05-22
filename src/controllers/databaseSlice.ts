import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getAPI } from '@/Config';

export interface DatabaseState {
  databaseLoading: boolean;
  databaseLoadingMessage: string | null;
  databaseStatusCode: number | null;
  databaseError: Error | null;
  databaseErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  userObject: Record<string, any> | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
  userDataObject: Record<string, any> | null;
  organizationDataObject: Record<string, any> | null;
  projectDataObject: Record<string, any> | null;
}

const initialState: DatabaseState = {
  databaseLoading: false,
  databaseLoadingMessage: null,
  databaseStatusCode: null,
  databaseError: null,
  databaseErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  userObject: {},
  organizations: [],
  repos: [],
  socialAccounts: [],
  userDataObject: null,
  organizationDataObject: null,
  projectDataObject: null,
};

export const getUserData = createAsyncThunk(
  'database/getUserData',
  async (username: string) => {
    try {
      const api = getAPI();

      const response = api
        ? await fetch(`${api}/user/${username}`, {
            method: 'GET',
          })
        : null;

      const text = response ? await response.text() : null;

      if (text) {
        const data = JSON.parse(text);

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationData = createAsyncThunk(
  'database/getOrganizationData',
  async (organization: string) => {
    try {
      const api = getAPI();

      const response = api
        ? await fetch(`${api}/organization/${organization}`, {
            method: 'GET',
          })
        : null;

      const text = response ? await response.text() : null;

      if (text) {
        const data = JSON.parse(text);

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectData = createAsyncThunk(
  'database/getProjectData',
  async (projectID: string) => {
    try {
      const api = getAPI();

      const response = api
        ? await fetch(`${api}/project/${projectID}`, {
            method: 'GET',
          })
        : null;

      const text = response ? await response.text() : null;

      if (text) {
        const data = JSON.parse(text);

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const databaseSliceOptions: CreateSliceOptions<DatabaseState> = {
  name: 'database',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.databaseLoading = true;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.databaseLoadingMessage =
          'Standbye while user data is retrieved from the database.';
      })
      .addCase(getOrganizationData.pending, (state) => {
        state.databaseLoading = true;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.databaseLoadingMessage =
          'Standbye while organization data is retrieved from the database.';
      })
      .addCase(getProjectData.pending, (state) => {
        state.databaseLoading = true;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.databaseLoadingMessage =
          'Standbye while project data is retrieved from the database.';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.userDataObject = action.payload;
      })
      .addCase(getOrganizationData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.organizationDataObject = action.payload;
      })
      .addCase(getProjectData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = action.payload?.error_message ?? '';
        state.databaseError = null;
        state.databaseStatusCode = action.payload?.status_code ?? '';
        state.projectDataObject = action.payload?.data ?? null;
      })
      .addMatcher(
        isAnyOf(getUserData.pending, getOrganizationData.pending),
        (state) => {
          state.databaseLoading = true;
          state.databaseErrorMessage = '';
          state.databaseError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUserData.rejected, getOrganizationData.rejected),
        (state, action) => {
          state.databaseLoading = false;
          state.databaseErrorMessage = action.error.message || '';
          state.databaseError = action.error as Error;
        }
      );
  },
};

const databaseSlice = createSlice(databaseSliceOptions);

export default databaseSlice;
