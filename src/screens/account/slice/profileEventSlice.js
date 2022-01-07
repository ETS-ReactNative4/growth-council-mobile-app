import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchEventsByUserID = createAsyncThunk(
  'profileEvent/fetchAllByID',
  (identifier, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users/${identifier}/events`)
      	.then(response => response.data.body_response)
      	.catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const profileEventSlice = createSlice({
  name: 'profileEvent',
  initialState: {
    profileEvent: [],
    profileEventLoading: false,
    profileEventError: null,
  },
  reducers: {
    resetProfileEvent: state => {
      state.profileEvent = [];
      state.profileEventLoading = false;
      state.profileEventError = null;
    },
  },
  extraReducers: {
    [fetchEventsByUserID.pending]: (state, action) => {
      state.profileEventLoading = true;
      state.profileEventError = null;
    },
    [fetchEventsByUserID.fulfilled]: (state, action) => {
      state.profileEvent = action.payload;
      state.profileEventLoading = false;
      state.profileEventError = null;
    },
    [fetchEventsByUserID.rejected]: (state, action) => {
      state.profileEventLoading = false;
      if (action.payload) {
        state.profileEventError = action.payload.error.message;
      } else {
        state.profileEventError = action.error;
      }
    },
  },
});

export const {resetProfileEvent} = profileEventSlice.actions;
export default profileEventSlice.reducer;
