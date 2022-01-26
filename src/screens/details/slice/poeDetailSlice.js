import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllPOEDetails = createAsyncThunk(
  'poeDetails/fetchAll',
  (poeId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/${poeId}`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const poeDetailSlice = createSlice({
  name: 'poeDetail',
  initialState: {
    poeDetails: [],
    poeDetailLoading: false,
    poeDetailError: null,
  },
  reducers: {
    resetPOEDetail: state => {
      state.poeDetails = [];
      state.poeDetailLoading = false;
      state.poeDetailError = null;
    },
  },
  extraReducers: {
    [fetchAllPOEDetails.pending]: (state, action) => {
      state.poeDetailLoading = true;
      state.poeDetailError = null;
    },
    [fetchAllPOEDetails.fulfilled]: (state, action) => {
      state.poeDetails = action.payload;
      state.poeDetailLoading = false;
      state.poeDetailError = null;
    },
    [fetchAllPOEDetails.rejected]: (state, action) => {
      state.poeDetailLoading = false;
      if (action.payload) {
        state.poeDetailError = action.payload.error.message;
      } else {
        state.poeDetailError = action.error;
      }
    },
  },
});

export const {resetPOEDetail} = poeDetailSlice.actions;
export default poeDetailSlice.reducer;
