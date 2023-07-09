import { createSlice } from '@reduxjs/toolkit';
import { uploadProduct , fetchProduct , loadMoreProduct , loadCategory , searchDatabase , onePageAccess , extractConsoleOut } from '../Thunk/productThunk';

const productSlice = createSlice({
        name:"product",
        initialState:{
                allProducts:[],
                tempProducts:[],
                consoleProducts:[],
                loading:false,
                loadMoreLoading:false,
                end:false, 
                one:{}
        },
        reducers:{
                        filterControllerColor:(state , action) => {
                                        if(action.payload.color){
                                                        state.allProducts = state.tempProducts.filter((color) => color.color === action.payload.color);
                                        }
                        },
                        sortProduct:(state , action) => {
                                        switch(action.payload.sort){
                                                case 'nameA_Z':
                                                        state.allProducts = state.tempProducts.sort(function(a,b){
                                                                return a.title.localeCompare(b.title);
                                                        });
                                                        break;
                                                case 'nameZ_A':
                                                        state.allProducts = state.tempProducts.sort(function(a,b){
                                                                return b.title.localeCompare(a.title);
                                                        });             
                                                        break;
                                                case 'price_lowest':
                                                        state.allProducts = state.tempProducts.sort(function(a,b){
                                                                return a.price - b.price;
                                                        });
                                                        break;
                                                case 'price_highest':
                                                        state.allProducts = state.tempProducts.sort(function(a,b){
                                                                return b.price - a.price;
                                                        });
                                                        break;
                                                case '':
                                                        state.allProducts = state.tempProducts;
                                                        break;
                                                default:
                                                        return false;

                                        }
                        }
        },
        extraReducers:(builder) => {
                    builder
                        .addCase(uploadProduct.pending , (state) => {
                                    state.loading = true;
                        })
                        .addCase(uploadProduct.fulfilled , (state) => {
                                    state.loading = false;
                        })
                        .addCase(uploadProduct.rejected , (state) => {
                                    state.loading = false;
                        })
                        .addCase(fetchProduct.pending , (state) => {
                                    state.loading = true;
                        })
                        .addCase(fetchProduct.fulfilled , (state , action) => {
                                    state.loading = false;
                                    state.allProducts = [...action.payload];
                                    state.tempProducts = [...action.payload];
                                    state.end = false;
                        })
                        .addCase(fetchProduct.rejected , (state) => {
                                state.loading = false;
                                state.allProducts = [];
                                state.tempProducts = [];
                                state.end = false;
                        })
                        .addCase(loadMoreProduct.pending , (state) => {
                                        state.loadMoreLoading = true;
                        })
                        .addCase(loadMoreProduct.fulfilled , (state , action) => {
                                        state.loadMoreLoading = false;
                                        state.allProducts = [...state.allProducts , ...action.payload.data];
                                        state.tempProducts = [...state.tempProducts , ...action.payload.data];
                                        state.end = action.payload.end;
                        })
                        .addCase(loadMoreProduct.rejected , (state) => {
                                        state.loadMoreLoading = false;
                                        state.allProducts = [...state.allProducts];
                                        state.tempProducts = [...state.tempProducts];
                                        state.end = false;
                        })
                        .addCase(loadCategory.pending , (state) => {
                                        state.loading = true
                        })
                        .addCase(loadCategory.fulfilled , (state , action) => {
                                        state.loading = false;
                                        state.allProducts = [...action.payload];
                                        state.tempProducts = [...action.payload];
                                        state.end = true;
                        })
                        .addCase(loadCategory.rejected , (state) => {
                                        state.loading = false;
                                        state.allProducts = [...state.allProducts];
                                        state.tempProducts = [...state.tempProducts];
                                        state.end = true;
                        })
                        .addCase(searchDatabase.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(searchDatabase.fulfilled , (state , action) => {
                                        state.loading = false;
                                        state.allProducts = [...action.payload];
                                        state.tempProducts = [...action.payload];
                                        state.end = true;
                        })
                        .addCase(searchDatabase.rejected , (state) => {
                                        state.loading = false;
                                        state.allProducts = [...state.allProducts];
                                        state.tempProducts = [...state.tempProducts];
                                        state.end = true;
                        })
                        .addCase(onePageAccess.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(onePageAccess.fulfilled , (state , action) => {
                                        state.loading = false;
                                        state.one = action.payload.data;
                        })
                        .addCase(onePageAccess.rejected , (state) => {
                                        state.loading = false;
                                        state.one = {}
                        })
                        .addCase(extractConsoleOut.fulfilled , (state , action) => {
                                        state.consoleProducts = [...action.payload];
                        })
        }
});

export const { filterControllerColor , sortProduct } = productSlice.actions;

export default productSlice.reducer;