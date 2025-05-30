import {
  CreateSliceOptions,
  createSlice,
  createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';

import { Taxonomy } from '@/model/Taxonomy';
import { Skill, SkillObject } from '@/model/Skill';
import { Skills, SkillsObject } from '@/model/Skills';
import { SecureHeaders } from '@/model/SecureHeaders';

import { addSecureHeaders } from '@/utilities/Headers';

import { getAPI } from '@/services/Config';

export interface SkillsState {
  skillsLoading: boolean;
  skillsError: Error | null;
  skillsErrorMessage: string | null;
  skillsStatusCode: number | string | null;
  skillsSuccessMessage: string | null;
  skillID: string | null;
  taxType: string | null;
  skillObject: SkillObject | null;
  skillsType: Array<SkillObject> | null;
  skillsObject: SkillsObject | null;
}

const initialState: SkillsState = {
  skillsLoading: false,
  skillsError: null,
  skillsErrorMessage: null,
  skillsStatusCode: null,
  skillsSuccessMessage: null,
  skillID: null,
  taxType: null,
  skillObject: null,
  skillsType: null,
  skillsObject: null,
};

type AddSkillResponse = {
  status_code: number | null;
  success_message: string | null;
  id: string | null;
  type: string | null;
  error_message: string | null;
};

export const addSkill = createAsyncThunk(
  'skills/addSkill',
  async (taxonomy: Taxonomy) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized.');
      }

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        throw new Error(`Failed to add skill: ${headers.errorMessage}`);
      }

      const response = await fetch(`${api}/taxonomies/skills`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(taxonomy),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add skill: ${response.status} ${response.statusText}`
        );
      }

      const text = await response.text();
      const data: AddSkillResponse = JSON.parse(text);

      return data;
    } catch (error) {
      const err = error as Error;
      console.error('Add skill error:', err);
      throw new Error(
        err?.message || 'Unknown error occurred while adding skill.'
      );
    }
  }
);

export const getSkill = createAsyncThunk(
  'skills/getSkill',
  async (taxonomy: Taxonomy) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized.');
      }

      const response = await fetch(
        `${api}/taxonomies/skills/${taxonomy.type}/${taxonomy.id}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get skill: ${response.status} ${response.statusText}`
        );
      }

      const text = await response.text();
      const data: SkillObject = JSON.parse(text);
      const skill = new Skill(data);

      return skill.toSkillObject();
    } catch (error) {
      const err = error as Error;
      console.error('Get skill error:', err);
      throw new Error(
        err?.message || 'Unknown error occurred while getting skill.'
      );
    }
  }
);

export const getSkillType = createAsyncThunk(
  'skills/getSkillType',
  async (type: string) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized.');
      }

      const response = await fetch(`${api}/taxonomies/skills/${type}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(
          `Failed to get skill: ${response.status} ${response.statusText}`
        );
      }

      const text = await response.text();
      const skills: Array<SkillObject> = JSON.parse(text);

      return skills.map((skill) => new Skill(skill).toSkillObject());
    } catch (error) {
      const err = error as Error;
      console.error('Get skill error:', err);
      throw new Error(
        err?.message || 'Unknown error occurred while getting skill.'
      );
    }
  }
);

