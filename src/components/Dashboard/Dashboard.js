import React from 'react';
import AnimatePage from '../../hoc/AnimatePage';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import YourOrder from './YourOrder';

const Dashboard = () => {

        const user = useSelector(state => state.user);

  return (
    <AnimatePage>
            <div className='container mt-3 min-height'>
                    <div className='dashboard-container'>
                        {
                                user.current && user.current.role === "admin" ? 
                                        <div className='dashboard-create'>
                                                <div className='box p-3'>
                                                <h4 className='text-capitalize'>create product</h4>
                                                <div className='w-100 mt-5 text-end'>
                                                        <LinkContainer to="/create">
                                                                <span className='color-red text-capitalize underline pointer'>create product...</span>
                                                        </LinkContainer>
                                                </div>
                                                </div>
                                        </div>
                                : null
                        }
                        {
                                user.current && user.current.role === "user" ? 
                                        <div className='dashboard-order'>
                                                <div className='box p-3'>
                                                <h3 className='text-capitalize underline'>your order status</h3>
                                                <YourOrder/>
                                                </div>
                                        </div>
                                : null
                        }
                        {
                                user.current && user.current.role === "admin" ? 
                                        <div className='dashboard-update-status'>
                                                <div className='box p-3'>
                                                        <h3 className='text-capitalize underline'>client all orders</h3>
                                                        <div className='w-100 mt-5 text-end'>
                                                                <LinkContainer to="/update">
                                                                        <span className='color-red text-capitalize underline pointer'>update client orders...</span>
                                                                </LinkContainer>
                                                        </div>
                                                </div>
                                        </div>
                                : null
                        }
                    </div>
            </div>
    </AnimatePage>
  )
}

export default Dashboard