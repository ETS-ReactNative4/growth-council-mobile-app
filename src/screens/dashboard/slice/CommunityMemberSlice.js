import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { fetch, update } from '../../../utils/httpUtil';

export const fetchAllCommunityMembers = createAsyncThunk(
    'CommunityMember/fetchAll',
    (identifier, {rejectWithValue}) => {
        return fetch(`v1/events`).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const CommunityMemberSlice = createSlice({
    name: 'CommunityMember',
    initialState: {CommunityMember: [], CommunityMemberLoading: false, CommunityMemberError: null},
    reducers: {
        resetCommunityMember: (state) => {
            state.CommunityMember= [];
            state.CommunityMemberLoading = false;
            state.CommunityMemberError = null;
        },
    },
    extraReducers: {
        [fetchAllCommunityMembers.pending]: (state, action) => {
            state.CommunityMemberLoading = true;
            state.CommunityMemberError = null;
        },
        [fetchAllCommunityMembers.fulfilled]: (state, action) => {
            state.CommunityMember = action.payload;
            state.CommunityMemberLoading = false;
            state.CommunityMemberError = null;
        },
        [fetchAllCommunityMembers.rejected]: (state, action) => {
            state.CommunityMemberLoading = false;
            if (action.payload) {
                state.CommunityMemberError = action.payload.error.message;
            } else {
                state.CommunityMemberError = action.error;
            }
        },
    },
});

export const {resetCommunityMember} = CommunityMemberSlice.actions;

export default CommunityMemberSlice.reducer;
