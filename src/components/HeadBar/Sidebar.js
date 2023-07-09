import React from 'react';
import logo from '../../assets/logo.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { LinkContainer } from 'react-router-bootstrap';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { userSignOut } from '../../redux/Thunk/userThunk';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch, useSelector } from 'react-redux';
import { showMsg } from '../../utils/tools';
import { clearCurrentUser } from '../../redux/Slice/userSlice';
import Badge from '@mui/material/Badge';
import { clearClientOrders } from '../../redux/Slice/orderSlice';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({open , handleClose}) => {

        const user = useSelector(state => state.user);
        const cart = useSelector(state => state.cart);
        const order = useSelector(state => state.order);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleSignOut = () => {
                dispatch(userSignOut())
                        .then(() => {
                                showMsg("Sign Out Successfully" , "SUCCESS");
                                dispatch(clearCurrentUser());
                                dispatch(clearClientOrders());
                                handleClose();
                                navigate('/');
                        });
        };

  return (
    <Offcanvas show={open} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='d-flex justify-content-center align-items-end gap-3'>
                        <LazyLoadImage
                                src={`${logo}`}
                                className='sidebar-logo'
                                effect='blur'
                        />
                        <h5 className='color-red'>Nintendo</h5>
                    </Offcanvas.Title>
            </Offcanvas.Header>
            <hr/>
            <Offcanvas.Body>
                <>
                        {
                                user.current.email && order.client.length !== 0 ? 
                                        <Alert variant='success'>
                                                {order.client.length} items processing
                                        </Alert>
                                : null
                        }
                        <div className='d-flex flex-wrap gap-3'>
                                <div className='sidebar-box-red'>
                                        <LinkContainer to="/product">
                                                <div onClick={() => handleClose()}>
                                                        <h5 className='text-center'>Store</h5>
                                                        <div className='text-center'>
                                                                <StoreMallDirectoryIcon/>
                                                        </div>
                                                </div>
                                        </LinkContainer>
                                </div>
                                {
                                  user.current.email ? 
                                        <div className='sidebar-box-blue'>
                                                <LinkContainer to="/dashboard">
                                                        <div onClick={() => handleClose()}>
                                                                <h5 className='text-center'>Dashboard</h5>
                                                                <div className='text-center'>
                                                                        <DashboardIcon/>
                                                                </div>
                                                        </div>
                                                </LinkContainer>
                                        </div>
                                  : null
                                }
                                {
                                  user.current.email ? 
                                        <div className='sidebar-box-white'>
                                                <LinkContainer to="/cart">
                                                        <div onClick={() => handleClose()}>
                                                                <h5 className='text-center'>Cart</h5>
                                                                <div className='text-center'>
                                                                        <Badge color='primary' badgeContent={cart.items.length}>
                                                                                <ShoppingCartIcon/>
                                                                        </Badge>
                                                                </div>
                                                        </div>
                                                </LinkContainer>
                                        </div>
                                  : null
                                }
                                {
                                        user.current.email ? 
                                        <div className='sidebar-box-black'>
                                                        <div onClick={() => handleSignOut()}>
                                                                <h5 className='text-center'>Log out</h5>
                                                                <div className='text-center'>
                                                                        <LogoutIcon/>
                                                                </div>
                                                        </div>
                                        </div>
                                        :
                                        
                                        <div className='sidebar-box-black'>
                                                <LinkContainer to="/login">
                                                        <div onClick={() => handleClose()}>
                                                                <h5 className='text-center'>Log In</h5>
                                                                <div className='text-center'>
                                                                        <PersonIcon/>
                                                                </div>
                                                        </div>
                                                </LinkContainer> 
                                        </div>                                        
                                }
                        </div>
                </>
            </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Sidebar