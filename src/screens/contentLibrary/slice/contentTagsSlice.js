import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllContentTags = createAsyncThunk(
  'contentTags/fetchAll',
  (resourceId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/content-library/resources/${resourceId}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const contentTagsSlice = createSlice({
  name: 'contentTags',
  initialState: {
    contentTags: [],
	contentTagsLoading: false,
    contentTagsError: null,
  },
  reducers: {
    resetcontentTags: state => {
      state.contentTags = [];
      state.contentTagsLoading = false;
      state.contentTagsError = null;
    },
  },
  extraReducers: {
    [fetchAllContentTags.pending]: (state, action) => {
      state.contentTagsLoading = true;
      state.contentTagsError = null;
    },
    [fetchAllContentTags.fulfilled]: (state, action) => {
      state.contentTags = action.payload;
      state.contentTagsLoading = false;
      state.contentTagsError = null;
    },
    [fetchAllContentTags.rejected]: (state, action) => {
      state.contentTagsLoading = false;
      if (action.payload) {
        state.contentTagsError = action?.payload?.error?.message;
      } else {
        state.contentTagsError = action.error;
      }
    },
  },
});

export const {resetcontentTags} = contentTagsSlice.actions;
export default contentTagsSlice.reducer;
