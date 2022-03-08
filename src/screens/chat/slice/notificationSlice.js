import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const sendNotificationByUserID = createAsyncThunk(
    'connection/sendNotificationByUserID',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/fcm`, formData)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        notificationLoading: false,
        notificationError: null,
    },
    reducers: {
        resetNotification: state => {
            state.notifications = [];
            state.notificationLoading = false;
            state.notificationError = null;
        },
    },
    extraReducers: {
        [sendNotificationByUserID.pending]: (state, action) => {
            state.notificationLoading = true;
            state.notificationError = null;
        },
        [sendNotificationByUserID.fulfilled]: (state, action) => {
            state.notifications = action.payload;
            state.notificationLoading = false;
            state.notificationError = null;
        },
        [sendNotificationByUserID.rejected]: (state, action) => {
            state.notificationLoading = false;
            if (action.payload) {
                state.notificationError = action?.payload?.error?.message;
            } else {
                state.notificationError = action.error;
            }
        },
    },
});

export const {resetNotification} = notificationSlice.actions;

export default notificationSlice.reducer;
