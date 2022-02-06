import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchOtherProfileByID = createAsyncThunk(
  'profile/fetchProfileByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users/${identifier}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const otherProfileSlice = createSlice({
  name: 'otherProfile',
  initialState: {
    otherProfiles: [],
    otherProfileLoading: false,
    otherProfileError: null,
  },
  reducers: {
    resetProfile: state => {
      state.otherProfiles = [];
      state.otherProfileLoading = false;
      state.otherProfileError = null;
    },
  },
  extraReducers: {
    [fetchOtherProfileByID.pending]: (state, action) => {
      state.otherProfileLoading = true;
      state.otherProfileError = null;
    },
    [fetchOtherProfileByID.fulfilled]: (state, action) => {
      state.otherProfiles = action.payload;
      state.otherProfileLoading = false;
      state.otherProfileError = null;
    },
    [fetchOtherProfileByID.rejected]: (state, action) => {
      state.otherProfileLoading = false;
      if (action.payload) {
        state.otherProfileError = action?.payload?.error?.message;
      } else {
        state.otherProfileError = action.error;
      }
    },
  },
});

export const {resetProfile} = otherProfileSlice.actions;
export default otherProfileSlice.reducer;
