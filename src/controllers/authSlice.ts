import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  signInWithPopup,
  GithubAuthProvider,
  UserCredential,
  User,
  getAuth,
  signInWithCustomToken,
} from 'firebase/auth';

import { getAPI } from '@/services/Config';

import { SecureHeaders } from '@/model/SecureHeaders';

import { addSecureHeaders } from '@/utilities/Headers';

export type loginState = {
  authLoading: boolean;
  authError: Error | null;
  authSuccessMessage: string | null;
  authErrorMessage: string | null;
  authStatusCode: number | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: Record<string, any> | null;
  id: string | null;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  profileImage: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: loginState = {
  authLoading: false,
  authError: null,
  authSuccessMessage: null,
  authErrorMessage: null,
  authStatusCode: null,
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  id: null,
  username: null,
  email: null,
  phoneNumber: null,
  profileImage: null,
  accessToken: null,
  refreshToken: null,
};

export const checkAdmin = createAsyncThunk('auth/checkAdmin', async () => {
  try {
    const api = getAPI();

    const headers: SecureHeaders = await addSecureHeaders();

    if (headers.errorMessage) {
      return headers;
    }

    const response = await fetch(`${api}/auth/check`, {
      method: 'GET',
      headers:
        headers instanceof SecureHeaders ? new Headers(headers.toObject()) : {},
    });

    const text = await response.text();

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
});

export const updateIsAuthenticated = (authenticated: boolean) => {
  return {
    type: 'auth/updateIsAuthenticated',
    payload: authenticated,
  };
};

export const updateIsAdmin = (admin: boolean) => {
  return {
    type: 'auth/updateIsAdmin',
    payload: admin,
  };
};

export const setIsAuthenticated = createAsyncThunk(
  'auth/setIsAuthenticated',
  async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const authenticated = Boolean(accessToken && refreshToken);

    updateIsAuthenticated(authenticated);

    return authenticated;
  }
);

export const setIsAdmin = createAsyncThunk('login/setIsAdmin', async () => {
  const isAuthenticated = Boolean(localStorage.getItem('is_authenticated'));

  let isAdmin = false;

  const auth = getAuth();

  const user = auth.currentUser;

  if (isAuthenticated && user) {
    try {
      const token = await user.getIdTokenResult();
      isAdmin = Boolean(token.claims?.isAdmin);

      updateIsAdmin(isAdmin);

      return isAdmin;
    } catch (error) {
      console.error('Error retrieving token claims:', error);
    }
  }
});

export const updateAccountID = (id: string) => {
  return {
    type: 'auth/updateAccountID',
    payload: id,
  };
};

export const updateEmail = (email: string) => {
  return {
    type: 'auth/updateEmail',
    payload: email,
  };
};

export const updateUsername = (username: string) => {
  return {
    type: 'auth/updateUsername',
    payload: username,
  };
};

export const updateProfileImage = (profileImage: string) => {
  return {
    type: 'auth/updateProfileImage',
    payload: profileImage,
  };
};

export const updateAccessToken = (access_token: string) => {
  return {
    type: 'auth/updateAccessToken',
    payload: access_token,
  };
};

export const updateRefreshToken = (refresh_token: string) => {
  return {
    type: 'auth/updateRefreshToken',
    payload: refresh_token,
  };
};

export const updateAuthenticatedUser = createAsyncThunk(
  'auth/updateAuthenticatedUser',
  async (user: User, { dispatch }) => {
    try {
      const id = user.uid;
      const accessToken = await user.getIdToken();
      const token = await user.getIdTokenResult();
      const refreshToken = user.refreshToken;
      const username = user.displayName;
      const email = user.email;
      const profileImage = user.photoURL;
      const phoneNumber = user.phoneNumber;
      const isAuthenticated = Boolean(accessToken && refreshToken);
      const isAdmin = Boolean(token?.claims.isAdmin);

      dispatch(updateIsAuthenticated(isAuthenticated));
      dispatch(updateIsAdmin(isAdmin));
      dispatch(updateAccessToken(accessToken));
      dispatch(updateRefreshToken(refreshToken));
      dispatch(updateAccountID(id));

      if (email) {
        dispatch(updateEmail(email));
      }

      if (username) {
        dispatch(updateUsername(username));
      }

      if (profileImage) {
        dispatch(updateProfileImage(profileImage));
      }

      return {
        id: id,
        access_token: accessToken,
        refresh_token: refreshToken,
        username: username,
        email: email,
        phone_number: phoneNumber,
        profile_image: profileImage,
        authenticated: true,
        admin: isAdmin,
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const signInWithGitHubPopup = createAsyncThunk(
  'auth/signInWithGitHubPopup',
  async (_, { dispatch }) => {
    try {
      const auth = getAuth();

      const github = new GithubAuthProvider();

      const response = await signInWithPopup(auth, github);

      return dispatch(updateAuthenticatedUser(response.user)).unwrap();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const auth = getAuth();

    await auth.signOut();

    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone_number');
    localStorage.removeItem('profile_image');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    return 'You have been logged out successfully.';
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, action) => {
      localStorage.setItem('is_authenticated', action.payload);
      state.isAuthenticated = Boolean(localStorage.getItem('is_authenticated'));
    },
    updateIsAdmin: (state, action) => {
      localStorage.setItem('is_admin', action.payload);
      state.isAdmin = Boolean(localStorage.getItem('is_admin'));
    },
    updateAccountID: (state, action) => {
      localStorage.setItem('id', action.payload);
      state.id = localStorage.getItem('id');
    },
    updateEmail: (state, action) => {
      localStorage.setItem('email', action.payload);
      state.email = localStorage.getItem('email');
    },
    updateUsername: (state, action) => {
      localStorage.setItem('username', action.payload);
      state.username = localStorage.getItem('username');
    },
    updateProfileImage: (state, action) => {
      localStorage.setItem('profile_image', action.payload);
      state.profileImage = localStorage.getItem('profile_image');
    },
    updateAccessToken: (state, action) => {
      localStorage.setItem('access_token', action.payload);
      state.accessToken = localStorage.getItem('access_token');
    },
    updateRefreshToken: (state, action) => {
      localStorage.setItem('refresh_token', action.payload);
      state.refreshToken = localStorage.getItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAdmin.fulfilled, (state, action) => {
      state.authLoading = false;
      state.authErrorMessage = '';
      state.authError = null;
      state.user = action.payload;
      state.id = action.payload.id;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phone_number;
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.authenticated;
    });
    builder.addCase(signInWithGitHubPopup.fulfilled, (state, action) => {
      state.authLoading = false;
      state.authErrorMessage = '';
      state.authError = null;
      state.user = action.payload;
      state.id = action.payload.id;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phone_number;
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.authenticated;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.authLoading = false;
      state.authErrorMessage = '';
      state.authError = null;
      state.authSuccessMessage = action.payload;
    });
    builder.addCase(setIsAuthenticated.fulfilled, (state, action) => {
      state.authLoading = false;
      state.authErrorMessage = '';
      state.authError = null;
      state.isAuthenticated = action.payload;
    });
  },
});
