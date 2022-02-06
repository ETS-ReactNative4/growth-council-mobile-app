import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/feedback`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedback: [],
    feedbackLoading: false,
    feedbackError: null,
  },
  reducers: {
    resetFeedback: state => {
      state.feedback = [];
      state.feedbackLoading = false;
      state.feedbackError = null;
    },
  },
  extraReducers: {
    [fetchFeedbacks.pending]: (state, action) => {
      state.feedbackLoading = true;
      state.feedbackError = null;
    },
    [fetchFeedbacks.fulfilled]: (state, action) => {
      state.feedback = action.payload;
      state.feedbackLoading = false;
      state.feedbackError = null;
    },
    [fetchFeedbacks.rejected]: (state, action) => {
      state.feedbackLoading = false;
      if (action.payload) {
        state.feedbackError = action?.payload?.error?.message;
      } else {
        state.feedbackError = action.error;
      }
    },
  },
});

export const {resetFeedback} = feedbackSlice.actions;
export default feedbackSlice.reducer;
