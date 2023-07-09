import React from 'react';
import { useSelector } from 'react-redux';
import Cartlist from './Cartlist';
import { LinkContainer } from 'react-router-bootstrap';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const Cart = () => {

  const cart = useSelector(state => state.cart);

  return (
    <>
      {
        cart.items.length !== 0 ? 
          <>
              <Cartlist/>
          </>
        : 
          <div className='container mt-5 w-100 min-height'>
            <div className='d-flex justify-content-center align-item-center'>
              <div>
                <h3>No items in your cart</h3>
                <LinkContainer to="/product">
                      <button type='button' className='btn btn-customize-red button_cart mt-4'>
                              Back to Store <StoreMallDirectoryIcon/>
                      </button>
                </LinkContainer>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Cart