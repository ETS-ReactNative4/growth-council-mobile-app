import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const registerSessionByID = createAsyncThunk(
    'sessionRegister/registerSessionByID',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/sessions/register`, formData)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const sessionRegisterSlice = createSlice({
    name: 'sessionRegister',
    initialState: {
        sessionRegisters: [],
        sessionRegisterLoading: false,
        sessionRegisterError: null,
    },
    reducers: {
        resetSessionRegister: state => {
            state.sessionRegisters = [];
            state.sessionRegisterLoading = false;
            state.sessionRegisterError = null;
        },
    },
    extraReducers: {
        [registerSessionByID.pending]: (state, action) => {
            state.sessionRegisterLoading = true;
            state.sessionRegisterError = null;
        },
        [registerSessionByID.fulfilled]: (state, action) => {
            state.sessionRegisters = action.payload;
            state.sessionRegisterLoading = false;
            state.sessionRegisterError = null;
        },
        [registerSessionByID.rejected]: (state, action) => {
            state.sessionRegisterLoading = false;
            if (action.payload) {
                state.sessionRegisterError = action.payload.response || action?.payload?.error?.message;
            } else {
                state.sessionRegisterError = action.error;
            }
        },
    },
});

export const {resetSessionRegister} = sessionRegisterSlice.actions;
export default sessionRegisterSlice.reducer;
