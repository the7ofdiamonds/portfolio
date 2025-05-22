import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getOrganizationDetails } from '@/controllers/githubSlice';
import { getOrganizationData } from '@/controllers/databaseSlice';

import { Organization, OrganizationObject } from '@/model/Organization';

export interface OrganizationState {
  organizationLoading: boolean;
  organizationStatusCode: string;
  organizationError: Error | null;
  organizationErrorMessage: string;
  organizationObject: OrganizationObject | null;
}

const initialState: OrganizationState = {
  organizationLoading: false,
  organizationStatusCode: '',
  organizationError: null,
  organizationErrorMessage: '',
  organizationObject: null,
};

export const getOrganization = createAsyncThunk(
  'organization/getOrganization',
  async (login: string, thunkAPI) => {
    try {
      const organizationResponse = await thunkAPI.dispatch(
        getOrganizationDetails(login)
      );

      if (
        getOrganizationDetails.fulfilled.match(organizationResponse) &&
        organizationResponse.payload
      ) {
        const organization = new Organization(organizationResponse.payload);

        const databaseResponse = organization.id
          ? await thunkAPI.dispatch(getOrganizationData(organization.id))
          : null;

        if (
          databaseResponse &&
          getOrganizationData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload
        ) {
          organization.fromDB(databaseResponse.payload);
        }

        return organization.toOrganizationObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const organizationSliceOptions: CreateSliceOptions<OrganizationState> = {
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.organizationLoading = false;
        state.organizationErrorMessage = '';
        state.organizationError = null;
        state.organizationObject = action.payload;
      })
      .addMatcher(isAnyOf(getOrganization.pending), (state) => {
        state.organizationLoading = true;
        state.organizationErrorMessage = '';
        state.organizationError = null;
      })
      .addMatcher(isAnyOf(getOrganization.rejected), (state, action) => {
        state.organizationLoading = false;
        state.organizationErrorMessage = action.error.message || '';
        state.organizationError = action.error as Error;
      });
  },
};

const organizationSlice = createSlice(organizationSliceOptions);

export default organizationSlice;
