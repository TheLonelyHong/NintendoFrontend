import React from 'react';
import Swipe from './Swipe';
import Details from './Details';
import { useSelector } from 'react-redux';
import Image from './Image';


const LoadedPage = () => {

        const product = useSelector(state => state.product);

  return (
    <div className='container mt-4'>
            <div className='load-container'>
                    <div className='load-item-1'>
                            <Swipe/>
                            <div className='load-item-inner-1'>
                                        {
                                                product.one && product.one.imageURL ? 
                                                        <>
                                                                {
                                                                        product.one.imageURL.map((item , index) => (
                                                                                <div key={index}>
                                                                                        <Image img={item}/>
                                                                                </div>
                                                                        ))
                                                                }
                                                        </>
                                                : null
                                        }
                            </div>
                    </div>
                    <div className='load-item-2'>
                            <Details/>
                    </div>
            </div>
    </div>
  )
}

export default LoadedPage