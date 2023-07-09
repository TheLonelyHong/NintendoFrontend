import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getClientOrder } from '../../redux/Thunk/orderThunk';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ReceiveButton from './ReceiveButton';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Loader , convertTimestamp } from '../../utils/tools';

const YourOrder = () => {

  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(getClientOrder());
          // eslint-disable-next-line
  } , []);

  return (
    <>
      {
        order.loading ? 
          <>
            <Loader/>
          </>
        : 
        <>
            {
              order.client.length !== 0 ? 
              <>
              {
                order.client.map((item) => (
                    <div key={item.id} className='mt-3 mb-3 border-bottom'>
                                  {
                                    item.items.map((thing , index) => (
                                        <div key={index + thing.id} className='p-4 order-container'>
                                                <div className='order-item-1'>
                                                      <LazyLoadImage
                                                            src={`${thing.imgURL}`}
                                                            className='order-img'
                                                            alt='no img loaded'
                                                            effect='blur'
                                                            draggable={false}
                                                      />
                                                </div>
                                                <div className='order-item-2'>
                                                      <h4>{thing.title}</h4>
                                                      <h5>Quantity: {thing.quantity}</h5>
                                                      <h6>Category: {thing.category}</h6>
                                                      <h6 className='color-red'>Price: RM{thing.price}.00</h6>
                                                </div>
                                        </div>
                                    ))
                                  }
                                  <h5 className='text-capitalize mt-3'>total price: RM{item.total}.00</h5>
                                  <h5 className='text-capitalize mt-3 color-red'>status: {item.status}</h5>
                                  <h5 className='mt-3 text-capitalize'>order at: {convertTimestamp(item.createdAt.seconds , item.createdAt.nanoseconds)}</h5>
                                  <h5 className='mt-3 color-red'>Order ID: {item.id}</h5>
                                  {
                                    item.status === "Completed" ? 
                                      null
                                    : 
                                      <ReceiveButton orderID = {item.id}/>
                                  }
                          </div>
                      ))
                    }   
                </>             
              : 
                <>
                    <h5 className='mt-5 color-red'>Seems like no orders <VolunteerActivismIcon/></h5>
                </>
            }
        </>
      }
    </>
  )
}

export default YourOrder