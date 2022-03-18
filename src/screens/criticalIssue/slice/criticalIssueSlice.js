import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllCriticalIssue = createAsyncThunk(
  'criticalIssue/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(``)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
const criticalIssueSlice = createSlice({
  name: 'criticalIssue',
  initialState: {
    criticalIssue: [],
    criticalIssueLoading: false,
    criticalIssueError: null,
  },
  reducers: {
    resetCriticalIssue: state => {
      state.criticalIssue = [];
      state.criticalIssueLoading = false;
      state.criticalIssueError = null;
    },
  },
  extraReducers: {
    [fetchAllCriticalIssue.pending]: (state, action) => {
      state.criticalIssueLoading = true;
      state.criticalIssueError = null;
    },
    [fetchAllCriticalIssue.fulfilled]: (state, action) => {
      state.criticalIssue = action.payload;
      state.criticalIssueLoading = false;
      state.criticalIssueError = null;
    },
    [fetchAllCriticalIssue.rejected]: (state, action) => {
      state.criticalIssueLoading = false;
      if (action.payload) {
        state.criticalIssueError = action?.payload?.error?.message;
      } else {
        state.criticalIssueError = action.error;
      }
    },
  },
});

export const {resetCriticalIssue} = criticalIssueSlice.actions;
export default criticalIssueSlice.reducer;
