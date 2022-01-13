import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {update} from '../../utils/httpUtil';

export const updateCustomerByID = createAsyncThunk(
    'password/updateByID',
     (formData, {rejectWithValue}) => {
        const {id, ...fields} = formData;
        return update(`v1/customers/${id}/change-password`, fields).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const passwordSlice = createSlice({
    name: 'password',
    initialState: {entities: {}, loading: false, error: {}},
    reducers: {
        resetCustomerPassword: (state) => {
            state.entities = {};
            state.loading = false;
            state.error = {};
        },
    },
    extraReducers: {
        [updateCustomerByID.pending]: (state, action) => {
            state.loading = true;
            state.error = {};
        },
        [updateCustomerByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = action.payload;
        },
        [updateCustomerByID.rejected]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = action.error;
            }
        },
    },
});

export const {resetCustomerPassword} = passwordSlice.actions;

export default passwordSlice.reducer;
