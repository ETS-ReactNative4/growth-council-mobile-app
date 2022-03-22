import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllContent = createAsyncThunk(
  'content/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/content-library/resources`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: [],
    contentLoading: false,
    contentError: null,
  },
  reducers: {
    resetContent: state => {
      state.content = [];
      state.contentLoading = false;
      state.contentError = null;
    },
  },
  extraReducers: {
    [fetchAllContent.pending]: (state, action) => {
      state.contentLoading = true;
      state.contentError = null;
    },
    [fetchAllContent.fulfilled]: (state, action) => {
      state.content = action.payload;
      state.contentLoading = false;
      state.contentError = null;
    },
    [fetchAllContent.rejected]: (state, action) => {
      state.contentLoading = false;
      if (action.payload) {
        state.contentError = action?.payload?.error?.message;
      } else {
        state.contentError = action.error;
      }
    },
  },
});

export const {resetContent} = contentSlice.actions;
export default contentSlice.reducer;
