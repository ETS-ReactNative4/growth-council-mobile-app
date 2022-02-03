import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchPillarByID = createAsyncThunk(
  'pillar/fetchByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/${identifier}`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const pillarSlice = createSlice({
  name: 'pillar',
  initialState: {
    pillars: [],
    pillarLoading: false,
    pillarError: null,
  },
  reducers: {
    resetPillar: state => {
      state.pillars = [];
      state.pillarLoading = false;
      state.pillarError = null;
    },
  },
  extraReducers: {
    [fetchPillarByID.pending]: (state, action) => {
      state.pillarLoading = true;
      state.pillarError = null;
    },
    [fetchPillarByID.fulfilled]: (state, action) => {
      state.pillars = action.payload;
      state.pillarLoading = false;
      state.pillarError = null;
    },
    [fetchPillarByID.rejected]: (state, action) => {
      state.pillarLoading = false;
      if (action.payload) {
        state.pillarError = action.payload.error.message;
      } else {
        state.pillarError = action.error;
      }
    },
  },
});

export const {resetPillar} = pillarSlice.actions;
export default pillarSlice.reducer;
