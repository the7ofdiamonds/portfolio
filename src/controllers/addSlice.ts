import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

import { getDB, getAPI } from '@/services/Config';

import Taxonomy from '@/model/Taxonomy';
import { Project } from '@/model/Project';

interface AddState {
  addLoading: boolean;
  addSuccessMessage: string;
  addError: Error | null;
  addErrorMessage: string;
  addStatusCode: string;
  projectID: string;
}

const initialState: AddState = {
  addLoading: false,
  addSuccessMessage: '',
  addError: null,
  addErrorMessage: '',
  addStatusCode: '',
  projectID: '',
};

type AddResponse = {
  project_id: string;
  success_message: string;
};

export const addProject = createAsyncThunk<AddResponse, Record<string, any>>(
  'add/addProject',
  async (project) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const projectCollection = collection(db, 'portfolio');

      await setDoc(doc(projectCollection, project.id), project);

      return {
        project_id: project.id,
        success_message: `${project.id} was added to portfolio`,
      };
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addSkill = createAsyncThunk<string, Taxonomy>(
  'add/addSkill',
  async (taxonomy: Taxonomy) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized');
      }

      if (!taxonomy.path) {
        throw new Error('Skill type is required.');
      }

      const response = await fetch(`${api}/taxonomies/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxonomy.toObject()),
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

const addSliceOptions: CreateSliceOptions<AddState> = {
  name: 'add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addSuccessMessage = action.payload.success_message;
        state.projectID = action.payload.project_id;
      })
      .addMatcher(isAnyOf(addSkill.fulfilled), (state, action) => {
        state.addLoading = false;
        state.addSuccessMessage = action.payload;
      })
      .addMatcher(
        isAnyOf(addProject.pending, addSkill.pending),
        (state) => {
          state.addLoading = true;
          state.addError = null;
          state.addErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(addProject.rejected, addSkill.rejected),
        (state, action) => {
          state.addLoading = false;
          state.addError = (action.error as Error) || null;
          state.addErrorMessage = action.error.message || '';
        }
      );
  },
};

export const addSlice = createSlice(addSliceOptions);
