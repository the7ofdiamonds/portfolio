import { configureStore } from '@reduxjs/toolkit';

import { accountSlice, authSlice } from '@the7ofdiamonds/gateway';

import { addSlice } from '@/controllers/addSlice';
import { databaseSlice } from '@/controllers/databaseSlice';
import { githubSlice } from '@/controllers/githubSlice';
import { organizationSlice } from '@/controllers/organizationSlice';
import { portfolioSlice } from '@/controllers/portfolioSlice';
import { projectSlice } from '@/controllers/projectSlice';
import { skillsSlice } from '@/controllers/skillsSlice';
import { updateSlice } from '@/controllers/updateSlice';
import { userSlice } from '@/controllers/userSlice';

export const store = configureStore({
  reducer: {
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
