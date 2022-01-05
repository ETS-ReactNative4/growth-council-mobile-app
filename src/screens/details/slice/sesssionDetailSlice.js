import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchSessionDetailByID = createAsyncThunk(
  'sessionDetail/fetchByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/sessions/${identifier}`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const sessionDetailSlice = createSlice({
  name: 'sessionDetail',
  initialState: {
    sessionDetails: [],
    sessionDetailLoading: false,
    sessionDetailError: null,
  },
  reducers: {
    resetSessionDetail: state => {
      state.sessionDetails = [];
      state.sessionDetailLoading = false;
      state.sessionDetailError = null;
    },
  },
  extraReducers: {
    [fetchSessionDetailByID.pending]: (state, action) => {
      state.sessionDetailLoading = true;
      state.sessionDetailError = null;
    },
    [fetchSessionDetailByID.fulfilled]: (state, action) => {
      state.sessionDetails = action.payload;
      state.sessionDetailLoading = false;
      state.sessionDetailError = null;
    },
    [fetchSessionDetailByID.rejected]: (state, action) => {
      state.sessionDetailLoading = false;
      if (action.payload) {
        state.sessionDetailError = action.payload.error.message;
      } else {
        state.sessionDetailError = action.error;
      }
    },
  },
});

export const {resetSessionDetail} = sessionDetailSlice.actions;
export default sessionDetailSlice.reducer;
