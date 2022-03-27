import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch, store} from '../../../utils/httpUtil';

export const fetchEventsByUserID = createAsyncThunk(
  'profileEvent/fetchAllByID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/calendar`, formData)
      .then(response => response.data.data)
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
        state.profileEventError = action?.payload?.error?.message;
      } else {
        state.profileEventError = action.error;
      }
    },
  },
});

export const {resetProfileEvent} = profileEventSlice.actions;
export default profileEventSlice.reducer;