export const getSkills = createAsyncThunk('skills/getSkills', async () => {
  try {
    const api = getAPI();

    if (!api) {
      throw new Error('API is not initialized.');
    }

    const response = await fetch(`${api}/taxonomies/skills`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get skills: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();
    const data: SkillsObject = JSON.parse(text);
    const skills = new Skills(data);

    return skills.toSkillsObject();
  } catch (error) {
    const err = error as Error;
    console.error('Get skills error:', err);
    throw new Error(
      err?.message || 'Unknown error occurred while getting skills.'
    );
  }
});

type UpdateSkillResponse = {
  status_code: number | null;
  success_message: string | null;
  id: string | null;
  error_message: string | null;
};

export const updateSkill = createAsyncThunk(
  'skills/getSkills',
  async (taxonomy: Taxonomy) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized.');
      }

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        throw new Error(`Failed to add skill: ${headers.errorMessage}`);
      }

      const response = await fetch(
        `${api}/taxonomies/skills/${taxonomy.type}/${taxonomy.id}`,
        {
          method: 'PUT',
          headers:
            headers instanceof SecureHeaders
              ? new Headers(headers.toObject())
              : {},
          body: JSON.stringify(taxonomy),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update skill: ${response.status} ${response.statusText}`
        );
      }

      const text = await response.text();
      const data: UpdateSkillResponse = JSON.parse(text);

      return data;
    } catch (error) {
      const err = error as Error;
      console.error('Update skill error:', err);
      throw new Error(
        err?.message || 'Unknown error occurred while updating skill.'
      );
    }
  }
);

type DeleteSkillResponse = {
  status_code: number | null;
  success_message: string | null;
  error_message: string | null;
};

export const deleteSkill = createAsyncThunk(
  'skills/deleteSkill',
  async (taxonomy: Taxonomy) => {
    try {
      const api = getAPI();

      if (!api) {
        throw new Error('API is not initialized.');
      }

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        throw new Error(`Failed to add skill: ${headers.errorMessage}`);
      }

      const response = await fetch(
        `${api}/taxonomies/skills/${taxonomy.type}/${taxonomy.id}`,
        {
          method: 'DELETE',
          headers:
            headers instanceof SecureHeaders
              ? new Headers(headers.toObject())
              : {},
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete skill: ${response.status} ${response.statusText}`
        );
      }

      const text = await response.text();
      const data: DeleteSkillResponse = JSON.parse(text);

      return data;
    } catch (error) {
      const err = error as Error;
      console.error('Delete skill error:', err);
      throw new Error(
        err?.message || 'Unknown error occurred while deleting skill.'
      );
    }
  }
);

const skillsSliceOptions: CreateSliceOptions<SkillsState> = {
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsStatusCode = action.payload.status_code ?? null;
        state.skillsSuccessMessage = action.payload.success_message ?? null;
        state.skillID = action.payload.id ?? null;
        state.taxType = action.payload.type ?? null;
        state.skillsErrorMessage = action.payload.error_message ?? null;
      })
      .addCase(getSkill.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsErrorMessage = null;
        state.skillObject = action.payload;
      })
      .addCase(getSkillType.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsErrorMessage = null;
        state.skillsType = action.payload;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsErrorMessage = null;
        state.skillsObject = action.payload;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsErrorMessage = null;
        state.skillsStatusCode = action.payload.status_code;
        state.skillsSuccessMessage = action.payload.success_message;
        state.skillsErrorMessage = action.payload.error_message;
        state.skillID = action.payload.id;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = null;
        state.skillsStatusCode = action.payload.status_code;
        state.skillsSuccessMessage = action.payload.success_message;
        state.skillsErrorMessage = action.payload.error_message;
      })
      .addMatcher(
        isAnyOf(
          addSkill.pending,
          getSkill.pending,
          getSkills.pending,
          updateSkill.pending,
          deleteSkill.pending
        ),
        (state) => {
          state.skillsLoading = true;
          state.skillsError = null;
          state.skillsErrorMessage = null;
          state.skillsStatusCode = null;
          state.skillsSuccessMessage = null;
          state.skillID = null;
          state.taxType = null;
          state.skillObject = null;
          state.skillsObject = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addSkill.rejected,
          getSkill.rejected,
          getSkills.rejected,
          updateSkill.rejected,
          deleteSkill.rejected
        ),
        (state, action) => {
          state.skillsLoading = false;
          state.skillsError = action.error as Error;
          state.skillsErrorMessage = action.error.message || '';
          state.skillsStatusCode = action.error.code || null;
        }
      );
  },
};

export const skillsSlice = createSlice(skillsSliceOptions);
