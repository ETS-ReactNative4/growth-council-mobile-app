import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const fetchAllNewMember = createAsyncThunk(
  'newMember/fetchAll',
  (_, {rejectWithValue}) => {
    return store(`jwt-auth/v1/new_members`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const newMemberSlice = createSlice({
  name: 'newMember',
  initialState: {
    newMember: [],
    newMemberLoading: false,
    newMemberError: null,
  },
  reducers: {
    resetNewMember: state => {
      state.newMember = [];
      state.newMemberLoading = false;
      state.newMemberError = null;
    },
  },
  extraReducers: {
    [fetchAllNewMember.pending]: (state, action) => {
      state.newMemberLoading = true;
      state.newMemberError = null;
    },
    [fetchAllNewMember.fulfilled]: (state, action) => {
      state.newMember = action.payload;
      state.newMemberLoading = false;
      state.newMemberError = null;
    },
    [fetchAllNewMember.rejected]: (state, action) => {
      state.newMemberLoading = false;
      if (action.payload) {
        state.newMemberError = action?.payload?.error?.message;
      } else {
        state.newMemberrError = action.error;
      }
    },
  },
});

export const {resetNewMember} = newMemberSlice.actions;

export default newMemberSlice.reducer;
