import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const updateProfileImage = createAsyncThunk(
    'profile_image/update',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/users/profile/image`, formData)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const updateProfileImageSlice = createSlice({
    name: 'updateProfileImage',
    initialState: {
        updateEntities: [],
        updateLoading: false,
        updateError: null,
    },
    reducers: {
        resetUpdateProfileImage: state => {
            state.updateEntities = [];
            state.updateLoading = false;
            state.updateError = null;
        },
    },
    extraReducers: {
        [updateProfileImage.pending]: (state, action) => {
            state.updateLoading = true;
            state.updateError = null;
        },
        [updateProfileImage.fulfilled]: (state, action) => {
            state.updateEntities = action.payload;
            state.updateLoading = false;
            state.updateError = null;
        },
        [updateProfileImage.rejected]: (state, action) => {
            state.updateLoading = false;
            if (action.payload) {
                state.updateError = action.payload;
            } else {
                state.updateError = action.error;
            }
        },
    },
});

export const {resetUpdateProfileImage} = updateProfileImageSlice.actions;

export default updateProfileImageSlice.reducer;
