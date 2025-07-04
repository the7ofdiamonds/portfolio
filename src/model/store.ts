import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@the7ofdiamonds/gateway';

import { aboutSlice } from '@/controllers/aboutSlice.js';
import { accountSlice } from '@/controllers/accountSlice.js';
import { addSlice } from '@/controllers/addSlice.js';
import { databaseSlice } from '@/controllers/databaseSlice.js';
import { githubSlice } from '@/controllers/githubSlice.js';
import { organizationSlice } from '@/controllers/organizationSlice.js';
import { portfolioSlice } from '@/controllers/portfolioSlice.js';
import { projectSlice } from '@/controllers/projectSlice.js';
import { skillsSlice } from '@/controllers/skillsSlice.js';
import { updateSlice } from '@/controllers/updateSlice.js';
import { userSlice } from '@/controllers/userSlice.js';

export const store = configureStore({
  reducer: {
    about: aboutSlice.reducer,
    add: addSlice.reducer,
    portfolio: portfolioSlice.reducer,
    project: projectSlice.reducer,
    github: githubSlice.reducer,
    skills: skillsSlice.reducer,
    update: updateSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
    database: databaseSlice.reducer,
    organization: organizationSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
