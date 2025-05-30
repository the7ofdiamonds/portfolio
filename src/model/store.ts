import { configureStore } from '@reduxjs/toolkit';

import { aboutSlice } from '@/controllers/aboutSlice.js';
import contactSlice from '@/controllers/contactSlice.js';
import contentSlice from '@/controllers/contentSlice.js';
import { portfolioSlice } from '@/controllers/portfolioSlice.js';
import { projectSlice } from '@/controllers/projectSlice.js';
import githubSlice from '@/controllers/githubSlice.js';
import { skillsSlice } from '@/controllers/skillsSlice.js';
import { userSlice } from '@/controllers/userSlice.js';
import { addSlice } from '@/controllers/addSlice.js';
import { messageSlice } from '@/controllers/messageSlice.js';
import { updateSlice } from '@/controllers/updateSlice.js';
import { authSlice } from '@/controllers/authSlice.js';
import databaseSlice from '@/controllers/databaseSlice.js';
import organizationSlice from '@/controllers/organizationSlice.js';
import accountSlice from '@/controllers/accountSlice.js';

export const store = configureStore({
  reducer: {
    about: aboutSlice.reducer,
    add: addSlice.reducer,
    contact: contactSlice.reducer,
    content: contentSlice.reducer,
    message: messageSlice.reducer,
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
