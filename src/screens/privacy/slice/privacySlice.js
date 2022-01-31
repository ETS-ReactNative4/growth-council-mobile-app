import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchPrivacy = createAsyncThunk(
  'privacy/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/privacy_policy`)
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
    [fetchPrivacy.pending]: (state, action) => {
      state.privacyLoading = true;
      state.privacyError = null;
    },
    [fetchPrivacy.fulfilled]: (state, action) => {
      state.privacy = action.payload;
      state.privacyLoading = false;
      state.privacyError = null;
    },
    [fetchPrivacy.rejected]: (state, action) => {
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
