import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getAPI } from '@/services/Config';

import { Project } from '@/model/Project';
import { Taxonomy } from '@/model/Taxonomy';
import { addSecureHeaders } from '@/utilities/Headers';
import { SecureHeaders } from '@/model/SecureHeaders';

export interface AddState {
  addLoading: boolean;
  addSuccessMessage: string | null;
  addError: Error | null;
  addErrorMessage: string | null;
  addStatusCode: string | null;
  projectID: string | null;
  taxType: string | null;
}

const initialState: AddState = {
  addLoading: false,
  addSuccessMessage: null,
  addError: null,
  addErrorMessage: null,
  addStatusCode: null,
  projectID: null,
  taxType: null,
};

export type AddProjectResponse = {
  id: string;
  repo_url: string;
  success_message: string;
};

export const addProject = createAsyncThunk<AddProjectResponse, Project>(
  'add/addProject',
  async (project: Project) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized');
      }

      if (!project.id) {
        throw new Error('Project ID is required.');
      }

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/projects/add`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(project.toProjectDataObject()),
      });

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

export type AddSkillResponse = {
  type: string | null;
  success_message: string | null;
  error_message: string | null;
  status_code: string | null;
};

// export const addSkill = createAsyncThunk<AddSkillResponse, Taxonomy>(
//   'add/addSkill',
//   async (taxonomy: Taxonomy) => {
//     try {
//       const api = getAPI();

//       if (!api) {
//         throw new Error('API is not initialized');
//       }

//       if (!taxonomy.path) {
//         throw new Error('Skill type is required.');
//       }

//       const headers: SecureHeaders = await addSecureHeaders();

//       if (headers.errorMessage) {
//         return headers;
//       }

//       const response = await fetch(`${api}/taxonomies/skills`, {
//         method: 'POST',
//         headers:
//           headers instanceof SecureHeaders
//             ? new Headers(headers.toObject())
//             : {},
//         body: JSON.stringify(taxonomy.toObject()),
//       });

//       const text = response ? await response.text() : null;

//       if (text) {
//         const data = JSON.parse(text);

//         return data;
//       }

//       return null;
//     } catch (error) {
//       const err = error as Error;

//       console.error(err);
//       throw new Error(err.message);
//     }
//   }
// );

const addSliceOptions: CreateSliceOptions<AddState> = {
  name: 'add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.fulfilled, (state, action) => {
        state.addLoading = false;
        state.projectID = action.payload.id;
        state.addSuccessMessage = action.payload.success_message;
      })
      .addMatcher(isAnyOf(addProject.pending), (state) => {
        state.addLoading = true;
        state.addError = null;
        state.addErrorMessage = '';
      })
      .addMatcher(
        isAnyOf(addProject.rejected),
        (state, action) => {
          state.addLoading = false;
          state.addError = (action.error as Error) || null;
          state.addErrorMessage = action.error.message || '';
        }
      );
  },
};

export const addSlice = createSlice(addSliceOptions);
