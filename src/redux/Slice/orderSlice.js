import { createSlice } from '@reduxjs/toolkit';
import { getClientOrder , getAllOrders } from '../Thunk/orderThunk';

const orderSlice = createSlice({
        name:"order",
        initialState:{
             client:[],
             loading:false,
             allOrders:[]
        },
        reducers:{
                clearClientOrders:(state) => {
                                state.client = [];
                }
        },
        extraReducers:(builder) => {
                    builder
                        .addCase(getClientOrder.pending , (state) => {
                                    state.loading = true;
                        })
                        .addCase(getClientOrder.fulfilled , (state , action) => {
                                    state.loading = false;
                                    state.client = [...action.payload];
                        })
                        .addCase(getClientOrder.rejected , (state) => {
                                    state.loading = false;
                        })
                        .addCase(getAllOrders.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(getAllOrders.fulfilled , (state , action) => {
                                        state.loading = false;
                                        state.allOrders = [...action.payload];
                        })
                        .addCase(getAllOrders.rejected , (state) => {
                                        state.loading = false;
                        })
                        
        }
});

export const { clearClientOrders } = orderSlice.actions;

export default orderSlice.reducer;