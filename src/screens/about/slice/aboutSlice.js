import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAbouts = createAsyncThunk(
  'about/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/about`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    about: [],
    aboutLoading: false,
    aboutError: null,
  },
  reducers: {
    resetAbout: state => {
      state.about = [];
      state.aboutLoading = false;
      state.aboutError = null;
    },
  },
  extraReducers: {
    [fetchAbouts.pending]: (state, action) => {
      state.aboutLoading = true;
      state.aboutError = null;
    },
    [fetchAbouts.fulfilled]: (state, action) => {
      state.about = action.payload;
      state.aboutLoading = false;
      state.aboutError = null;
    },
    [fetchAbouts.rejected]: (state, action) => {
      state.aboutLoading = false;
      if (action.payload) {
        state.aboutError = action?.payload?.error?.message;
      } else {
        state.aboutError = action.error;
      }
    },
  },
});

export const {resetAbout} = aboutSlice.actions;
export default aboutSlice.reducer;
