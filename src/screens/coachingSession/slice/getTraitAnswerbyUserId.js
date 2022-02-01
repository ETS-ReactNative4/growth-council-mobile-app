import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchTraitsAnswerByUserId= createAsyncThunk(
  'getTraitsAnswer/fetchTraitsAnswer',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/traits/${identifier}/answers`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const GetTraitsAnswerSlice = createSlice({
  name: 'getTraitsAnswer',
  initialState: {
    getTraitsAnswer: [],
    getTraitsAnswerLoading: false,
    getTraitsAnswerError: null,
  },
  reducers: {
    resetGetTraitsAnswer: state => {
      state.getTraitsAnswer = [];
      state.getTraitsAnswerLoading = false;
      state.getTraitsAnswerError = null;
    },
  },
  extraReducers: {
    [fetchTraitsAnswerByUserId.pending]: (state, action) => {
      state.getTraitsAnswerLoading = true;
      state.getTraitsAnswerError = null;
    },
    [fetchTraitsAnswerByUserId.fulfilled]: (state, action) => {
      state.getTraitsAnswer = action.payload;
      state.getTraitsAnswerLoading = false;
      state.getTraitsAnswerError = null;
    },
    [fetchTraitsAnswerByUserId.rejected]: (state, action) => {
      state.getTraitsAnswerLoading = false;
      if (action.payload) {
        state.getTraitsAnswerError = action.payload.error.message;
      } else {
        state.getTraitsAnswerError = action.error;
      }
    },
  },
});

export const {resetGetTraitsAnswer} = GetTraitsAnswerSlice.actions;
export default GetTraitsAnswerSlice.reducer;
