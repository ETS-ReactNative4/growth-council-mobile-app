import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { fetch, update } from '../../../utils/httpUtil';



export const fetchAllPointOfEngagements = createAsyncThunk(
    'PointOfEngagement/fetchAll',
    (identifier, {rejectWithValue}) => {
        return fetch(`v1/events`).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const PointOfEngagementSlice = createSlice({
    name: 'PointOfEngagement',
    initialState: {PointOfEngagement: [], PointOfEngagementLoading: false, PointOfEngagementError: null},
    reducers: {
        resetPointOfEngagement: (state) => {
            state.PointOfEngagement = [];
            state.PointOfEngagementLoading = false;
            state.PointOfEngagementError = null;
        },
    },
    extraReducers: {
        [fetchAllPointOfEngagements.pending]: (state, action) => {
            state.PointOfEngagementLoading = true;
            state.PointOfEngagementError = null;
        },
        [fetchAllPointOfEngagements.fulfilled]: (state, action) => {
            state.PointOfEngagement = action.payload;
            state.PointOfEngagementLoading = false;
            state.PointOfEngagementError = null;
        },
        [fetchAllPointOfEngagements.rejected]: (state, action) => {
            state.PointOfEngagementLoading = false;
            if (action.payload) {
                state.PointOfEngagementError = action.payload.error.message;
            } else {
                state.PointOfEngagementError = action.error;
            }
        },
    },
});



export const {resetPointOfEngagement} = PointOfEngagementSlice.actions;

export default PointOfEngagementSlice.reducer;
