import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllPillarMemberContents = createAsyncThunk(
  'pillarMemberContents/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/119`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const pillarMemberContentSlice = createSlice({
  name: 'pillarMemberContent',
  initialState: {
    pillarMemberContents: [],
    pillarMemberContentLoading: false,
    pillarMemberContentError: null,
  },
  reducers: {
    resetPillarMemberContent: state => {
      state.pillarMemberContents = [];
      state.pillarMemberContentLoading = false;
      state.pillarMemberContentError = null;
    },
  },
  extraReducers: {
    [fetchAllPillarMemberContents.pending]: (state, action) => {
      state.pillarMemberContentLoading = true;
      state.pillarMemberContentError = null;
    },
    [fetchAllPillarMemberContents.fulfilled]: (state, action) => {
      state.pillarMemberContents = action.payload;
      state.pillarMemberContentLoading = false;
      state.pillarMemberContentError = null;
    },
    [fetchAllPillarMemberContents.rejected]: (state, action) => {
      state.pillarMemberContentLoading = false;
      if (action.payload) {
        state.pillarMemberContentError = action.payload.error.message;
      } else {
        state.pillarMemberContentError = action.error;
      }
    },
  },
});

export const {resetPillarMemberContent} = pillarMemberContentSlice.actions;
export default pillarMemberContentSlice.reducer;
