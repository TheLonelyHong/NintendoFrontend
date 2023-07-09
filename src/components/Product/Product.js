import React from 'react';
import AnimatePage from '../../hoc/AnimatePage';
import SearchUtils from './SearchUtils';
import Items from './Items';

const Product = () => {

      

  return (
    <AnimatePage>
            <div className='container mt-5'>
                    <div className='flex-container'>
                          <div className='flex-item-1'>
                                <SearchUtils/>
                          </div>
                          <div className='flex-item-2'>
                                <Items/>
                          </div>
                    </div>
            </div>
    </AnimatePage>
  )
}

export default Product