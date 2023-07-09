import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {
  return (
    <>
            {props.children}
            <ToastContainer/>
    </>
  )
}

export default MainLayout