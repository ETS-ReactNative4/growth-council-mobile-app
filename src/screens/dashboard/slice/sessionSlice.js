import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllsessions = createAsyncThunk(
  'session/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/120/sessions`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessions: [],
    sessionLoading: false,
    sessionError: null,
  },
  reducers: {
    resetsession: state => {
      state.sessions = [];
      state.sessionLoading = false;
      state.sessionError = null;
    },
  },
  extraReducers: {
    [fetchAllsessions.pending]: (state, action) => {
      state.sessionLoading = true;
      state.sessionError = null;
    },
    [fetchAllsessions.fulfilled]: (state, action) => {
      state.sessions = action.payload;
      state.sessionLoading = false;
      state.sessionError = null;
    },
    [fetchAllsessions.rejected]: (state, action) => {
      state.sessionLoading = false;
      if (action.payload) {
        state.sessionError = action.payload.error.message;
      } else {
        state.sessionError = action.error;
      }
    },
  },
});

export const {resetsession} = sessionSlice.actions;
export default sessionSlice.reducer;
