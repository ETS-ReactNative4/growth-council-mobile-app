import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllSubTraits= createAsyncThunk(
  'subtraits/fetchAll',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/traits/${identifier}`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));

  },
);

const SubTraitSlice = createSlice({
  name: 'subtraits',
  initialState: {
    subTraits: [],
    subTraitsLoading: false,
    subTraitsError: null,
  },
  reducers: {
    resetSubTraits: state => {
      state.subTraits = [];
      state.subTraitsLoading = false;
      state.subTraitsError = null;
    },
  },
  extraReducers: {
    [fetchAllSubTraits.pending]: (state, action) => {
      state.subTraitsLoading = true;
      state.subTraitsError = null;
    },
    [fetchAllSubTraits.fulfilled]: (state, action) => {
      state.subTraits = action.payload;
      state.subTraitsLoading = false;
      state.subTraitsError = null;
    },
    [fetchAllSubTraits.rejected]: (state, action) => {
      state.subTraitsLoading = false;
      if (action.payload) {
        state.subTraitsError = action.payload.error.message;
      } else {
        state.subTraitsError = action.error;
      }
    },
  },
});

export const {resetSubTraits} = SubTraitSlice.actions;
export default SubTraitSlice.reducer;
