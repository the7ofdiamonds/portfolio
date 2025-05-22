import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getAPI } from '@/Config';

import { SecureHeaders } from '@/model/SecureHeaders';
import { Gallery, GalleryObject } from '@/model/Gallery';
import { Project } from '@/model/Project';

import { addSecureHeaders } from '@/utilities/Headers';
import { Skills } from '@/model/Skills';
import { ProjectSkills } from '@/model/ProjectSkills';
import { TaskObject } from '@/model/Task';
import { ProjectVersions } from '@/model/ProjectVersions';
import { ProjectURLsDataObject } from '@/model/ProjectURLs';
import { CheckList, CheckListObject } from '@/model/CheckList';
import { Feature, FeatureObject } from '@/model/Feature';
import { Color, ColorObject } from '@/model/Color';
import { ProjectDelivery } from '@/model/ProjectDelivery';

export interface UpdateState {
  updateLoading: boolean;
  updateLoadingMessage: string | null;
  updateSuccessMessage: string | null;
  updateError: Error | null;
  updateErrorMessage: string | null;
  updateStatusCode: number | null;
  updatedDesignCheckList: CheckListObject | null;
  updatedDevelopmentCheckList: CheckListObject | null;
  updatedDeliveryCheckList: CheckListObject | null;
  updatedSolutionGallery: GalleryObject | null;
  updatedDesignGallery: GalleryObject | null;
  updatedDevelopmentGallery: GalleryObject | null;
  updatedDeliveryGallery: GalleryObject | null;
  updatedProblemGallery: GalleryObject | null;
  updatedSkills: Record<string, any> | null;
  updatedProjectSkills: Record<string, any> | null;
  updatedCheckList: Array<Record<string, any>> | null;
  updatedVersionsList: Record<string, any> | null;
  updatedProjectURLs: ProjectURLsDataObject | null;
  updatedFeatures: Array<FeatureObject> | null;
  updatedColors: Array<ColorObject> | null;
}

const initialState: UpdateState = {
  updateLoading: false,
  updateLoadingMessage: null,
  updateSuccessMessage: null,
  updateError: null,
  updateErrorMessage: null,
  updateStatusCode: null,
  updatedDesignCheckList: null,
  updatedDevelopmentCheckList: null,
  updatedDeliveryCheckList: null,
  updatedSolutionGallery: null,
  updatedDesignGallery: null,
  updatedDevelopmentGallery: null,
  updatedDeliveryGallery: null,
  updatedProblemGallery: null,
  updatedSkills: null,
  updatedProjectSkills: null,
  updatedCheckList: null,
  updatedVersionsList: null,
  updatedProjectURLs: null,
  updatedFeatures: null,
  updatedColors: null,
};

