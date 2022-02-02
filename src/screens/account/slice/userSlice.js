import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store, update} from '../../../utils/httpUtil';

export const fetchUsersByKey = createAsyncThunk(
    'user/fetchByKey',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/users`, formData)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

export const updateUserByID = createAsyncThunk(
    'user/updateByID',
    (formData, {rejectWithValue}) => {
        const {...fields} = formData;
        return update(`jwt-auth/v1/users/profile`, fields)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        userLoading: false,
        userError: null,
    },
    reducers: {
        resetUser: state => {
            state.users = [];
            state.userLoading = false;
            state.userError = null;
        },
    },
    extraReducers: {
        [updateUserByID.pending]: (state, action) => {
            state.userLoading = true;
            state.userError = {};
        },
        [updateUserByID.fulfilled]: (state, action) => {
            state.userLoading = false;
            state.users = action.payload;
        },
        [updateUserByID.rejected]: (state, action) => {
            state.userLoading = false;
            if (action.payload) {
                state.userError = action.payload;
            } else {
                state.userError = action.error;
            }
        },
        [fetchUsersByKey.pending]: (state, action) => {
            state.userLoading = true;
            state.userError = {};
        },
        [fetchUsersByKey.fulfilled]: (state, action) => {
            state.userLoading = false;
            state.users = action.payload;
        },
        [fetchUsersByKey.rejected]: (state, action) => {
            state.userLoading = false;
            if (action.payload) {
                state.userError = action.payload;
            } else {
                state.userError = action.error;
            }
        },
    },
});

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;
