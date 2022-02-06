import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchPoeSelfLearns = createAsyncThunk(
  'poeSelfLearn/fetchAll',
  (poeId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/poes/${poeId}/self-learns`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const poeSelfLearnSlice = createSlice({
  name: 'poeSelfLearn',
  initialState: {
    poeSelfLearns: [],
    poeSelfLearnLoading: false,
    poeSelfLearnError: null,
  },
  reducers: {
    resetPoeSelfLearn: state => {
      state.poeSelfLearns = [];
      state.poeSelfLearnLoading = false;
      state.poeSelfLearnError = null;
    },
  },
  extraReducers: {
    [fetchPoeSelfLearns.pending]: (state, action) => {
      state.poeSelfLearnLoading = true;
      state.poeSelfLearnError = null;
    },
    [fetchPoeSelfLearns.fulfilled]: (state, action) => {
      state.poeSelfLearns = action.payload;
      state.poeSelfLearnLoading = false;
      state.poeSelfLearnError = null;
    },
    [fetchPoeSelfLearns.rejected]: (state, action) => {
      state.poeSelfLearnLoading = false;
      if (action.payload) {
        state.poeSelfLearnError = action?.payload?.error?.message;
      } else {
        state.poeSelfLearnError = action.error;
      }
    },
  },
});

export const {resetPoeSelfLearn} = poeSelfLearnSlice.actions;
export default poeSelfLearnSlice.reducer;
