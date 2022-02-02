import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch, update} from '../../../utils/httpUtil';

export const fetchTraitsAnswerByUserId= createAsyncThunk(
  'traitsAnswer/fetchTraitsAnswer',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/traits/${identifier}/answers`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);
export const updateTraitsAnswerByUserId= createAsyncThunk(
	'traitsAnswer/updateTraitsAnswer',
	(identifier, {rejectWithValue}) => {
	  return update(`jwt-auth/v1/traits/${identifier}/answers`)
		.then(response => response.data.data)
		.catch(error => rejectWithValue(error?.response?.data || error));
	},
);

const traitsAnswerSlice = createSlice({
  name: 'traitsAnswer',
  initialState: {
    traitsAnswer: [],
    traitsAnswerLoading: false,
    traitsAnswerError: null,
  },
  reducers: {
    resetTraitsAnswer: state => {
      state.traitsAnswer = [];
      state.traitsAnswerLoading = false;
      state.traitsAnswerError = null;
    },
  },
  extraReducers: {
    [fetchTraitsAnswerByUserId.pending]: (state, action) => {
		state.traitsAnswerLoading = true;
		state.traitsAnswerError = null;
    },
    [fetchTraitsAnswerByUserId.fulfilled]: (state, action) => {
		state.traitsAnswer = action.payload;
		state.traitsAnswerLoading = false;
		state.traitsAnswerError = null;
    },
    [fetchTraitsAnswerByUserId.rejected]: (state, action) => {
		state.traitsAnswerLoading = false;
		if (action.payload) {
			state.traitsAnswerError = action.payload.error.message;
		} else {
			state.traitsAnswerError = action.error;
		}
    },
	[updateTraitsAnswerByUserId.pending]: (state, action) => {
		state.traitsAnswerLoading = true;
		state.traitsAnswerError = null;
	},
	[updateTraitsAnswerByUserId.fulfilled]: (state, action) => {
		state.traitsAnswer = action.payload;
		state.traitsAnswerLoading = false;
		state.traitsAnswerError = null;
	},
	[updateTraitsAnswerByUserId.rejected]: (state, action) => {
		state.traitsAnswerLoading = false;
		if (action.payload) {
		  state.traitsAnswerError = action.payload.error.message;
		} else {
		  state.traitsAnswerError = action.error;
		}
	},
  },
});

export const {resetTraitsAnswer} = traitsAnswerSlice.actions;
export default traitsAnswerSlice.reducer;
