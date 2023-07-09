import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from '../../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { showMsg } from '../../utils/tools';
import { useSelector , useDispatch } from 'react-redux';
import { clearGlobal } from '../../redux/Slice/globalSlice';
import { userSignOut } from '../../redux/Thunk/userThunk';
import { clearCurrentUser } from '../../redux/Slice/userSlice';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import { clearClientOrders } from '../../redux/Slice/orderSlice';

const Headbar = () => {

  const [isOpen , setIsOpen] = useState(false);
  const globals = useSelector(state => state.global);
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
        dispatch(userSignOut())
          .then(() => {
                showMsg("Sign Out success" , "SUCCESS");
                dispatch(clearCurrentUser());
                dispatch(clearClientOrders());
                navigate("/");
          });
  };

  useEffect(() => {
        const { global , error } = globals;
        if(error === false){
              showMsg(global , "ERROR");
              dispatch(clearGlobal());
        }else if(error === true){
              showMsg(global , "SUCCESS");
              dispatch(clearGlobal());
        }
        // eslint-disable-next-line
  } , [globals.global]);

  return (
    <div className='whiteBackground sticky'>
        <div className='container'>
                <Navbar expand="lg" className='d-flex justify-content-between align-items-center'>
                          <LinkContainer to="/">
                              <Navbar.Brand className='d-flex justify-content-center align-items-center gap-2'>
                                    <LazyLoadImage
                                      src={`${logo}`}
                                      effect='blur'
                                      className='headbar-logo'
                                    />
                                    <h5 className='color-red'>Nintendo</h5>
                              </Navbar.Brand>
                          </LinkContainer>
                          <div className='display-none'>
                              <div className='d-flex justify-content-between align-items-center gap-3'>
                                  <LinkContainer to="/product" className='pointer'>
                                          <h5 className='color-red'>Store <StoreIcon/></h5>
                                  </LinkContainer>
                                  {
                                    user.current.email ? 
                                        <LinkContainer to="/dashboard" className='pointer'>
                                                <h5 className='color-blue'>Dashboard <DashboardIcon/></h5>
                                        </LinkContainer>
                                    : null
                                  }
                                  {
                                    user.current.email ? 
                                        <LinkContainer to="/cart" className='pointer'>
                                                <h5>
                                                    Cart 
                                                    <Badge color='primary' badgeContent={cart.items.length}>
                                                      <ShoppingCartIcon/>
                                                    </Badge>
                                                </h5>
                                        </LinkContainer>
                                    : null
                                  }
                                  {
                                    user.current.email ? 
                                      <>
                                          <button type='button' className='btn btn-customize-transparent' onClick={() => handleSignOut()}>
                                              Logout <PersonIcon/>
                                          </button>
                                      </>
                                    :
                                        <LinkContainer to="/login" className='pointer'>
                                                <h5>Login <PersonIcon/></h5>
                                        </LinkContainer>
                                  }
                              </div>
                          </div>
                          <div className='display-block'>
                                  <button type='button' className='btn btn-customize-red' onClick={() => setIsOpen(true)}>
                                      <MenuIcon/>
                                  </button>
                                      <Sidebar open = {isOpen} handleClose = {() => setIsOpen(false)}/>
                          </div>
                </Navbar>
        </div>
    </div>
  )
}

export default Headbar