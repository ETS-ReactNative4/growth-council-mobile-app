import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {update} from '../../../utils/httpUtil';

export const updateTraitsAnswerByUserId= createAsyncThunk(
  'putTraitsAnswer/updateTraitsAnswer',
  (identifier, {rejectWithValue}) => {
    return update(`jwt-auth/v1/traits/${identifier}/answers`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const updateTraitsAnswerSlice = createSlice({
  name: 'updateTraitsAnswer',
  initialState: {
    updateTraitsAnswer: [],
    updateTraitsAnswerLoading: false,
    updateTraitsAnswerError: null,
  },
  reducers: {
    resetupdateTraitsAnswer: state => {
      state.updateTraitsAnswer = [];
      state.updateTraitsAnswerLoading = false;
      state.updateTraitsAnswerError = null;
    },
  },
  extraReducers: {
    [updateTraitsAnswerByUserId.pending]: (state, action) => {
      state.updateTraitsAnswerLoading = true;
      state.updateTraitsAnswerError = null;
    },
    [updateTraitsAnswerByUserId.fulfilled]: (state, action) => {
      state.updateTraitsAnswer = action.payload;
      state.updateTraitsAnswerLoading = false;
      state.updateTraitsAnswerError = null;
    },
    [updateTraitsAnswerByUserId.rejected]: (state, action) => {
      state.updateTraitsAnswerLoading = false;
      if (action.payload) {
        state.updateTraitsAnswerError = action.payload.error.message;
      } else {
        state.updateTraitsAnswerError = action.error;
      }
    },
  },
});

export const {resetupdateTraitsAnswer} = updateTraitsAnswerSlice.actions;
export default updateTraitsAnswerSlice.reducer;
