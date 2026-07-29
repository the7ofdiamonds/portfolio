import type { CreateSliceOptions } from '@reduxjs/toolkit';
import {
  createSlice,
  createAsyncThunk,
  isAnyOf
} from '@reduxjs/toolkit';

import type { UserObject, SkillsObject, OrganizationsObject, ContactMethodsObject } from '@the7ofdiamonds/ui-ux';
import { ContactMethods, Organization, Organizations, Skills, User } from '@the7ofdiamonds/ui-ux';

import {
  getAuthenticatedAccount,
  getUserAccount,
} from '../controllers/githubSlice';
import {
  getSkills,
} from '../controllers/skillsSlice';
import {
  getOrganizations,
} from '../controllers/organizationSlice';
import {
  getContacts,
} from '../controllers/contactSlice';
import { getUserData } from '../controllers/databaseSlice';

import type { RootState } from '../model/store';

export interface UserState {
  userLoading: boolean;
  userLoadingMessage: string | null;
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
  userLoadingMessage: null,
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

type LocalData = {
  user: UserObject;
  skills: SkillsObject;
  organizations: OrganizationsObject;
  contact_methods: ContactMethodsObject;
}

export const getUserLocalData = createAsyncThunk(
  'user/getUserData',
  async (data: LocalData, thunkAPI) => {
    try {
      let user: User | null = null;

      if (data) {
        user = new User();

        if (data?.user) {
          const userData = data.user;
          user.fromJSON(userData);
        }
      }

      const skillsResponse = await thunkAPI.dispatch(getSkills(data?.skills));

      if (
        getSkills.fulfilled.match(skillsResponse) &&
        skillsResponse.payload
      ) {
        user.setSkills(new Skills(skillsResponse.payload));
      }

      const organizationsResponse = await thunkAPI.dispatch(getOrganizations(data?.organizations));

      if (
        getOrganizations.fulfilled.match(organizationsResponse) &&
        organizationsResponse.payload
      ) {
        user.setOrganizations(new Organizations(organizationsResponse.payload))
      }

      const contactsResponse = await thunkAPI.dispatch(getContacts(data?.contact_methods));

      if (
        getContacts.fulfilled.match(contactsResponse) &&
        contactsResponse.payload
      ) {
        user.setContactMethods(new ContactMethods(contactsResponse.payload))
      }

      if (!user) return null;

      return user.toUserObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getAuthenticatedUserAccount = createAsyncThunk(
  'user/getAuthenticatedUserAccount',
  async (data: LocalData, thunkAPI) => {
    try {
      let user: User | null = null;

      if (data) {
        const userLocalDataResponse = await thunkAPI.dispatch(getUserLocalData(data));

        if (
          getUserLocalData.fulfilled.match(userLocalDataResponse) &&
          userLocalDataResponse.payload
        ) {
          user = new User(userLocalDataResponse.payload);
        }
      }

      const userResponse = await thunkAPI.dispatch(getAuthenticatedAccount());

      if (
        getAuthenticatedAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        if (!user) user = new User();

        user.fromGitHubGraphQL(userResponse.payload)

        // const databaseResponse = user.id
        //   ? await thunkAPI.dispatch(getUserData(user.id))
        //   : null;

        // if (
        //   databaseResponse &&
        //   getUserData.fulfilled.match(databaseResponse) &&
        //   databaseResponse.payload?.data
        // ) {
        //   user.fromDB(databaseResponse.payload.data);
        // }
      }

      if (!user) return null;

      return user.toUserObject();
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
      .addCase(getUserLocalData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userLoadingMessage = null;
        state.userErrorMessage = '';
        state.userError = null;
        state.userObject = action.payload;
      })
      .addCase(getAuthenticatedUserAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userLoadingMessage = null;
        state.userErrorMessage = '';
        state.userError = null;
        state.authenticatedUserObject = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userLoadingMessage = null;
        state.userErrorMessage = '';
        state.userError = null;
        state.userObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getUser.pending, getAuthenticatedUserAccount.pending),
        (state) => {
          state.userLoading = true;
          state.userLoadingMessage = 'Now Loading User';
          state.userErrorMessage = '';
          state.userError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUser.rejected, getAuthenticatedUserAccount.rejected),
        (state, action) => {
          state.userLoading = false;
          state.userLoadingMessage = null;
          state.userErrorMessage = action.error.message || '';
          state.userError = action.error as Error;
        }
      );
  },
};

export const userSlice = createSlice(userSliceOptions);
