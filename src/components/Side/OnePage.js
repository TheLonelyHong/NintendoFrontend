import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { onePageAccess } from '../../redux/Thunk/productThunk';
import { Loader } from '../../utils/tools';
import LoadedPage from './LoadedPage';
import AnimatePage from '../../hoc/AnimatePage';

const OnePage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
                dispatch(onePageAccess({id}));
            // eslint-disable-next-line
    } , []);

  return (
    <AnimatePage>
        {
            product.loading ? 
                <>
                    <Loader/>
                </>
            : 
                <>
                    {
                        product.one ? 
                                <LoadedPage/>
                        :
                            <>
                                <h2>No product loaded</h2>
                            </>
                    }
                </>
        }
    </AnimatePage>
  )
}

export default OnePage