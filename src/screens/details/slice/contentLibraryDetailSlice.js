import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllContentLibraryDetails = createAsyncThunk(
  'contentLibraryDetails/fetchAll',
  (id, {rejectWithValue}) => {
    return fetch(`/jwt-auth/v1/content-library/${id}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const contentLibraryDetailsSlice = createSlice({
  name: 'contentLibraryDetails',
  initialState: {
    contentLibraryDetails: [],
    contentLibraryDetailsLoading: false,
    contentLibraryDetailsError: null,
  },
  reducers: {
    resetContentLibraryDetails: state => {
      state.contentLibraryDetails = [];
      state.contentLibraryDetailsLoading = false;
      state.contentLibraryDetailsError = null;
    },
  },
  extraReducers: {
    [fetchAllContentLibraryDetails.pending]: (state, action) => {
      state.contentLibraryDetailsLoading = true;
      state.contentLibraryDetailsError = null;
    },
    [fetchAllContentLibraryDetails.fulfilled]: (state, action) => {
      state.contentLibraryDetails = action.payload;
      state.contentLibraryDetailsLoading = false;
      state.contentLibraryDetailsError = null;
    },
    [fetchAllContentLibraryDetails.rejected]: (state, action) => {
      state.contentLibraryDetailsLoading = false;
      if (action.payload) {
        state.contentLibraryDetailsError = action?.payload?.error?.message;
      } else {
        state.contentLibraryDetailsError = action.error;
      }
    },
  },
});

export const {resetContentLibraryDetails} = contentLibraryDetailsSlice.actions;
export default contentLibraryDetailsSlice.reducer;
