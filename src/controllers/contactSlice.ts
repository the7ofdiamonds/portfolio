import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, doc, getDoc } from 'firebase/firestore';

import { getDB } from '@/Config';

import { Contact, ContactObject } from '@/model/Contact';

export interface ContactState {
  contactLoading: boolean;
  contactError: Error | null;
  contactErrorMessage: string;
  contactSuccessMessage: string;
  contactPage: ContactObject | null;
}

const initialState: ContactState = {
  contactLoading: false,
  contactError: null,
  contactErrorMessage: '',
  contactSuccessMessage: '',
  contactPage: null,
};

interface Email {
  page: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  msg: string;
}

export const sendEmail = createAsyncThunk<string, Record<string, any>>(
  'contact/sendEmail',
  async (data) => {
    try {
      console.log(data);
      // const response = await fetch(`/wp-json/seven-tech/v1/email/${page}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: email,
      //     firstname: firstname,
      //     lastname: lastname,
      //     subject: subject,
      //     message: msg,
      //   }),
      // });

      // const responseData = await response.json();

      // return responseData;
      return 'Success';
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getContactPageContent = createAsyncThunk(
  'about/getContactPageContent',
  async () => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Firebase database is not initialized.');
      }

      const contactCollection = collection(db, 'content');
      const docRef = doc(contactCollection, 'contact');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Contact page content could not be found.');
      }

      const data = docSnap.data();

      const contactObject: ContactObject = {
        id: data.id,
        title: data.title,
        url: data.url,
        image: data.image,
        value: data.value,
      };

      return new Contact(contactObject).toContactObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const contactSliceOptions: CreateSliceOptions<ContactState> = {
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.contactLoading = true;
        state.contactError = null;
        state.contactErrorMessage = '';
      })
      .addCase(getContactPageContent.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = null;
        state.contactErrorMessage = '';
        state.contactPage = action.payload;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = null;
        state.contactErrorMessage = '';
        state.contactSuccessMessage = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactError = (action.error as Error) || null;
        state.contactErrorMessage = action.error.message || '';
      });
  },
};

const contactSlice = createSlice(contactSliceOptions);

export default contactSlice;
