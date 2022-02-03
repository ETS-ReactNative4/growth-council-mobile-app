import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchcoachingSession = createAsyncThunk(
  'coachingSession/fetchAll',
  (poeId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/${poeId}/sessions`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const coachingSessionSlice = createSlice({
  name: 'coachingSession',
  initialState: {
    coachingSession: [],
    coachingSessionLoading: false,
    coachingSessionError: null,
  },
  reducers: {
    resetcoachingSession: state => {
      state.coachingSession = [];
      state.coachingSessionLoading = false;
      state.coachingSessionError = null;
    },
  },
  extraReducers: {
    [fetchcoachingSession.pending]: (state, action) => {
      state.coachingSessionLoading = true;
      state.coachingSessionError = null;
    },
    [fetchcoachingSession.fulfilled]: (state, action) => {
      state.coachingSession = action.payload;
      state.coachingSessionLoading = false;
      state.coachingSessionError = null;
    },
    [fetchcoachingSession.rejected]: (state, action) => {
      state.coachingSessionLoading = false;
      if (action.payload) {
        state.coachingSessionError = action.payload.error.message;
      } else {
        state.coachingSessionError = action.error;
      }
    },
  },
});

export const {resetcoachingSession} = coachingSessionSlice.actions;
export default coachingSessionSlice.reducer;
