import type { CreateSliceOptions } from '@reduxjs/toolkit';
import {
  createSlice,
  createAsyncThunk,
  isAnyOf
} from '@reduxjs/toolkit';

import type { OrganizationObject, OrganizationsObject } from '@the7ofdiamonds/ui-ux';
import { Organization, Organizations } from '@the7ofdiamonds/ui-ux';

import { getOrganizationDetails } from '../controllers/githubSlice';
import { getOrganizationData } from '../controllers/databaseSlice';

export interface OrganizationState {
  organizationLoading: boolean;
  organizationStatusCode: string;
  organizationError: Error | null;
  organizationErrorMessage: string;
  organizationObject: OrganizationObject | null;
  organizationsObject: OrganizationsObject | null;
}

const initialState: OrganizationState = {
  organizationLoading: false,
  organizationStatusCode: '',
  organizationError: null,
  organizationErrorMessage: '',
  organizationObject: null,
  organizationsObject: null,
};

export const getOrganization = createAsyncThunk(
  'organization/getOrganization',
  async (data: OrganizationObject, thunkAPI) => {
    try {
      let organization: Organization | null = null;

      if (data) {
        organization = new Organization(data)
      }

      // const organizationResponse = await thunkAPI.dispatch(
      //   getOrganizationDetails(login)
      // );

      // if (
      //   getOrganizationDetails.fulfilled.match(organizationResponse) &&
      //   organizationResponse.payload
      // ) {
      //   const organization = new Organization(organizationResponse.payload);

      //   const databaseResponse = organization.id
      //     ? await thunkAPI.dispatch(getOrganizationData(organization.id))
      //     : null;

      //   if (
      //     databaseResponse &&
      //     getOrganizationData.fulfilled.match(databaseResponse) &&
      //     databaseResponse.payload
      //   ) {
      //     organization.fromDB(databaseResponse.payload);
      //   }

      //   return organization.toOrganizationObject();
      // }

      return organization.toOrganizationObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizations = createAsyncThunk(
  'organization/getOrganizations',
  async (data: OrganizationsObject, thunkAPI) => {
    try {
      let organizations: Organizations | null = null;

      if (data) {
        organizations = new Organizations(data)
      }

      // const organizationResponse = await thunkAPI.dispatch(
      //   getOrganizationDetails(login)
      // );

      // if (
      //   getOrganizationDetails.fulfilled.match(organizationResponse) &&
      //   organizationResponse.payload
      // ) {
      //   const organization = new Organization(organizationResponse.payload);

      //   const databaseResponse = organization.id
      //     ? await thunkAPI.dispatch(getOrganizationData(organization.id))
      //     : null;

      //   if (
      //     databaseResponse &&
      //     getOrganizationData.fulfilled.match(databaseResponse) &&
      //     databaseResponse.payload
      //   ) {
      //     organization.fromDB(databaseResponse.payload);
      //   }

      //   return organization.toOrganizationObject();
      // }

      return organizations.toOrganizationsObject();
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

export const organizationSlice = createSlice(organizationSliceOptions);