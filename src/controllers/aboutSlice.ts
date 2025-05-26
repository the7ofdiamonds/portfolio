import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, doc, getDoc } from 'firebase/firestore';

import { getDB } from '@/services/Config';

export class AboutPage {
  missionStatement: string;
  story: string;

  constructor(data: Record<string, any> = {}) {
    this.missionStatement = data?.mission_statement;
    this.story = data?.story;
  }
}

export interface AboutState {
  aboutLoading: boolean;
  aboutStatusCode: string | null;
  aboutError: Error | null;
  aboutErrorMessage: string;
  aboutPage: AboutPage | null;
}

export const initialState: AboutState = {
  aboutLoading: false,
  aboutStatusCode: '',
  aboutError: null,
  aboutErrorMessage: '',
  aboutPage: null,
};

export const getAboutPageContent = createAsyncThunk<AboutPage>(
  'about/getAboutPageContent',
  async () => {
    try {
      const db = getDB();
      
      if (!db) {
        return new AboutPage();
      }
      
      const contentCollection = collection(db, 'content');
      const docRef = doc(contentCollection, 'about');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('About page content could not be found.');
      }

      return new AboutPage(docSnap.data());
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const aboutSliceOptions: CreateSliceOptions<AboutState> = {
  name: 'about',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutPageContent.pending, (state) => {
        state.aboutLoading = true;
        state.aboutError = null;
        state.aboutErrorMessage = '';
      })
      .addCase(getAboutPageContent.fulfilled, (state, action) => {
        state.aboutLoading = false;
        state.aboutError = null;
        state.aboutErrorMessage = '';
        state.aboutPage = action.payload;
      })
      .addCase(getAboutPageContent.rejected, (state, action) => {
        state.aboutLoading = false;
        state.aboutError = (action.error as Error) || null;
        state.aboutErrorMessage = action.error.message || '';
      });
  },
};

export const aboutSlice = createSlice(aboutSliceOptions);
