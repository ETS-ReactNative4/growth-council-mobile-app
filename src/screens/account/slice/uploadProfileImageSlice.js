import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const uploadProfileImage = createAsyncThunk(
  'profile_image/upload',
  (formData, {rejectWithValue}) => {
    const {...fields} = formData;
    return store(`/wp/v2/media`, fields)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const uploadProfileImageSlice = createSlice({
  name: 'uploadProfileImage',
  initialState: {
    uploadEntities: [],
    uploadLoading: false,
    uploadError: null,
  },
  reducers: {
    resetUploadProfileImage: state => {
      state.uploadEntities = [];
      state.uploadLoading = false;
      state.uploadError = null;
    },
  },
  extraReducers: {
    [uploadProfileImage.pending]: (state, action) => {
      state.uploadLoading = true;
      state.uploadError = {};
    },
    [uploadProfileImage.fulfilled]: (state, action) => {
      state.uploadLoading = false;
      state.uploadEntities = action.payload;
    },
    [uploadProfileImage.rejected]: (state, action) => {
      state.uploadLoading = false;
      if (action.payload) {
        state.uploadError = action.payload;
      } else {
        state.uploadError = action.error;
      }
    },
  },
});

export const {resetUploadProfileImage} = uploadProfileImageSlice.actions;

export default uploadProfileImageSlice.reducer;
