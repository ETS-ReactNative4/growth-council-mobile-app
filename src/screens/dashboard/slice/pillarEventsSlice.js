import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllpillarEvents = createAsyncThunk(
  'pillarEvents/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/119/events`)
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
    resetpillarEvent: state => {
      state.pillarEvents = [];
      state.pillarEventLoading = false;
      state.pillarEventError = null;
    },
  },
  extraReducers: {
    [fetchAllpillarEvents.pending]: (state, action) => {
      state.pillarEventLoading = true;
      state.pillarEventError = null;
    },
    [fetchAllpillarEvents.fulfilled]: (state, action) => {
      state.pillarEvents = action.payload;
      state.pillarEventLoading = false;
      state.pillarEventError = null;
    },
    [fetchAllpillarEvents.rejected]: (state, action) => {
      state.pillarEventLoading = false;
      if (action.payload) {
        state.pillarEventError = action.payload.error.message;
      } else {
        state.pillarEventError = action.error;
      }
    },
  },
});

export const {resetpillarEvent} = pillarEventSlice.actions;
export default pillarEventSlice.reducer;
