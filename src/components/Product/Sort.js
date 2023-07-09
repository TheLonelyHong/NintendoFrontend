import React from 'react';
import { useDispatch } from 'react-redux';
import { sortProduct } from '../../redux/Slice/productSlice';

const Sort = () => {

    const dispatch = useDispatch();

    const handleSort = (e) => {
                const sort = e.target.value;
                dispatch(sortProduct({sort}));
    }

  return (
    <div className='d-flex justify-content-between align-items-center'>
            <div className='sort-basis-1 p-1'>
                <div className='border_bottom'>{" "}</div>
            </div>
            <div className='sort-basis-2'>
                    <select className='form-select' onChange={handleSort}>
                            <option value="">Sort...</option>
                            <option value="nameA_Z">Name A - Z</option>
                            <option value="nameZ_A">Name Z - A</option>
                            <option value="price_lowest">Price lowest</option>
                            <option value="price_highest">Price highest</option>
                    </select>
            </div>
    </div>
  )
}

export default Sort