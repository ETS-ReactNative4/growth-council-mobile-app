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
    entities: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetUploadProfileImage: state => {
      state.entities = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [uploadProfileImage.pending]: (state, action) => {
      state.loading = true;
      state.error = {};
    },
    [uploadProfileImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [uploadProfileImage.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const {resetUploadProfileImage} = uploadProfileImageSlice.actions;

export default uploadProfileImageSlice.reducer;
