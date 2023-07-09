import { createAsyncThunk } from '@reduxjs/toolkit';
import { store , storage } from '../../firebase/firebase';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { collection , addDoc , query , orderBy , limit , getDocs, startAfter , where , doc, getDoc } from 'firebase/firestore';
import { displayGlobal } from '../Slice/globalSlice';
import { Product , ProductColour , productConverter , productColourConverter } from '../../utils/tools';

const productCollection = collection(store , 'product');
let lastVisible = null;

export const uploadProduct = createAsyncThunk(
        'product/uploadProduct',
        async({category , color , title , desc , price , stock , image} ,{dispatch}) => {
                    try {
                            if(color !== undefined){
                                let img = [];
                                let imgURL = [];
                                        for(let i = 0 ; i < image.length ; i++){
                                            const storageRef = ref(storage , `${category}/${image[i].file.name}`);
                                            await uploadBytes(storageRef , image[i].file);
                                            const imgurl = await getDownloadURL(storageRef);
                                            img.push(`${image[i].file.name}`);
                                            imgURL.push(`${imgurl}`);
                                        }
                                    const productRef = productCollection.withConverter(productColourConverter);
                                    await addDoc(productRef , new ProductColour(category , title , color , desc , price , stock , img , imgURL));
                                    dispatch(displayGlobal({data:"Upload product success !" , error:true}));
                                    return;
                            }else{
                                    let img = [];
                                    let imgURL = [];
                                            for(let i = 0 ; i < image.length ; i++){
                                                const storageRef = ref(storage , `${category}/${image[i].file.name}`);
                                                await uploadBytes(storageRef , image[i].file);
                                                const imgurl = await getDownloadURL(storageRef);
                                                img.push(`${image[i].file.name}`);
                                                imgURL.push(`${imgurl}`);
                                            }
                                    const productRef = productCollection.withConverter(productConverter);
                                    await addDoc(productRef , new Product(category , title , desc , price , stock , img , imgURL));
                                    dispatch(displayGlobal({data:"Upload product success !" , error:true}));
                                    return;
                            }
                    } catch (error) {
                            console.log(error.code , error.message);
                            dispatch(displayGlobal({data:"Upload product failed !" , error:false}));
                            throw error;
                    }
        }
);

export const fetchProduct = createAsyncThunk(
        'product/fetchProduct',
        async() => {
                        try {
                                const first = query(productCollection , orderBy("title" , "asc") , limit(5));
                                const documentSnapshots = await getDocs(first);
                                const getFirstData = documentSnapshots.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                                return getFirstData;
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const loadMoreProduct = createAsyncThunk(
        'product/loadMoreProduct',
        async() => {
                        try {
                                const next = query(productCollection , orderBy("title" , "asc") , startAfter(lastVisible) , limit(5));
                                const nextSnapshots = await getDocs(next);
                                const nextData = nextSnapshots.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                lastVisible = nextSnapshots.docs[nextSnapshots.docs.length - 1];
                                if(nextData.length !== 0){
                                                return {
                                                        data:[...nextData],
                                                        end:false
                                                }
                                }else{
                                                return {
                                                        data:[],
                                                        end:true
                                                }
                                }
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const loadCategory = createAsyncThunk(
        'product/loadCategory',
        async({category}) => {
                        try {
                                if(category === 'console'){
                                                const q = query(productCollection , where("category" , "==" , "console"));
                                                const querySnapshot = await getDocs(q);
                                                const consoleData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                                return consoleData;
                                }else if(category === 'games'){
                                                const q = query(productCollection , where("category" , "==" , "games"));
                                                const querySnapshot = await getDocs(q);
                                                const gamesData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                                return gamesData;
                                }else if(category === 'controller'){
                                                const q = query(productCollection , where("category" , "==" , "controller"));
                                                const querySnapshot = await getDocs(q);
                                                const controllerData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                                return controllerData;
                                }
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const searchDatabase = createAsyncThunk(
        'product/searchDatabase',
        async({words}) => {
                        try {
                                if(words){
                                        const querySnapshot = await getDocs(productCollection);
                                        const searchData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                        const filterData = searchData.filter((doc) => doc.title.toLowerCase().startsWith(words));
                                        return filterData;
                                }
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const onePageAccess = createAsyncThunk(
        'product/onePageAccess',
        async({id}) => {
                        try {
                                const docRef = doc(store , 'product' , `${id}`);
                                const docSnap = await getDoc(docRef);

                                if(docSnap.exists()){
                                        return {
                                                data:{
                                                        ...docSnap.data(),
                                                        id:docSnap.id
                                                }
                                        }
                                }else{
                                        return{
                                                data:false
                                        }
                                }

                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const extractConsoleOut = createAsyncThunk(
        'product/extractConsoleOut',
        async() => {
                try {
                        const q = query(productCollection , where("category" , "==" , "console"));
                        const querySnapshot = await getDocs(q);
                        const mapData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                        return mapData;
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);