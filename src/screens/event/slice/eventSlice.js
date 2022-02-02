import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchEventByID = createAsyncThunk(
    'event/fetchByID',
    (identifier, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/events/${identifier}`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        eventLoading: false,
        eventError: null,
    },
    reducers: {
        resetEvent: state => {
            state.events = [];
            state.eventLoading = false;
            state.eventError = null;
        },
    },
    extraReducers: {
        [fetchEventByID.pending]: (state, action) => {
            state.eventLoading = true;
            state.eventError = null;
        },
        [fetchEventByID.fulfilled]: (state, action) => {
            state.events = action.payload;
            state.eventLoading = false;
            state.eventError = null;
        },
        [fetchEventByID.rejected]: (state, action) => {
            state.eventLoading = false;
            if (action.payload) {
                state.eventError = action.payload.error.message;
            } else {
                state.eventError = action.error;
            }
        },
    },
});

export const {resetEvent} = eventSlice.actions;
export default eventSlice.reducer;
