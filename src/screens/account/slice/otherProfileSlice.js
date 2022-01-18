import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchOtherProfileByID = createAsyncThunk(
  'profile/fetchOtherProfileByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users/${identifier}`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const otherProfileSlice = createSlice({
  name: 'otherProfile',
  initialState: {
    otherProfile: [],
    otherProfileLoading: false,
    otherProfileError: null,
  },
  reducers: {
    resetProfile: state => {
      state.otherProfile = [];
      state.otherProfileLoading = false;
      state.otherProfileError = null;
    },
  },
  extraReducers: {
    [fetchOtherProfileByID.pending]: (state, action) => {
      state.otherprofileLoading = true;
      state.otherprofileError = null;
    },
    [fetchOtherProfileByID.fulfilled]: (state, action) => {
      state.otherprofile = action.payload;
      state.otherprofileLoading = false;
      state.otherprofileError = null;
    },
    [fetchOtherProfileByID.rejected]: (state, action) => {
      state.otherprofileLoading = false;
      if (action.payload) {
        state.otherprofileError = action.payload.error.message;
      } else {
        state.otherprofileError = action.error;
      }
    },
  },
});

export const {resetProfile} = otherProfileSlice.actions;
export default otherProfileSlice.reducer;
