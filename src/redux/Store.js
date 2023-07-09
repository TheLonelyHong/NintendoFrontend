import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/userSlice';
import globalReducer from './Slice/globalSlice';
import productReducer from './Slice/productSlice';
import cartReducer from './Slice/cartSlice';
import orderReducer from './Slice/orderSlice';


export const Store = configureStore({
        reducer:{
                user:userReducer,
                global:globalReducer,
                product:productReducer,
                cart:cartReducer,
                order:orderReducer
        },
        middleware:(getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck:false
        })
});

