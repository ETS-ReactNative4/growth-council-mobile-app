import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const searchContentByKey = createAsyncThunk(
  'searchContent/fetchByKey',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/content-library/search `, formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const searchContentSlice = createSlice({
  name: 'searchContent',
  initialState: {
    searchContent: [],
    searchContentLoading: false,
    searchContentError: null,
  },
  reducers: {
    resetSearchContent: state => {
      state.searchContent = [];
      state.searchContentLoading = false;
      state.searchContentError = null;
    },
  },
  extraReducers: {
    [searchContentByKey.pending]: (state, action) => {
      state.searchContentLoading = true;
      state.searchContentError = null;
    },
    [searchContentByKey.fulfilled]: (state, action) => {
      state.searchContent = action.payload;
      state.searchContentLoading = false;
      state.searchContentError = null;
    },
    [searchContentByKey.rejected]: (state, action) => {
      state.searchContentLoading = false;
      if (action.payload) {
        state.searchContentError = action?.payload?.error?.message;
      } else {
        state.searchContentError = action.error;
      }
    },
  },
});

export const {resetSearchContent} = searchContentSlice.actions;
export default searchContentSlice.reducer;
