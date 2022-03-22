import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllContentLibrary = createAsyncThunk(
  'contentLibrary/fetchAll',
  (resourceId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/content-library/resources/${resourceId}/sub-resources`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const contentLibrarySlice = createSlice({
  name: 'content',
  initialState: {
    contentLibrary: [],
    contentLibraryLoading: false,
    contentLibraryError: null,
  },
  reducers: {
    resetContentLibrary: state => {
      state.contentLibrary = [];
      state.contentLibraryLoading = false;
      state.contentLibraryError = null;
    },
  },
  extraReducers: {
    [fetchAllContentLibrary.pending]: (state, action) => {
      state.contentLibraryLoading = true;
      state.contentLibraryError = null;
    },
    [fetchAllContentLibrary.fulfilled]: (state, action) => {
      state.contentLibrary = action.payload;
      state.contentLibraryLoading = false;
      state.contentLibraryError = null;
    },
    [fetchAllContentLibrary.rejected]: (state, action) => {
      state.contentLibraryLoading = false;
      if (action.payload) {
        state.contentLibraryError = action?.payload?.error?.message;
      } else {
        state.contentLibraryError = action.error;
      }
    },
  },
});

export const {resetContentLibrary} = contentLibrarySlice.actions;
export default contentLibrarySlice.reducer;
