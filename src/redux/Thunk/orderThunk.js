import { createAsyncThunk } from '@reduxjs/toolkit';
import { where , query , collection , getDocs, doc, updateDoc } from 'firebase/firestore';
import { store , auth } from '../../firebase/firebase';
import { displayGlobal } from '../Slice/globalSlice';


const ordersCollection = collection(store , 'orders');

export const getClientOrder = createAsyncThunk(
        'order/getClientOrder',
        async() => {
                try {
                            const q = query(ordersCollection , where("userUid" , "==" , `${auth.currentUser.uid}`));  
                            const querySnapshot = await getDocs(q);
                            const clientData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                            return clientData;
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);

export const getAllOrders = createAsyncThunk(
        'order/getAllOrders',
        async() => {
                try {
                        const querySnapshot = await getDocs(ordersCollection);
                        const allData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                        return allData;
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);

export const updateOrderStatus = createAsyncThunk(
        'order/updateOrderStatus',
        async({orderID , status , packedName} , {dispatch}) => {
                try {
                        const ordersRef = doc(store , "orders" , `${orderID}`);
                        await updateDoc(ordersRef , {
                                status:status + packedName
                        });

                        dispatch(displayGlobal({data:"Update status success" , error:true}));
                } catch (error) {
                        console.log(error.code , error.message);
                        dispatch(displayGlobal({data:"Update status failed !" , error:false}));
                        throw error;
                }
        }
);

export const orderCompleted = createAsyncThunk(
        'order/orderCompleted',
        async({orderID} , {dispatch}) => {
                try {
                        const ordersRef = doc(store , "orders" , `${orderID}`);
                        await updateDoc(ordersRef , {
                                status:"Completed"
                        });
                        dispatch(displayGlobal({data:"Receive success" , error:true}));
                } catch (error) {
                        console.log(error.code , error.message);
                        dispatch(displayGlobal({data:"Internal error !" , error:false}));
                        throw error;
                }
        }
);