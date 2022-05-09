import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllLatestContent = createAsyncThunk(
  'latestContent/fetchAll',
  (resourceId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/content-library`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const latestContentSlice = createSlice({
  name: 'latestContent',
  initialState: {
    latestContent: [],
    latestContentLoading: false,
    latestContentError: null,
  },
  reducers: {
    resetLatestContent: state => {
      state.latestContent = [];
      state.latestContentLoading = false;
      state.latestContentError = null;
    },
  },
  extraReducers: {
    [fetchAllLatestContent.pending]: (state, action) => {
      state.latestContentLoading = true;
      state.latestContentError = null;
    },
    [fetchAllLatestContent.fulfilled]: (state, action) => {
      state.latestContent = action.payload;
      state.latestContentLoading = false;
      state.latestContentError = null;
    },
    [fetchAllLatestContent.rejected]: (state, action) => {
      state.latestContentLoading = false;
      if (action.payload) {
        state.latestContentError = action?.payload?.error?.message;
      } else {
        state.latestContentError = action.error;
      }
    },
  },
});

export const {resetLatestContent} = latestContentSlice.actions;
export default latestContentSlice.reducer;
