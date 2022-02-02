import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllConnections = createAsyncThunk(
    'connection/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/users/connection`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        connection: [],
        connectionLoading: false,
        connectionError: null,
    },
    reducers: {
        resetConnection: state => {
            state.connection = [];
            state.connectionLoading = false;
            state.connectionError = null;
        },
    },
    extraReducers: {
        [fetchAllConnections.pending]: (state, action) => {
            state.connectionLoading = true;
            state.connectionError = null;
        },
        [fetchAllConnections.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.connectionLoading = false;
            state.connectionError = null;
        },
        [fetchAllConnections.rejected]: (state, action) => {
            state.connectionLoading = false;
            if (action.payload) {
                state.connectionError = action.payload.error.message;
            } else {
                state.connectionError = action.error;
            }
        },
    },
});

export const {resetConnection} = connectionSlice.actions;

export default connectionSlice.reducer;
