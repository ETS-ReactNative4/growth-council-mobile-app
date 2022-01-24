import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../utils/httpUtil';

export const fetchAllCalendarEvents = createAsyncThunk(
    'calendarEvent/fetchAll',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/calendar`, formData)
            .then(response => response.data.body_response)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const calendarEventSlice = createSlice({
    name: 'calendarEvent',
    initialState: {
        calendarEvents: [],
        calendarEventLoading: false,
        calendarEventError: null,
    },
    reducers: {
        resetCalendarEvent: state => {
            state.calendarEvents = [];
            state.calendarEventLoading = false;
            state.calendarEventError = null;
        },
    },
    extraReducers: {
        [fetchAllCalendarEvents.pending]: (state, action) => {
            state.calendarEventLoading = true;
            state.calendarEventError = null;
        },
        [fetchAllCalendarEvents.fulfilled]: (state, action) => {
            state.calendarEvents = action.payload;
            state.calendarEventLoading = false;
            state.calendarEventError = null;
        },
        [fetchAllCalendarEvents.rejected]: (state, action) => {
            state.calendarEventLoading = false;
            if (action.payload) {
                state.calendarEventError = action.payload.error.message;
            } else {
                state.calendarEventError = action.error;
            }
        },
    },
});

export const {resetCalendarEvent} = calendarEventSlice.actions;
export default calendarEventSlice.reducer;
