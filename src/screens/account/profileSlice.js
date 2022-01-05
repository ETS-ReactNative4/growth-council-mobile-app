// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// import {fetch, update} from '../../utils/httpUtil';

// export const fetchEmployeeByID = createAsyncThunk(
//     'profile/fetchByID',
//     (identifier, {rejectWithValue}) => {
//         return fetch(`v1/customers/${identifier}`).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
//     },
// );

// export const updateEmployeeByID = createAsyncThunk(
//     'profile/updateByID',
//      (formData, {rejectWithValue}) => {
//         const {id, ...fields} = formData;
//         return update(`v1/customers/${id}`, fields).then(response => response.data.data).catch(error => rejectWithValue(error?.response?.data || error));
//     },
// );

// const profileSlice = createSlice({
//     name: 'profile',
//     initialState: {profile: {}, loading: false, error: {}},
//     reducers: {
//         resetProfile: (state) => {
//             state.profile = {};
//             state.loading = false;
//             state.error = {};
//         },
//     },
//     extraReducers: {
//         [fetchEmployeeByID.pending]: (state, action) => {
//             state.loading = true;
//             state.error = {};
//         },
//         [fetchEmployeeByID.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.profile = action.payload;
//             state.error = {};
//         },
//         [fetchEmployeeByID.rejected]: (state, action) => {
//             state.loading = false;
//             if (action.payload) {
//                 state.error = action.payload;
//             } else {
//                 state.error = action.error;
//             }
//         },
//         [updateEmployeeByID.pending]: (state, action) => {
//             state.loading = true;
//             state.error = {};
//         },
//         [updateEmployeeByID.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.profile = action.payload;
//         },
//         [updateEmployeeByID.rejected]: (state, action) => {
//             state.loading = false;
//             if (action.payload) {
//                 state.error = action.payload;
//             } else {
//                 state.error = action.error;
//             }
//         },
//     },
// });

// export const {resetProfile} = profileSlice.actions;
// export default profileSlice.reducer;
