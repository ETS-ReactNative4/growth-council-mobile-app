import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchcoachingSessionByUserID = createAsyncThunk(
  'coachingSession/fetchAllByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`/jwt-auth/v1/pillars/120/sessions`)
      	.then(response => response.data.body_response)
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
    [fetchcoachingSessionByUserID.pending]: (state, action) => {
      state.coachingSessionLoading = true;
      state.coachingSessionError = null;
    },
    [fetchcoachingSessionByUserID.fulfilled]: (state, action) => {
      state.coachingSession = action.payload;
      state.coachingSessionLoading = false;
      state.coachingSessionError = null;
    },
    [fetchcoachingSessionByUserID.rejected]: (state, action) => {
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
