import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword , signOut , signInWithEmailAndPassword } from 'firebase/auth';
import { displayGlobal } from '../../redux/Slice/globalSlice';
import { User , userConverter , UserOrder , userOrderConverter } from '../../utils/tools';
import { auth , store } from '../../firebase/firebase';
import { collection , addDoc , query , where , getDocs, } from 'firebase/firestore';


const userCollection = collection(store , 'users');
const orderCollection = collection(store , 'orders');

export const createUser = createAsyncThunk(
        'user/createUser',
        async({email , username , password} , {dispatch}) => {
                    try {   
                                await createUserWithEmailAndPassword(auth , email , password);
                                const userRef = userCollection.withConverter(userConverter);
                                await addDoc(userRef , new User(username , email , auth.currentUser.uid));
                                dispatch(displayGlobal({data:"Create account success" , error:true}));

                    } catch (error) {
                            console.log(error.code , error.message);
                            switch(error.code){
                                        case 'auth/email-already-in-use':
                                                dispatch(displayGlobal({data:"Email taken !" , error:false}));
                                                break;
                                        default:
                                            dispatch(displayGlobal({data:"Create account failure" , error:false}));
                            }
                            throw error;
                    }
        }
);

export const extractUserDataOut = createAsyncThunk(
        'user/extractUserDataOut',
        async({email}) => {
                        try {
                                const q = query(userCollection , where("email" , "==" , `${email}`));
                                const querySnapshot = await getDocs(q);
                                const filteredData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}))
                                return {
                                        data:filteredData[0]
                                };
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const userSignOut = createAsyncThunk(
        'user/userSignOut',
        async() => {
                try {
                        await signOut(auth);
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);

export const userSignIn = createAsyncThunk(
        'user/userSignIn',
        async({email , password} , {dispatch}) => {
                try {
                        await signInWithEmailAndPassword(auth , email , password);
                        dispatch(displayGlobal({data:"Sign In success" , error:true}));
                } catch (error) {
                        console.log(error.code , error.message);
                        switch(error.code){
                                        case 'auth/user-not-found':
                                                dispatch(displayGlobal({data:"User not found!" , error:false}));
                                                break;
                                        case 'auth/wrong-password':
                                                dispatch(displayGlobal({data:"Wrong password" , error:false}));
                                                break;
                                        default:
                                                dispatch(displayGlobal({data:"Sign In failure" , error:false}));
                        }
                        throw error;
                }
        }
);

export const updateUserOrder = createAsyncThunk(
        'user/updateUserOrder',
        async({items , total}) => {
                        try {
                                const ordersRef = orderCollection.withConverter(userOrderConverter);
                                await addDoc(ordersRef , new UserOrder(items , auth.currentUser.email , auth.currentUser.uid , total));
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);
