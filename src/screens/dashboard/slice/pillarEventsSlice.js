import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllPOEEvents = createAsyncThunk(
  'poeEvents/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/119/events`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const poeEventSlice = createSlice({
  name: 'poeEvent',
  initialState: {
    poeEvents: [],
    poeEventLoading: false,
    poeEventError: null,
  },
  reducers: {
    resetPOEEvent: state => {
      state.poeEvents = [];
      state.poeEventLoading = false;
      state.poeEventError = null;
    },
  },
  extraReducers: {
    [fetchAllPOEEvents.pending]: (state, action) => {
      state.poeEventLoading = true;
      state.poeEventError = null;
    },
    [fetchAllPOEEvents.fulfilled]: (state, action) => {
      state.poeEvents = action.payload;
      state.poeEventLoading = false;
      state.poeEventError = null;
    },
    [fetchAllPOEEvents.rejected]: (state, action) => {
      state.poeEventLoading = false;
      if (action.payload) {
        state.poeEventError = action.payload.error.message;
      } else {
        state.poeEventError = action.error;
      }
    },
  },
});

export const {resetPOEEvent} = poeEventSlice.actions;
export default poeEventSlice.reducer;
