import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../utils/httpUtil';

export const searchEventsByKey = createAsyncThunk(
    'search/fetchByKey',
    (formData, {rejectWithValue}) => {
        return store(`jwt-auth/v1/search`, formData)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searches: [],
        searchLoading: false,
        searchError: null,
    },
    reducers: {
        resetSearch: state => {
            state.searches = [];
            state.searchLoading = false;
            state.searchError = null;
        },
    },
    extraReducers: {
        [searchEventsByKey.pending]: (state, action) => {
            state.searchLoading = true;
            state.searchError = null;
        },
        [searchEventsByKey.fulfilled]: (state, action) => {
            state.searches = action.payload;
            state.searchLoading = false;
            state.searchError = null;
        },
        [searchEventsByKey.rejected]: (state, action) => {
            state.searchLoading = false;
            if (action.payload) {
                state.searchError = action.payload.error.message;
            } else {
                state.searchError = action.error;
            }
        },
    },
});

export const {resetSearch} = searchSlice.actions;
export default searchSlice.reducer;
