import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch, update} from '../../../utils/httpUtil';


export const fetchProfileByID = createAsyncThunk(
    'profile/fetchByID',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/users/profile`)
            .then(response => response.data.body_response)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

export const updateUserByID = createAsyncThunk(
    'profile/updateByID',
    (formData, {rejectWithValue}) => {
        const { ...fields} = formData;
        return update(`jwt-auth/v1/users/profile`, fields)
			.then(response => response.data)
			.catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: [],
        profileLoading: false,
        profileError: null,
    },
    reducers: {
        resetProfile: state => {
            state.profile = [];
            state.profileLoading = false;
            state.profileError = null;
        },
    },
    extraReducers: {
        [fetchProfileByID.pending]: (state, action) => {
            state.profileLoading = true;
            state.profileError = null;
        },
        [fetchProfileByID.fulfilled]: (state, action) => {
            state.profile = action.payload;
            state.profileLoading = false;
            state.profileError = null;
        },
        [fetchProfileByID.rejected]: (state, action) => {
            state.profileLoading = false;
            if (action.payload) {
                state.profileError = action.payload.error.message;
            } else {
                state.profileError = action.error;
            }
        },
        [updateUserByID.pending]: (state, action) => {
            state.profileLoading = true;
            state.profileError = {};
        },
        [updateUserByID.fulfilled]: (state, action) => {
            state.profileLoading = false;
            state.profile = action.payload;
        },
        [updateUserByID.rejected]: (state, action) => {
            state.profileLoading = false;
            if (action.payload) {
                state.profileError = action.payload;
            } else {
                state.profileError = action.error;
            }
        },
    },
});

export const {resetProfile} = profileSlice.actions;
export default profileSlice.reducer;
