import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllPillarEvents = createAsyncThunk(
  'pillarEvents/fetchAll',
  (poeId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/${poeId}/events`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const pillarEventSlice = createSlice({
  name: 'pillarEvent',
  initialState: {
    pillarEvents: [],
    pillarEventLoading: false,
    pillarEventError: null,
  },
  reducers: {
    resetPillarEvent: state => {
      state.pillarEvents = [];
      state.pillarEventLoading = false;
      state.pillarEventError = null;
    },
  },
  extraReducers: {
    [fetchAllPillarEvents.pending]: (state, action) => {
      state.pillarEventLoading = true;
      state.pillarEventError = null;
    },
    [fetchAllPillarEvents.fulfilled]: (state, action) => {
      state.pillarEvents = action.payload;
      state.pillarEventLoading = false;
      state.pillarEventError = null;
    },
    [fetchAllPillarEvents.rejected]: (state, action) => {
      state.pillarEventLoading = false;
      if (action.payload) {
        state.pillarEventError = action.payload.error.message;
      } else {
        state.pillarEventError = action.error;
      }
    },
  },
});

export const {resetPillarEvent} = pillarEventSlice.actions;
export default pillarEventSlice.reducer;