export const updateColors = createAsyncThunk(
  'update/updateColors',
  async (colors: Array<Color>) => {
    try {
      return colors.map((color) => color.toColorObject());
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateFeatures = createAsyncThunk(
  'update/updateFeatures',
  async (features: Set<Feature>) => {
    try {
      return Array.from(features).map((feature) => feature.toFeatureObject());
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDesignCheckList = createAsyncThunk(
  'update/updateDesignCheckList',
  async (checkList: CheckList) => {
    try {
      return checkList.toCheckListObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDevelopmentCheckList = createAsyncThunk(
  'update/updateDevelopmentCheckList',
  async (checkList: CheckList) => {
    try {
      return checkList.toCheckListObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDeliveryCheckList = createAsyncThunk(
  'update/updateDeliveryCheckList',
  async (checkList: CheckList) => {
    try {
      console.log(checkList);
      return checkList.toCheckListObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProjectURLs = createAsyncThunk(
  'update/updateProjectURLs',
  async (projectURLs: ProjectURLsDataObject) => {
    try {
      console.log(projectURLs);
      return projectURLs;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateSolutionGallery = createAsyncThunk(
  'update/updateSolutionGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toGalleryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDesignGallery = createAsyncThunk(
  'update/updateDesignGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toGalleryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDevelopmentGallery = createAsyncThunk(
  'update/updateDevelopmentGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toGalleryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDeliveryGallery = createAsyncThunk(
  'update/updateDeliveryGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toGalleryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProblemGallery = createAsyncThunk(
  'update/updateProblemGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toGalleryObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateSolution = createAsyncThunk(
  'update/updateSolution',
  async (data: Record<string, any>) => {
    try {
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const api = getAPI();

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProcess = createAsyncThunk(
  'update/updateProcess',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'update/updateStatus',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDesign = createAsyncThunk(
  'update/updateDesign',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDevelopment = createAsyncThunk(
  'update/updateDevelopment',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDelivery = createAsyncThunk(
  'update/updateDelivery',
  async (project: Project) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${project?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(project.toProjectDataObject()),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProblem = createAsyncThunk(
  'update/updateProblem',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDetails = createAsyncThunk(
  'update/updateDetails',
  async (data: Record<string, any>) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateSkills = createAsyncThunk(
  'update/updateSkills',
  async (skills: Skills) => {
    try {
      return skills.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProjectSkills = createAsyncThunk(
  'update/updateProjectSkills',
  async (skills: ProjectSkills) => {
    try {
      return skills.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateCheckList = createAsyncThunk(
  'update/updateCheckList',
  async (list: Array<TaskObject>) => {
    try {
      return list as Array<Record<string, any>>;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateVersions = createAsyncThunk(
  'update/updateVersions',
  async (versions: ProjectVersions) => {
    try {
      return versions.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'update/updateProject',
  async (project: Project) => {
    try {
      const api = getAPI();

      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/saveProject/${project.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(project.toProjectDataObject()),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      err.stack;
      throw new Error(err.message);
    }
  }
);

const updateSliceOptions: CreateSliceOptions<UpdateState> = {
  name: 'update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateColors.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Colors updated';
      })
      .addCase(updateColors.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedColors = action.payload;
      })
      .addCase(updateFeatures.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Features updated';
      })
      .addCase(updateFeatures.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedFeatures = action.payload;
      })
      .addCase(updateDesignCheckList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Design check list updated';
      })
      .addCase(updateDesignCheckList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedDesignCheckList = action.payload;
      })
      .addCase(updateDevelopmentCheckList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Development check list updated';
      })
      .addCase(updateDevelopmentCheckList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedDevelopmentCheckList = action.payload;
      })
      .addCase(updateDeliveryCheckList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Delivery check list updated';
      })
      .addCase(updateDeliveryCheckList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedDeliveryCheckList = action.payload;
      })
      .addCase(updateProjectURLs.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Project URLs updated';
      })
      .addCase(updateProjectURLs.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedProjectURLs = action.payload;
      })
      .addCase(updateDesignGallery.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Design Gallery updated';
      })
      .addCase(updateDesignGallery.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedDesignGallery = action.payload;
      })
      .addCase(updateCheckList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Check list updated';
      })
      .addCase(updateCheckList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedVersionsList = action.payload;
      })
      .addCase(updateVersions.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Version list updated';
      })
      .addCase(updateVersions.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedVersionsList = action.payload;
      })
      .addCase(updateProjectSkills.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Skills updated';
      })
      .addCase(updateProjectSkills.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedProjectSkills = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Attempting to update the your project...';
      })
      .addCase(updateSolution.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the solution section of your project...';
      })
      .addCase(updateProcess.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the process section of your project...';
      })
      .addCase(updateProblem.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the problem section of your project...';
      })
      .addCase(updateDetails.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the details section of your project...';
      })
      .addMatcher(
        isAnyOf(
          updateProject.fulfilled,
          updateSolution.fulfilled,
          updateProcess.fulfilled,
          updateProblem.fulfilled,
          updateDetails.fulfilled
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateStatusCode = action.payload?.status_code ?? null;
          state.updateErrorMessage = action.payload?.error_message ?? null;
          state.updateSuccessMessage = action.payload?.success_message ?? null;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProject.rejected,
          updateSolution.rejected,
          updateProcess.rejected,
          updateProblem.rejected,
          updateDetails.rejected
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateError = (action.error as Error) || null;
          state.updateErrorMessage = action.error.message || '';
        }
      );
  },
};

const updateSlice = createSlice(updateSliceOptions);

export default updateSlice;
