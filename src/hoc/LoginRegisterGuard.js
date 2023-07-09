import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';


const LoginRegisterGuard = (props) => {
    
    const location = useLocation();

    if(auth?.currentUser?.email){
            return <Navigate to="/product" state={{from:location}} replace/>
    }

    return props.children
}

export default LoginRegisterGuard