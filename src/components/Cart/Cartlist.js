import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import { addOrReduce , getTotalAndQuantity , removeItem , clearCart } from '../../redux/Slice/cartSlice';
import StripeCheckout from 'react-stripe-checkout';
import { updateUserOrder } from '../../redux/Thunk/userThunk';
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';


const Cartlist = () => {

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const [paynow , setPaynow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToggle = (id , type) => {
            dispatch(addOrReduce({id , type}));
    }

    const handleRemove = (id) => {
            dispatch(removeItem({id}));
    }

    const payment = async(token) => {
                const items = cart.items;
                dispatch(updateUserOrder({items , total:cart.total_price}))
                   .then(() => {
                                dispatch(clearCart());
                                navigate("/dashboard");
                   });
                
                await axios.post(`${process.env.REACT_APP_STRIPE_LINK}/paynow` , {
                        amount:cart.total_price * 100,
                        token
                });
    }

    useEffect(() => {
            dispatch(getTotalAndQuantity());
            // eslint-disable-next-line
    } , [handleToggle]);

  return (
    <div className='container mt-5'>
                {
                    cart.items ? 
                        <>
                            {
                                cart.items.map((item) => (
                                    <div className='d-flex align-items-center border-bottom pb-4 mt-4 gap-3' key={item.id}>
                                            <div className='cart_img'>
                                                    <LazyLoadImage
                                                        src={`${item.imgURL}`}
                                                        className='cart_inner_img'
                                                        effect='blur'
                                                        alt='no img loaded'
                                                    />
                                            </div>
                                            <div className='cart_details'>
                                                    <h5 className='font-adjust'>{item.title}</h5>
                                                    <h6 className='font-smaller'>Category: {item.category}</h6>
                                                    <h6 className='color-red font-smaller'>RM{item.price}.00</h6>
                                                    <button type='button' className='btn btn-danger' onClick={() => handleRemove(item.id)}>
                                                            Remove
                                                    </button>
                                            </div>
                                            <div className='cart_quantity d-flex flex-column align-items-center'>
                                                    <button type='button' className='btn' onClick={() => handleToggle(item.id , "DEC")}>
                                                            <RemoveIcon/>
                                                    </button>
                                                    <h4>{item.quantity}</h4>
                                                    <button type='button' className='btn' onClick={() => handleToggle(item.id , "ADD")}>
                                                            <AddIcon/>
                                                    </button>
                                            </div>
                                    </div>                                      
                                ))
                            }
                        </>                      
                    : null
                }
                <div className='w-100 d-flex justify-content-end align-items-center mt-4'>
                        <div className='cart-width'>
                            <div className='border-black'>
                                    <h5 className='color-red underline mb-4'>Total</h5>
                                    <h6 className='mb-2'>Quantity : {cart.total_quantity}</h6>
                                    <h6 className='mb-2'>Price : RM{cart.total_price}.00</h6>
                            </div>
                            <button className='w-100 btn btn-primary mt-4 mb-4' type='button' onClick={() => setPaynow(!paynow)}>
                                    Proceed to payment <PaymentIcon/>
                            </button>
                            <h4>Please use 4242 4242 4242 4242, just test only</h4>
                            {
                                paynow && user.current.id? 
                                        <StripeCheckout
                                              stripeKey='pk_test_51MVXLeGP27pAeUGnqP1DjI1hhbs9Zpk6lpKrqrerXKX6u00iFvtmLk2qEdNTfZ8bnuDTtfWu70iXyYFMzHDV8L0K00P8Aktdkk'
                                              name='Nintendo Online'
                                              amount={cart.total_price * 100}
                                              label='Pay Now'
                                              description={`Your payment is ${cart.total_price}`}
                                              email={`${user.current.email}`}
                                              className="mt-3 mb-4"
                                              token={payment}
                                        />
                                : null
                            }
                        </div>
                </div>
    </div>
  )
}

export default Cartlist