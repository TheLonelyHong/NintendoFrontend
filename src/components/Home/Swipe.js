import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector , useDispatch } from 'react-redux';
import { extractConsoleOut } from '../../redux/Thunk/productThunk';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination , Navigation } from "swiper";

const Swipe = () => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
            dispatch(extractConsoleOut());
            // eslint-disable-next-line
    } , []);

  return (
    <>
        {
            product.consoleProducts ? 
                <Swiper
                    navigation={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable:true
                    }}
                    breakpoints={{
                            550:{
                                    slidesPerView:1
                            },
                            768:{
                                    slidesPerView:2,
                                    spaceBetween:25
                            },
                            1100:{
                                    slidesPerView:3,
                                    spaceBetween:20
                            },
                            1600:{
                                    slidesPerView:4,
                                    spaceBetween:10
                            }
                    }}
                    modules={[Pagination , Navigation]}
                    className='mySwiper padding-bottom'
                    style={{
                        "--swiper-navigation-size":"25px",
                        "--swiper-navigation-color":"#000",
                        "--swiper-pagination-color":"#EA2158"
                    }}
                >
                        {
                            product.consoleProducts.map((item) => (
                                    <SwiperSlide key={item.id}>
                                            <div className='swipe-box w-100 p-1'>
                                                    <div className='swipe-img-box w-100'>
                                                            <LazyLoadImage
                                                                src={`${item.imageURL[0]}`}
                                                                alt='no img loaded'
                                                                className='swipe-img-con'
                                                                effect='blur'
                                                                width={'100%'}
                                                            />
                                                    </div>
                                                    <div className='swipe-box-text p-2'>
                                                            <h5>{item.title}</h5>
                                                            <h6>Category: {item.category}</h6>
                                                            <h6 className='color-red'>Price: RM{item.price}.00</h6>
                                                            <LinkContainer to={`/one/${item.id}`}>
                                                                    <button type='button' className='btn btn-customize-red mt-1'>
                                                                            Details
                                                                    </button>
                                                            </LinkContainer>
                                                    </div>
                                            </div>
                                    </SwiperSlide>
                            ))
                        }
                </Swiper>
            : null
        }
    </>
  )
}

export default Swipe