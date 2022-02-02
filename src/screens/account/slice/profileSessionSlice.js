import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchSessionsByUserID = createAsyncThunk(
  'profileSession/fetchAllByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users/${identifier}/sessions`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const profileSessionSlice = createSlice({
  name: 'profileSession',
  initialState: {
    profileSession: [],
    profileSessionLoading: false,
    profileSessionError: null,
  },
  reducers: {
    resetprofileSession: state => {
      state.profileSession = [];
      state.profileSessionLoading = false;
      state.profileSessionError = null;
    },
  },
  extraReducers: {
    [fetchSessionsByUserID.pending]: (state, action) => {
      state.profileSessionLoading = true;
      state.profileSessionError = null;
    },
    [fetchSessionsByUserID.fulfilled]: (state, action) => {
      state.profileSession = action.payload;
      state.profileSessionLoading = false;
      state.profileSessionError = null;
    },
    [fetchSessionsByUserID.rejected]: (state, action) => {
      state.profileSessionLoading = false;
      if (action.payload) {
        state.profileSessionError = action.payload.error.message;
      } else {
        state.profileSessionError = action.error;
      }
    },
  },
});

export const {resetprofileSession} = profileSessionSlice.actions;
export default profileSessionSlice.reducer;
