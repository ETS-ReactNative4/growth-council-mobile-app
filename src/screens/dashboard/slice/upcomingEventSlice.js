import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllUpcomingEvents = createAsyncThunk(
    'upcomingEvent/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/121/events`)
            .then(response => response.data.body_response).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const upcomingEventSlice = createSlice({
    name: 'upcomingEvent',
    initialState: {upcomingEvents: [], upcomingEventLoading: false, upcomingEventError: null},
    reducers: {
        resetUpcomingEvent: (state) => {
            state.upcomingEvents = [];
            state.upcomingEventLoading = false;
            state.upcomingEventError = null;
        },
    },
    extraReducers: {
        [fetchAllUpcomingEvents.pending]: (state, action) => {
            state.upcomingEventLoading = true;
            state.upcomingEventError = null;
        },
        [fetchAllUpcomingEvents.fulfilled]: (state, action) => {
            state.upcomingEvents = action.payload;
            state.upcomingEventLoading = false;
            state.upcomingEventError = null;
        },
        [fetchAllUpcomingEvents.rejected]: (state, action) => {
            state.upcomingEventLoading = false;
            if (action.payload) {
                state.upcomingEventError = action.payload.error.message;
            } else {
                state.upcomingEventError = action.error;
            }
        },
    },
});

export const {resetUpcomingEvent} = upcomingEventSlice.actions;
export default upcomingEventSlice.reducer;
