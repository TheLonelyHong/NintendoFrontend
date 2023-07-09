import React from 'react';
import { Swiper , SwiperSlide } from 'swiper/react';
import { Navigation , Pagination } from 'swiper';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'react-lazy-load-image-component/src/effects/blur.css';



const Swipe = () => {

    const product = useSelector(state => state.product);

  return (
        <>
            {
                product.one && product.one.imageURL? 
                        <div>
                                <div>
                                    <Swiper
                                        navigation={true}
                                        modules={[Navigation , Pagination]}
                                        className='mySwiper'
                                        style={{
                                            "--swiper-navigation-size":"25px",
                                            "--swiper-navigation-color":"#EA2158",
                                            "--swiper-pagination-color":"#EA2158"
                                        }}
                                        pagination={true}
                                    >
                                            {
                                                product.one.imageURL.map((item , index) => (
                                                        <SwiperSlide key={index} className='w-100'>
                                                                    <div className='w-100 padding'>
                                                                            <LazyLoadImage
                                                                                src={`${item}`}
                                                                                alt='no img loaded'
                                                                                width={"100%"}
                                                                                height={"550px"}
                                                                                className='swipe-img'
                                                                                effect='blur'
                                                                            />
                                                                    </div>
                                                        </SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                </div>
                        </div>                    
                : null
            }
        </>
  )
}

export default Swipe