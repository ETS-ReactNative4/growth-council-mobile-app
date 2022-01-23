import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchIdeas = createAsyncThunk(
    'idea/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/page/4982`)
            .then(response => response.data.body_response)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const IdeaSlice = createSlice({
    name: 'idea',
    initialState: {
        idea: [],
        ideaLoading: false,
        ideaError: null,
    },
    reducers: {
        resetIdea: state => {
            state.idea = [];
            state.ideaLoading = false;
            state.ideaError = null;
        },
    },
    extraReducers: {
        [fetchIdeas.pending]: (state, action) => {
            state.ideaLoading = true;
            state.ideaError = null;
        },
        [fetchIdeas.fulfilled]: (state, action) => {
            state.idea = action.payload;
            state.ideaLoading = false;
            state.ideaError = null;
        },
        [fetchIdeas.rejected]: (state, action) => {
            state.ideaLoading = false;
            if (action.payload) {
                state.ideaError = action.payload.error.message;
            } else {
                state.ideaError = action.error;
            }
        },
    },
});

export const {resetIdea} = IdeaSlice.actions;
export default IdeaSlice.reducer;
