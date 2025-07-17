import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { UserObject, User } from '@the7ofdiamonds/ui-ux';

import {
  getAuthenticatedAccount,
  getUserAccount,
} from '@/controllers/githubSlice';
import { getUserData } from '@/controllers/databaseSlice';

export interface UserState {
  userLoading: boolean;
  userStatusCode: string;
  userError: Error | null;
  userErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  userObject: UserObject | null;
  authenticatedUserObject: UserObject | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
}

const initialState: UserState = {
  userLoading: false,
  userStatusCode: '',
  userError: null,
  userErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  authenticatedUserObject: null,
  userObject: null,
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getAuthenticatedUserAccount = createAsyncThunk(
  'user/getAuthenticatedUserAccount',
  async (_, thunkAPI) => {
    try {
      const userResponse = await thunkAPI.dispatch(getAuthenticatedAccount());

      if (
        getAuthenticatedAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        const user = new User(userResponse.payload);

        const databaseResponse = user.id
          ? await thunkAPI.dispatch(getUserData(user.id))
          : null;

        if (
          databaseResponse &&
          getUserData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload?.data
        ) {
          user.fromDB(databaseResponse.payload.data);
        }

        return user.toUserObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (login: string, thunkAPI) => {
    try {
      const userResponse = await thunkAPI.dispatch(getUserAccount(login));

      if (
        getUserAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        const user = new User();

        const databaseResponse = user.id
          ? await thunkAPI.dispatch(getUserData(user.id))
          : null;

        if (
          databaseResponse &&
          getUserData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload
        ) {
          user.fromDB(databaseResponse.payload);
        }

        return { ...userResponse.payload };
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const userSliceOptions: CreateSliceOptions = {
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthenticatedUserAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.authenticatedUserObject = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.userObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getUser.pending, getAuthenticatedUserAccount.pending),
        (state) => {
          state.userLoading = true;
          state.userErrorMessage = '';
          state.userError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUser.rejected, getAuthenticatedUserAccount.rejected),
        (state, action) => {
          state.userLoading = false;
          state.userErrorMessage = action.error.message || '';
          state.userError = action.error as Error;
        }
      );
  },
};

export const userSlice = createSlice(userSliceOptions);