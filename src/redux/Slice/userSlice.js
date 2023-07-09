import { createSlice } from '@reduxjs/toolkit';
import { createUser , extractUserDataOut , userSignIn } from '../Thunk/userThunk';

const userSlice = createSlice({
        name:"user",
        initialState:{
                current:{},
                loading:false
        },
        reducers:{
                clearCurrentUser:(state) => {
                                state.current = {};
                }
        },
        extraReducers:(builder) => {
                        builder
                            .addCase(createUser.pending , (state) => {
                                        state.loading = true;
                            })
                            .addCase(createUser.fulfilled , (state) => {
                                        state.loading = false;
                            })
                            .addCase(createUser.rejected , (state) => {
                                        state.loading = false;
                            })
                            .addCase(extractUserDataOut.fulfilled , (state , action) => {
                                        state.current = action.payload.data;
                            })
                            .addCase(extractUserDataOut.rejected , (state) => {
                                        state.current = {};
                            })
                            .addCase(userSignIn.pending , (state) => {
                                        state.loading = true;
                            })
                            .addCase(userSignIn.fulfilled , (state) => {
                                        state.loading = false;
                            })
                            .addCase(userSignIn.rejected , (state) => {
                                        state.loading = false;
                            })
        }
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;