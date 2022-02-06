import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const connectMemberByID = createAsyncThunk(
  'memberConnection/connectMemberByID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/users/connection/add`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const memberConnectionSlice = createSlice({
  name: 'memberConnection',
  initialState: {
    memberConnections: [],
    memberConnectionLoading: false,
    memberConnectionError: null,
  },
  reducers: {
    resetConnectMember: state => {
      state.memberConnections = [];
      state.memberConnectionLoading = false;
      state.memberConnectionError = null;
    },
  },
  extraReducers: {
    [connectMemberByID.pending]: (state, action) => {
      state.memberConnectionLoading = true;
      state.memberConnectionError = null;
    },
    [connectMemberByID.fulfilled]: (state, action) => {
      state.memberConnections = action.payload;
      state.memberConnectionLoading = false;
      state.memberConnectionError = null;
    },
    [connectMemberByID.rejected]: (state, action) => {
      state.memberConnectionLoading = false;
      if (action.payload) {
        state.memberConnectionError =
          action.payload.response || action?.payload?.error?.message;
      } else {
        state.memberConnectionError = action.error;
      }
    },
  },
});

export const {resetConnectMember} = memberConnectionSlice.actions;
export default memberConnectionSlice.reducer;
