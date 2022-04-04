import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchRadarMemberDetails = createAsyncThunk(
  'radarMemberDetails/fetchAll',
  (poeId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/radar/member_details`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const radarMemberDetailsSlice = createSlice({
  name: 'radarMemberDetails',
  initialState: {
    radarMemberDetails: [],
    radarMemberDetailsLoading: false,
    radarMemberDetailsError: null,
  },
  reducers: {
    resetRadarMemberDetails: state => {
      state.radarMemberDetails = [];
      state.radarMemberDetailsLoading = false;
      state.radarMemberDetailsError = null;
    },
  },
  extraReducers: {
    [fetchRadarMemberDetails.pending]: (state, action) => {
      state.radarMemberDetailsLoading = true;
      state.radarMemberDetailsError = null;
    },
    [fetchRadarMemberDetails.fulfilled]: (state, action) => {
      state.radarMemberDetails = action.payload;
      state.radarMemberDetailsLoading = false;
      state.radarMemberDetailsError = null;
    },
    [fetchRadarMemberDetails.rejected]: (state, action) => {
      state.radarMemberDetailsLoading = false;
      if (action.payload) {
        state.radarMemberDetailsError = action?.payload?.error?.message;
      } else {
        state.radarMemberDetailsError = action.error;
      }
    },
  },
});

export const {resetRadarMemberDetails} = radarMemberDetailsSlice.actions;
export default radarMemberDetailsSlice.reducer;
