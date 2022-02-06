import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchSelfLearnById = createAsyncThunk(
  'selfLearn/fetchAll',
  (selfLearnId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/self-learns/${selfLearnId}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const selfLearnSlice = createSlice({
  name: 'selfLearn',
  initialState: {
    selfLearns: [],
    selfLearnLoading: false,
    selfLearnError: null,
  },
  reducers: {
    resetSelfLearnById: state => {
      state.selfLearns = [];
      state.selfLearnLoading = false;
      state.selfLearnError = null;
    },
  },
  extraReducers: {
    [fetchSelfLearnById.pending]: (state, action) => {
      state.selfLearnLoading = true;
      state.selfLearnError = null;
    },
    [fetchSelfLearnById.fulfilled]: (state, action) => {
      state.selfLearns = action.payload;
      state.selfLearnLoading = false;
      state.selfLearnError = null;
    },
    [fetchSelfLearnById.rejected]: (state, action) => {
      state.selfLearnLoading = false;
      if (action.payload) {
        state.selfLearnError = action?.payload?.error?.message;
      } else {
        state.selfLearnError = action.error;
      }
    },
  },
});

export const {resetSelfLearnById} = selfLearnSlice.actions;
export default selfLearnSlice.reducer;
