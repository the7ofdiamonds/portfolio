import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

import { getDB } from '@/Config';

import Taxonomy from '@/model/Taxonomy';
import { Project } from '@/model/Project';

export interface AddState {
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

export const addProjectType = createAsyncThunk(
  'add/addProjectType',
  async (taxonomy: Taxonomy) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }
      const projectTypeCollection = collection(db, 'project_types');

      await setDoc(
        doc(projectTypeCollection, taxonomy.id),
        taxonomy.toObject()
      );

      return `${taxonomy.id} was added to projectTypes`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addLanguage = createAsyncThunk(
  'add/addLanguage',
  async (taxonomy: Taxonomy) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }
      const languageCollection = collection(db, 'languages');

      await setDoc(doc(languageCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to languages`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addFramework = createAsyncThunk(
  'add/addFramework',
  async (taxonomy: Taxonomy) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const frameworkCollection = collection(db, 'frameworks');

      await setDoc(doc(frameworkCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to frameworks`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addTechnology = createAsyncThunk<string, Taxonomy>(
  'add/addTechnology',
  async (taxonomy: Taxonomy) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }
      const technologyCollection = collection(db, 'technologies');

      await setDoc(doc(technologyCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to technologies`;
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
      .addMatcher(
        isAnyOf(
          addProjectType.fulfilled,
          addLanguage.fulfilled,
          addFramework.fulfilled,
          addTechnology.fulfilled
        ),
        (state, action) => {
          state.addLoading = false;
          state.addSuccessMessage = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addProject.pending,
          addProjectType.pending,
          addLanguage.pending,
          addFramework.pending,
          addTechnology.pending
        ),
        (state) => {
          state.addLoading = true;
          state.addError = null;
          state.addErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(
          addProject.rejected,
          addProjectType.rejected,
          addLanguage.rejected,
          addFramework.rejected,
          addTechnology.rejected
        ),
        (state, action) => {
          state.addLoading = false;
          state.addError = (action.error as Error) || null;
          state.addErrorMessage = action.error.message || '';
        }
      );
  },
};

const addSlice = createSlice(addSliceOptions);

export default addSlice;
