import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../utils/httpUtil';

export const signUpCustomer = createAsyncThunk(
    'customer/signUp',
    (formData, {rejectWithValue}) => {
        return store(`v1/auths/customer/register`, formData).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

export const forgotCustomerPassword = createAsyncThunk(
    'customer/forgot',
    (formData, {rejectWithValue}) => {
        return store(`v1/auths/customer/forgot-password`, formData).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

export const verifyOTPByCustomerID = createAsyncThunk(
    'customers/verify-otp',
    (formData, {rejectWithValue}) => {
        const {id, ...fields} = formData;
        return store(`v1/customers/${id}/verify-otp`, fields).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

export const resendOTPByCustomerID = createAsyncThunk(
    'customers/resend-otp',
    (formData, {rejectWithValue}) => {
        const {id, ...fields} = formData;
        return store(`v1/customers/${id}/otp`, {}).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {entities: {}, loading: false, error: null},
    reducers: {
        resetCustomer: (state) => {
            state.entities = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: {
        [signUpCustomer.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [signUpCustomer.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = action.payload;
            state.error = null;
        },
        [signUpCustomer.rejected]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.error.message;
            } else {
                state.error = action.error;
            }
        },
        [forgotCustomerPassword.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [forgotCustomerPassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = action.payload;
        },
        [forgotCustomerPassword.rejected]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.error.message;
            } else {
                state.error = action.error;
            }
        },
        [verifyOTPByCustomerID.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [verifyOTPByCustomerID.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = action.payload;
        },
        [verifyOTPByCustomerID.rejected]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.error.message;
            } else {
                state.error = action.error;
            }
        },
        [resendOTPByCustomerID.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [resendOTPByCustomerID.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = action.payload;
        },
        [resendOTPByCustomerID.rejected]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.error.message;
            } else {
                state.error = action.error;
            }
        },
    },
});

export const {resetCustomer} = authSlice.actions;
export default authSlice.reducer;
