import React, { useEffect } from 'react';
import Sort from './Sort';
import { useDispatch , useSelector } from 'react-redux';
import { fetchProduct , loadMoreProduct } from '../../redux/Thunk/productThunk';
import { Loader } from '../../utils/tools';
import ProductItem from './ProductItem';
import RefreshIcon from '@mui/icons-material/Refresh';


const Items = () => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  
  const handleMoreProduct = () => {
          dispatch(loadMoreProduct());
  }

  useEffect(() => {
        dispatch(fetchProduct());
        // eslint-disable-next-line
  } , []);

  return (
    <div className='p-2'>
            <Sort/>
            {
              product.loading ? 
                <>
                  <Loader/>
                </>
              : 
                <>
                    {
                      product.allProducts ? 
                          <div className='d-flex justify-content-start align-items-start gap-3 flex-wrap mt-4 adjust-start'>
                              {
                                product.allProducts.map((product) => (
                                      <ProductItem key={product.id} product = {product}/>
                                ))
                              }
                          </div>
                      : null
                    }
                </>
            }

            {
              product.loadMoreLoading ? 
                <>
                  <Loader/>
                </>
              : null
            }

            {
              product.end ? 
                <>
                  <h4 className='mb-5'>No more products</h4>
                </>
              :
                <>
                  <button type='button' className='btn btn-secondary button-width mt-4' onClick={() => handleMoreProduct()}>
                    <RefreshIcon/>Load more
                  </button>
                </>
            }
    </div>
  )
}

export default Items