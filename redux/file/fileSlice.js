import FileService from '@/services/file';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Initial state
export const uploadFile = createAsyncThunk('file/upload', async (file, name) => {
  const response = await FileService.uploadFile(file, name);
  return response.data.publicPath;
});
const initialState = {
  isLoading: false,
  faviconLoading: false,
  error: null,
  fileLink: null,
  faviconFile: null,
  fileLinks: {}
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    uploadFileRequest(state) {
      state.isLoading = true;
    },
    uploadFileSuccess(state, action) {
      state.isLoading = false;
      state.fileLink = action.payload;
    },
    uploadFavicon(state) {
      state.faviconLoading = true;
    },
    uploadFaviconSuccess(state, action) {
      state.faviconLoading = false;
      state.faviconFile = action.payload;
    },
    uploadFaviconFailed(state, action) {
      state.faviconLoading = false;
      state.error = action.payload;
    },
    uploadFilesSuccess(state, action) {
      state.isLoading = false;
      state.fileLinks = {
        ...state.fileLinks,
        [action.payload.name]: action.payload.data
      };
    },
    uploadFileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUploadedFiles(state, action) {
      state.fileLinks = action.payload;
    },
    clearFileLink(state, action) {
      state.fileLink = null;
      if (action.payload && action.payload.name) {
        state.fileLinks = {
          ...state.fileLinks,
          [action.payload.name]: null
        };
      }
    },
    deleteFileRequest() {},

    deleteUserAvatar(state) {
      state.isLoading = true;
    },
    deleteUserAvatarSuccess(state) {
      state.fileLink = null;
      state.isLoading = false;
    },
    deleteUserAvatarFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanyLogo(state) {
      state.isLoading = true;
    },
    deleteCompanyLogoSuccess(state) {
      state.fileLink = null;
      state.isLoading = false;
    },
    deleteCompanyLogoFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanyFavicon(state) {
      state.isLoading = true;
    },
    deleteCompanyFaviconSuccess(state) {
      state.faviconFile = null;
      state.isLoading = false;
    },
    deleteCompanyFaviconFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFileLinkByProfilePictureRequest(state) {
      state.isLoading = true;
    },
    setFileLinkByCompanyLogoRequest(state) {
      state.isLoading = true;
    },
    setFileLinkByCompanyFaviconRequest(state) {
      state.isLoading = true;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.file
    }),
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.fileLink = action.payload;
    },
    [uploadFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const fileActions = fileSlice.actions;
export default fileSlice.reducer;
