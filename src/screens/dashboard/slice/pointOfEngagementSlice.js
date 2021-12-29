import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { fetch } from '../../../utils/httpUtil';

export const fetchAllPointOfEngagements = createAsyncThunk(
    'pointOfEngagement/fetchAll',
    (identifier, {rejectWithValue}) => {
        return fetch(`/gil_api/v1/pillars/121/events`)
		.then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const pointOfEngagementSlice = createSlice({
    name: 'pointOfEngagement',
    initialState: {pointOfEngagements: [], pointOfEngagementLoading: false, pointOfEngagementError: null},
    reducers: {
        resetPointOfEngagement: (state) => {
            state.pointOfEngagements = [];
            state.pointOfEngagementLoading = false;
            state.pointOfEngagementError = null;
        },
    },
    extraReducers: {
        [fetchAllPointOfEngagements.pending]: (state, action) => {
            state.pointOfEngagementLoading = true;
            state.pointOfEngagementError = null;
        },
        [fetchAllPointOfEngagements.fulfilled]: (state, action) => {
            state.pointOfEngagements = action.payload;
            state.pointOfEngagementLoading = false;
            state.pointOfEngagementError = null;
        },
        [fetchAllPointOfEngagements.rejected]: (state, action) => {
            state.pointOfEngagementLoading = false;
            if (action.payload) {
                state.pointOfEngagementError = action.payload.error.message;
            } else {
                state.pointOfEngagementError = action.error;
            }
        },
    },
});



export const {resetPointOfEngagement} = pointOfEngagementSlice.actions;

export default pointOfEngagementSlice.reducer;
