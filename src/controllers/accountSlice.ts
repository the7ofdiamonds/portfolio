import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { User } from '@the7ofdiamonds/ui-ux';

import { getAuthenticatedUserAccount } from '@/controllers/userSlice';
// import { getSkills } from '@/controllers/taxonomiesSlice';
// import { getPortfolio } from '@/controllers/portfolioSlice';

export interface AccountState {
  accountLoading: boolean;
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
  accountObject: Record<string, any> | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
}

const initialState: AccountState = {
  accountLoading: false,
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
  accountObject: null,
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getAccount = createAsyncThunk(
  'account/getAccount',
  async (_, thunkAPI) => {
    try {
      const accountResponse = await thunkAPI.dispatch(
        getAuthenticatedUserAccount()
      );

      if (
        getAuthenticatedUserAccount.fulfilled.match(accountResponse) &&
        accountResponse.payload
      ) {
        let skills = null;
        // const skillsResponse = await thunkAPI.dispatch(getSkills());

        // if (
        //   getSkills.fulfilled.match(skillsResponse) &&
        //   skillsResponse.payload
        // ) {
        //   skills = skillsResponse.payload;
        // }

        let projects = null;

        const repos = accountResponse.payload?.repos || null;

        if (Array.isArray(repos) && repos.length > 0) {
          const user = new User(accountResponse.payload);

          //   const portfolioResponse =
          //     user.repoQueries && user.repoQueries.length > 0
          //       ? await thunkAPI.dispatch(getPortfolio(user.repoQueries))
          //       : null;

          //   if (
          //     portfolioResponse &&
          //     getPortfolio.fulfilled.match(portfolioResponse) &&
          //     portfolioResponse.payload
          //   ) {
          //     projects = portfolioResponse.payload;
          //   }
        }

        return {
          user: {
            ...accountResponse.payload,
          },
          skills: skills,
          projects: projects,
        };
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const accountSliceOptions: CreateSliceOptions<AccountState> = {
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.fulfilled, (state, action) => {
        state.accountLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.accountObject = action.payload;
      })
      .addMatcher(isAnyOf(getAccount.pending), (state) => {
        state.accountLoading = true;
        state.userErrorMessage = '';
        state.userError = null;
      })
      .addMatcher(isAnyOf(getAccount.rejected), (state, action) => {
        state.accountLoading = false;
        state.userErrorMessage = action.error.message || '';
        state.userError = action.error as Error;
      });
  },
};

export const accountSlice = createSlice(accountSliceOptions);