import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const ProtectRoute = (props) => {
    const location = useLocation();

    if(auth?.currentUser?.email){
            return props.children
    }

    return <Navigate to="/" state={{from:location}} replace/>
}

export default ProtectRoute