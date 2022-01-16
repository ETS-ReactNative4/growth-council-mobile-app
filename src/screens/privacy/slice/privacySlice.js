import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchPrivacyPolicy = createAsyncThunk(
  'feedback/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/4980`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const privacySlice = createSlice({
  name: 'privacy',
  initialState: {
    privacy: [],
    privacyLoading: false,
    privacyError: null,
  },
  reducers: {
    resetPrivacy: state => {
      state.privacy = [];
      state.privacyLoading = false;
      state.privacyError = null;
    },
  },
  extraReducers: {
    [fetchPrivacyPolicy.pending]: (state, action) => {
      state.privacyLoading = true;
      state.privacyError = null;
    },
    [fetchPrivacyPolicy.fulfilled]: (state, action) => {
      state.privacy = action.payload;
      state.privacyLoading = false;
      state.privacyError = null;
    },
    [fetchPrivacyPolicy.rejected]: (state, action) => {
      state.privacyLoading = false;
      if (action.payload) {
        state.privacyError = action.payload.error.message;
      } else {
        state.privacyError = action.error;
      }
    },
  },
});

export const {resetPrivacy} = privacySlice.actions;
export default privacySlice.reducer;
