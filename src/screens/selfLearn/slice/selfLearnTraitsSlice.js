import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchSelfLearnTraits = createAsyncThunk(
  'selfLearnTrait/fetchAll',
  (selfLearnId, {rejectWithValue}) => {
    return fetch(`/jwt-auth/v1/self-learns/${selfLearnId}/traits`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const selfLearnTraitSlice = createSlice({
  name: 'selfLearnTrait',
  initialState: {
    selfLearnTraits: [],
    selfLearnTraitLoading: false,
    selfLearnTraitError: null,
  },
  reducers: {
    resetSelfLearnTraits: state => {
      state.selfLearnTraits = [];
      state.selfLearnTraitLoading = false;
      state.selfLearnTraitError = null;
    },
  },
  extraReducers: {
    [fetchSelfLearnTraits.pending]: (state, action) => {
      state.selfLearnTraitLoading = true;
      state.selfLearnTraitError = null;
    },
    [fetchSelfLearnTraits.fulfilled]: (state, action) => {
      state.selfLearnTraits = action.payload;
      state.selfLearnTraitLoading = false;
      state.selfLearnTraitError = null;
    },
    [fetchSelfLearnTraits.rejected]: (state, action) => {
      state.selfLearnTraitLoading = false;
      if (action.payload) {
        state.selfLearnTraitError = action.payload.error.message;
      } else {
        state.selfLearnTraitError = action.error;
      }
    },
  },
});

export const {resetSelfLearnTraits} = selfLearnTraitSlice.actions;
export default selfLearnTraitSlice.reducer;
