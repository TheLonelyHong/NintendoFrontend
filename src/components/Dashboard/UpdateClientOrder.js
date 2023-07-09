import React, { useEffect } from 'react';
import AnimatePage from '../../hoc/AnimatePage';
import { useSelector , useDispatch } from 'react-redux';
import { getAllOrders } from '../../redux/Thunk/orderThunk';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UpdateStatus from './UpdateStatus';
import 'react-lazy-load-image-component/src/effects/blur.css';

const UpdateClientOrder = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order);

    useEffect(() => {
            dispatch(getAllOrders());
            // eslint-disable-next-line
    } , []);

  return (
        <>
            {
                user.current && user.current.role === "admin" ? 
                    <AnimatePage>
                            <div className='container min-height mb-5'>
                                        <h4 className='text-capitalize underline text-center'>client orders</h4>
                                        {
                                            orders.allOrders && orders.allOrders.map((item , index) => (
                                                    <div key={item.id} className='shadow p-2 mb-3'>
                                                            <h3>{index + 1}.</h3>
                                                            <div className='p-3'>
                                                                <h5 className='color-red'>Order ID: {item.id}</h5>
                                                                <h6 className='text-capitalize mt-2'>status: {item.status}</h6>
                                                                <h4 className='text-capitalize mt-2'>Items: </h4>
                                                                {
                                                                    item.items.map((ref) => (
                                                                            <div key={ref.id} className='p-1 mt-2'>
                                                                                    <div className='update-container'>
                                                                                            <div className='update-box-1'>
                                                                                                    <LazyLoadImage
                                                                                                        src={`${ref.imgURL}`}
                                                                                                        alt='no img loaded'
                                                                                                        effect='blur'
                                                                                                        className='update-img'
                                                                                                    />
                                                                                            </div>
                                                                                            <div className='update-box-2'>
                                                                                                    <h5 className='text-capitalize'>{ref.title}</h5>
                                                                                                    <h6 className='text-capitalize'>category: {ref.category}</h6>
                                                                                                    <h6 className='text-capitalize'>quantity: {ref.quantity}</h6>
                                                                                                    <h6 className='text-capitalize color-red'>price: RM{ref.price}.00</h6>
                                                                                            </div>
                                                                                    </div>
                                                                            </div>
                                                                    ))
                                                                }
                                                                <UpdateStatus orderID = {item.id} packedName = {user.current.username}/>
                                                            </div>
                                                    </div>
                                            ))
                                        }
                            </div>
                    </AnimatePage>
                : 
                    <div className='w-100 mt-5'>
                            <h3 className='text-center'>You are not allowed to update client status</h3>
                    </div>
            }
        </>
  )
}

export default UpdateClientOrder