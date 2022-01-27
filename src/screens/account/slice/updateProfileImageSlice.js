import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const updateProfileImage = createAsyncThunk(
  'profile_image/update',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/users/profile/image`)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const updateProfileImageSlice = createSlice({
  name: 'updateProfileImage',
  initialState: {
    entities: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetUpdateProfileImage: state => {
      state.entities = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [updateProfileImage.pending]: (state, action) => {
      state.loading = true;
      state.error = {};
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [updateProfileImage.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const {resetUpdateProfileImage} = updateProfileImageSlice.actions;

export default updateProfileImageSlice.reducer;
