import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchSessionByID = createAsyncThunk(
    'session/fetchByID',
    (identifier, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/sessions/${identifier}`)
            .then(response => response.data.body_response)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessions: [],
        sessionLoading: false,
        sessionError: null,
    },
    reducers: {
        resetSession: state => {
            state.sessions = [];
            state.sessionLoading = false;
            state.sessionError = null;
        },
    },
    extraReducers: {
        [fetchSessionByID.pending]: (state, action) => {
            state.sessionLoading = true;
            state.sessionError = null;
        },
        [fetchSessionByID.fulfilled]: (state, action) => {
            state.sessions = action.payload;
            state.sessionLoading = false;
            state.sessionError = null;
        },
        [fetchSessionByID.rejected]: (state, action) => {
            state.sessionLoading = false;
            if (action.payload) {
                state.sessionError = action.payload.error.message;
            } else {
                state.sessionError = action.error;
            }
        },
    },
});

export const {resetSession} = sessionSlice.actions;
export default sessionSlice.reducer;
