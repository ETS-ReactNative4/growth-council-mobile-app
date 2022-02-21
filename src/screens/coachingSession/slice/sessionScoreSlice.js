import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const submitSessionScores = createAsyncThunk(
  'sessionSubmit/submitSessionByID',
  (sessionId, score, {rejectWithValue}) => {
    return store(`jwt-auth/v1/sessions/${sessionId}/score`, score)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const SessionScoreSlice = createSlice({
  name: 'sessionScore',
  initialState: {
    sessionScore: [],
    sessionScoreLoading: false,
    sessionScoreError: null,
  },
  reducers: {
    resetSessionScores: state => {
      state.sessionScore = [];
      state.sessionScoreLoading = false;
      state.sessionScoreError = null;
    },
  },
  extraReducers: {
    [submitSessionScores.pending]: (state, action) => {
      state.sessionScoreLoading = true;
      state.sessionScoreError = null;
    },
    [submitSessionScores.fulfilled]: (state, action) => {
      state.sessionScore = action.payload;
      state.sessionScoreLoading = false;
      state.sessionScoreError = null;
    },
    [submitSessionScores.rejected]: (state, action) => {
      state.sessionScoreLoading = false;
      if (action.payload) {
        state.sessionScoreError = action?.payload?.error?.message;
      } else {
        state.sessionScoreError = action.error;
      }
    },
  },
});

export const {resetSessionScores} = SessionScoreSlice.actions;
export default SessionScoreSlice.reducer;
