import {
  CreateSliceOptions,
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';

import { Taxonomy } from '@the7ofdiamonds/ui-ux';

import { getDB } from '@/Config';

import {
  Framework,
  Language,
  ProjectType,
  ProjectTypeObject,
  Service,
  TaxonomyObject,
  Technology,
} from '@/model/Taxonomy';
import { Image } from '@/model/Image';
import { SkillsObject } from '@/model/Skills';

export type TaxImageQuery = {
  id: string;
  type: string;
};

export interface TaxonomiesState {
  taxonomiesLoading: boolean;
  taxonomiesError: Error | null;
  taxonomiesErrorMessage: string;
  taxonomiesStatusCode: string;
  projectTypesObject: Array<ProjectTypeObject>;
  projectTypeObject: Record<string, any> | null;
  languagesObject: Array<Record<string, any>>;
  languageObject: Record<string, any> | null;
  frameworksObject: Array<Record<string, any>>;
  frameworkObject: Record<string, any> | null;
  technologiesObject: Array<Record<string, any>>;
  technologyObject: Record<string, any> | null;
  skillsObject: Record<string, any> | null;
}

const initialState: TaxonomiesState = {
  taxonomiesLoading: false,
  taxonomiesError: null,
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
  projectTypesObject: [],
  projectTypeObject: null,
  languagesObject: [],
  languageObject: null,
  frameworksObject: [],
  frameworkObject: null,
  technologiesObject: [],
  technologyObject: null,
  skillsObject: null,
};

const getTaxonomy = (type: string, doc: DocumentData) => {
  let data = doc.data();
  let taxonomy = new Taxonomy({
    id: doc.id,
    type: type,
    title: data?.title,
    icon_url: data?.icon_url,
    class_name: data?.class_name,
  });

  return taxonomy.toTaxonomyObject();
};

export const getTaxImage = createAsyncThunk(
  'taxonomies/getTaxImage',
  async (query: TaxImageQuery) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const docRef: DocumentReference<unknown, DocumentData> = doc(
        collection(db, query.type),
        query.id
      );
      const images = (await getDoc(docRef)) as Record<string, any>;

      return images;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTaxImages = createAsyncThunk<
  Array<Record<string, any>>,
  { type: string; taxonomies: Array<Record<string, any>> }
>('taxonomies/getTaxImages', async ({ type, taxonomies }) => {
  try {
    const db = getDB();

    if (!db) {
      throw new Error('Database is not initialized');
    }

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, type)
    );

    let updatedTaxonomies: Array<TaxonomyObject> = [];

    querySnapshot.forEach((doc: DocumentData) => {
      let data = doc.data();

      taxonomies.forEach((taxonomy) => {
        if (taxonomy.id === doc.id) {
          let tax = new Taxonomy(taxonomy);
          updatedTaxonomies.push(tax.toTaxonomyObject());
        }
      });
    });

    return updatedTaxonomies;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getProjectTypes = createAsyncThunk(
  'taxonomies/getProjectTypes',
  async () => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'project_types';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let projectTypes: Array<ProjectTypeObject> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);
        projectTypes.push(taxonomy);
      });

      return projectTypes;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getLanguages = createAsyncThunk(
  'taxonomies/getLanguages',
  async () => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'languages';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let languages: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        languages.push(taxonomy);
      });

      return languages;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getFrameworks = createAsyncThunk(
  'taxonomies/getFrameworks',
  async () => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'frameworks';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let frameworks: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        frameworks.push(taxonomy);
      });

      return frameworks;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTechnologies = createAsyncThunk(
  'taxonomies/getTechnologies',
  async () => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'technologies';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let technologies: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        technologies.push(taxonomy);
      });

      return technologies;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectType = createAsyncThunk(
  'taxonomies/getProjectType',
  async (projectType: string) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'project_types';
      const projectTypeCollection = collection(db, type);
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        projectTypeCollection,
        projectType
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getLanguage = createAsyncThunk(
  'taxonomies/getLanguage',
  async (language: string) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'languages';
      const languageCollection = collection(db, type);
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        languageCollection,
        language
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getFramework = createAsyncThunk(
  'taxonomies/getFramework',
  async (framework: string) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'project_types';
      const frameworkCollection = collection(db, 'frameworks');
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        frameworkCollection,
        framework
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTechnology = createAsyncThunk(
  'taxonomies/getTechnology',
  async (technology: string) => {
    try {
      const db = getDB();

      if (!db) {
        throw new Error('Database is not initialized');
      }

      const type = 'project_types';
      const technologyCollection = collection(db, 'technologies');
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        technologyCollection,
        technology
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getSkills = createAsyncThunk(
  'taxonomies/getSkills',
  async (_, thunkAPI) => {
    try {
      let types: Array<Record<string, any>> = [];
      let languages: Array<Record<string, any>> = [];
      let frameworks: Array<Record<string, any>> = [];
      let technologies: Array<Record<string, any>> = [];

      const typesResponse = await thunkAPI.dispatch(getProjectTypes());

      if (
        getProjectTypes.fulfilled.match(typesResponse) &&
        typesResponse.payload
      ) {
        types = typesResponse.payload;
      }

      const languagesResponse = await thunkAPI.dispatch(getLanguages());

      if (
        getLanguages.fulfilled.match(languagesResponse) &&
        languagesResponse.payload
      ) {
        languages = languagesResponse.payload;
      }

      const frameworksResponse = await thunkAPI.dispatch(getFrameworks());

      if (
        getFrameworks.fulfilled.match(frameworksResponse) &&
        frameworksResponse.payload
      ) {
        frameworks = frameworksResponse.payload;
      }

      const technologiesResponse = await thunkAPI.dispatch(getTechnologies());

      if (
        getTechnologies.fulfilled.match(technologiesResponse) &&
        technologiesResponse.payload
      ) {
        technologies = technologiesResponse.payload;
      }

      return {
        types: types,
        languages: languages,
        frameworks: frameworks,
        technologies: technologies,
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const taxonomiesSliceOptions: CreateSliceOptions<TaxonomiesState> = {
  name: 'taxonomies',
  initialState,
  reducers: {
    setPortfolioSkills: (state, action: PayloadAction<Record<string, any>>) => {
      const serializeSkills = (skills: Record<string, any>): SkillsObject => {
        return {
          types: skills.types.map((item: Record<string, any>) =>
            new ProjectType(item).toTaxonomyObject()
          ),
          languages: skills.languages.map((item: Record<string, any>) =>
            new Language(item).toTaxonomyObject()
          ),
          frameworks: skills.frameworks.map((item: Record<string, any>) =>
            new Framework(item).toTaxonomyObject()
          ),
          technologies: skills.technologies.map((item: Record<string, any>) =>
            new Technology(item).toTaxonomyObject()
          ),
          services: skills.services.map((item: Record<string, any>) =>
            new Service(item).toTaxonomyObject()
          ),
        };
      };

      state.skillsObject = serializeSkills(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectTypes.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.projectTypesObject = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.languagesObject = action.payload;
      })
      .addCase(getFrameworks.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.frameworksObject = action.payload;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technologiesObject = action.payload;
      })
      .addCase(getProjectType.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.projectTypeObject = action.payload;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.languageObject = action.payload;
      })
      .addCase(getFramework.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.frameworkObject = action.payload;
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technologyObject = action.payload;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.skillsObject = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getProjectTypes.pending,
          getFrameworks.pending,
          getTechnologies.pending,
          getProjectType.pending,
          getLanguage.pending,
          getFramework.pending,
          getTechnology.pending,
          getSkills.pending
        ),
        (state) => {
          state.taxonomiesLoading = true;
          state.taxonomiesError = null;
          state.taxonomiesErrorMessage = '';
          state.taxonomiesStatusCode = '';
        }
      )
      .addMatcher(
        isAnyOf(
          getProjectTypes.rejected,
          getFrameworks.rejected,
          getTechnologies.rejected,
          getProjectType.rejected,
          getLanguage.rejected,
          getFramework.rejected,
          getTechnology.rejected,
          getSkills.rejected
        ),
        (state, action) => {
          state.taxonomiesLoading = false;
          state.taxonomiesError = action.error as Error;
          state.taxonomiesErrorMessage = action.error.message || '';
          state.taxonomiesStatusCode = action.error.code || '';
        }
      );
  },
};

export const taxonomiesSlice = createSlice(taxonomiesSliceOptions);
export const { setPortfolioSkills } = taxonomiesSlice.actions;
