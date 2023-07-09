import React from 'react';
import { Routes , Route , useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../components/Home/Home';
import Product from '../components/Product/Product';
import Login from '../components/LoginRegister/Login';
import Register from '../components/LoginRegister/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import CreateProduct from '../components/Dashboard/CreateProduct';
import OnePage from '../components/Side/OnePage';
import LoginRegisterGuard from './LoginRegisterGuard';
import ProtectRoute from './ProtectRoute';
import Cart from '../components/Cart/Cart';
import UpdateClientOrder from '../components/Dashboard/UpdateClientOrder';

const AnimateRoute = () => {

    const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
            <Routes key={location.pathname} location={location}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/login' element={
                        <LoginRegisterGuard>
                          <Login/>
                        </LoginRegisterGuard>
                    }/>
                    <Route path='/register' element={
                        <LoginRegisterGuard>
                          <Register/>
                        </LoginRegisterGuard>
                    }/>
                    <Route path='/dashboard' element={
                        <ProtectRoute>
                          <Dashboard/>
                        </ProtectRoute>
                    }/>
                    <Route path='/create' element={
                        <ProtectRoute>
                          <CreateProduct/>
                        </ProtectRoute>
                    }/>
                    <Route path='/one/:id' element={
                        <OnePage/>
                    }/>
                    <Route path='/cart' element={
                        <ProtectRoute>
                            <Cart/>
                        </ProtectRoute>
                    }/>
                    <Route path='/update' element={
                        <ProtectRoute>
                            <UpdateClientOrder/>
                        </ProtectRoute>
                    }/>
                    <Route path='*' element={
                        <h2>404 Not found</h2>
                    }/>
            </Routes>
    </AnimatePresence>
  )
}

export default AnimateRoute