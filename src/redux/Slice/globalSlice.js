import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
        name:"global",
        initialState:{
                global:"",
                error:null
        },
        reducers:{
                displayGlobal:(state , action) => {
                        state.global = action.payload.data;
                        state.error = action.payload.error;
                },
                clearGlobal:(state) => {
                        state.global = "";
                        state.error = null;
                }
        }
});

export const { clearGlobal , displayGlobal } = globalSlice.actions;

export default globalSlice.reducer;