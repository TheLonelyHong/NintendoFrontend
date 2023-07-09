import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
        name:"cart",
        initialState:{
                items:[],
                total_price:0,
                total_quantity:0
        },
        reducers:{
                addItems:(state , action) => {
                                const { category , title , price , quantity , imgURL , id , stock } = action.payload;
                                const tempItems = state.items.find((item) => item.id === title + id);
                                if(tempItems){
                                        const itemsList = state.items.map((item) => {
                                                        if(item.id === title + id){
                                                                        let newQuantity = item.quantity + quantity;
                                                                        if(newQuantity >= item.stock){
                                                                                newQuantity = item.stock;
                                                                        }
                                                                        return {...item , quantity:newQuantity};
                                                        }
                                                        return item;
                                        })
                                        state.items = [...itemsList];
                                }else{
                                        const itemsLog = {
                                                category , 
                                                title , 
                                                price , 
                                                quantity , 
                                                imgURL , 
                                                id: title + id , 
                                                stock
                                        };
                                        state.items = [...state.items , itemsLog];
                                }
                                
                },
                addOrReduce:(state , action) => {
                                const { id , type } = action.payload;
                                let tempItems = state.items.map((item) => {
                                                if(item.id === id){
                                                                if(type === "ADD"){
                                                                        let newQuantity = item.quantity + 1;
                                                                        if(newQuantity > item.stock){
                                                                                newQuantity = item.stock;
                                                                        }
                                                                        return {...item , quantity: newQuantity};
                                                                }else if(type === "DEC"){
                                                                        let newQuantity = item.quantity - 1;
                                                                        if(newQuantity < 0){
                                                                                newQuantity = 0;
                                                                        }
                                                                        return {...item , quantity: newQuantity};
                                                                }
                                                }
                                                return item;
                                }).filter((item) => item.quantity !== 0);

                                state.items = [...tempItems];
                },
                getTotalAndQuantity:(state) => {
                                let { total_price , total_quantity } = state.items.reduce((initialState , acumulator) => {
                                       let { price , quantity } = acumulator;
                                       let totalPrice = price * quantity;
                                       initialState.total_price += totalPrice;
                                       initialState.total_quantity += Number(quantity); 
                                       return initialState;
                                } , {
                                        total_price:0,
                                        total_quantity:0
                                }); 

                                state.total_price = total_price;
                                state.total_quantity = total_quantity;
                },
                removeItem:(state , action) => {
                                const { id } = action.payload;
                                const tempItems = state.items.filter((item) => item.id !== id);
                                state.items = [...tempItems];
                },
                clearCart:(state) => {
                        state.items = [];
                }
        }
});

export const { addItems , addOrReduce , getTotalAndQuantity , removeItem , clearCart} = cartSlice.actions;

export default cartSlice.reducer;