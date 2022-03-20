import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllLibraryDetails = createAsyncThunk(
  'libraryDetails/fetchAll',
  (resourceId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/content-library/resources/${resourceId}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const libraryDetailsSlice = createSlice({
  name: 'libraryDetails',
  initialState: {
    libraryDetails: [],
    libraryDetailsLoading: false,
    libraryDetailsError: null,
  },
  reducers: {
    resetLibraryDetails: state => {
      state.libraryDetails = [];
      state.libraryDetailsLoading = false;
      state.libraryDetailsError = null;
    },
  },
  extraReducers: {
    [fetchAllLibraryDetails.pending]: (state, action) => {
      state.libraryDetailsLoading = true;
      state.libraryDetailsError = null;
    },
    [fetchAllLibraryDetails.fulfilled]: (state, action) => {
      state.libraryDetails = action.payload;
      state.libraryDetailsLoading = false;
      state.libraryDetailsError = null;
    },
    [fetchAllLibraryDetails.rejected]: (state, action) => {
      state.libraryDetailsLoading = false;
      if (action.payload) {
        state.libraryDetailsError = action?.payload?.error?.message;
      } else {
        state.libraryDetailsError = action.error;
      }
    },
  },
});

export const {resetLibraryDetails} = libraryDetailsSlice.actions;
export default libraryDetailsSlice.reducer;
