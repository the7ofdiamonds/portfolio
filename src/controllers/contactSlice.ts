import type { CreateSliceOptions } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { ContactMethodsObject } from '@the7ofdiamonds/ui-ux';
import { ContactMethods } from '@the7ofdiamonds/ui-ux';

import { getAPI } from '../services/Config';

export type ContactPageObject = {
    title: string | null;
    message: string | null;
};

export class ContactPageProps {
    title: string | null;
    message: string | null;

    constructor(data?: ContactPageObject | Partial<ContactPageObject>) {
        this.title = data?.title ? data.title : null;
        this.message = data?.message ? data.message : null;
    }

    setMessage(message: string) {
        this.message = message;
    }

    toContactPageObject(): ContactPageObject {
        return {
            title: this.title,
            message: this.message,
        };
    }
}

export interface ContactState {
    contactLoading: boolean;
    contactError: Error | null;
    contactErrorMessage: string | null;
    contactSuccessMessage: string | null;
    contacts: ContactMethodsObject | null;
}

const initialState: ContactState = {
    contactLoading: false,
    contactError: null,
    contactErrorMessage: '',
    contactSuccessMessage: '',
    contacts: null,
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
    async (emailMessage: Email) => {
        try {

            // const api = getAPI();

            const api = 'http://localhost:5001/portfolio-bec7d/us-central1';

            console.log(api);
            const response = await fetch(`${api}/contact`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(emailMessage),
            });
            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                throw new Error("Request failed");
            }

            return data;
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
            const api = getAPI();

            const response = api
                ? await fetch(`${api}/content/contact`, {
                    method: 'GET',
                })
                : null;

            const text = response ? await response.text() : null;
            const data = text ? JSON.parse(text) : null;

            if (data) {
                const contactPage = new ContactPageProps(data);

                return contactPage.toContactPageObject();
            }

            return null;
        } catch (error) {
            const err = error as Error;
            console.error(err);
            throw new Error(err.message);
        }
    }
);

export const getContacts = createAsyncThunk(
    'contact/getContacts',
    async (data: ContactMethodsObject, thunkAPI) => {
        try {
            let contacts: ContactMethods | null;

            if (data) {
                contacts = new ContactMethods(data);
            }

            //   const api = getAPI();

            //   const response = api
            //     ? await fetch(`${api}/content/contact`, {
            //       method: 'GET',
            //     })
            //     : null;

            //   const text = response ? await response.text() : null;
            //   const data = text ? JSON.parse(text) : null;

            //   if (data) {
            //     const contactPage = new ContactPageProps(data);

            //     return contactPage.toContactPageObject();
            //   }
            
            // const contactsResponse =
            //         account && account.username
            //           ? await thunkAPI.dispatch(getSocialAccounts(account.username))
            //           : null;
            
            //       if (
            //         account &&
            //         contactsResponse &&
            //         getSocialAccounts.fulfilled.match(contactsResponse) &&
            //         contactsResponse.payload
            //       ) {
            //         account.contactMethods = new ContactMethods();
            //         account.contactMethods.fromGitHub(contactsResponse.payload);
            //       }

            if (!contacts) return null;

            return contacts.toContactMethodsObject();
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
                state.contactErrorMessage = action.payload.error;
                state.contactSuccessMessage = action.payload.success;
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.contactLoading = false;
                state.contactError = (action.error as Error) || null;
                state.contactErrorMessage = action.error.message || '';
            });
    },
};

export const contactSlice = createSlice(contactSliceOptions);
