import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllTraits= createAsyncThunk(
  'traits/fetchAll',
  (sessionId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/sessions/${sessionId}/traits`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const TraitSlice = createSlice({
  name: 'traits',
  initialState: {
    traits: [],
    traitsLoading: false,
    traitsError: null,
  },
  reducers: {
    resetTraits: state => {
      state.traits = [];
      state.traitsLoading = false;
      state.traitsError = null;
    },
  },
  extraReducers: {
    [fetchAllTraits.pending]: (state, action) => {
      state.traitsLoading = true;
      state.traitsError = null;
    },
    [fetchAllTraits.fulfilled]: (state, action) => {
      state.traits = action.payload;
      state.traitsLoading = false;
      state.traitsError = null;
    },
    [fetchAllTraits.rejected]: (state, action) => {
      state.traitsLoading = false;
      if (action.payload) {
        state.traitsError = action.payload.error.message;
      } else {
        state.traitsError = action.error;
      }
    },
  },
});

export const {resetTraits} = TraitSlice.actions;
export default TraitSlice.reducer;
