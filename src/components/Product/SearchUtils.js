import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProduct , loadCategory , searchDatabase } from '../../redux/Thunk/productThunk';
import { filterControllerColor } from '../../redux/Slice/productSlice';


const SearchUtils = () => {

    const [ controller , setController ] = useState("");
    const dispatch = useDispatch();

    const handleCategory = (e) => {
          const category = e.target.value;
          setController(category);
          if(category === ''){
                  dispatch(fetchProduct());
          }else{
                  dispatch(loadCategory({category}));
          }
    }

    const handleColor = (e) => {
          const color = e.target.value;
          dispatch(filterControllerColor({color}));
    }

    const handleSearch = (e) => {
          const words = e.target.value;
          if(!words){
                dispatch(fetchProduct());
          }else{
                dispatch(searchDatabase({words}));
          }
    }

  return (
    <>
        <div className='p-2'>
                        <div>
                                <label htmlFor='search' className='form-label text-capitalize'>search product : </label>
                                <input type='text' className='form-control' placeholder='Search...' onChange={handleSearch}/>
                        </div>
                        <div className='mt-2'>
                                <label htmlFor='product' className='form-label text-capitalize'>Product category : </label>
                                <select className='form-select' onChange={handleCategory}>
                                        <option value="">Please choose...</option>
                                        <option value="console">Gaming Console</option>
                                        <option value="games">Games</option>
                                        <option value="controller">Controller</option>
                                </select>
                        </div>
                        {
                            controller === "controller" ? 
                                <div className='mt-2'>
                                            <label htmlFor='color' className='form-label text-capitalize'>Product color : </label>
                                            <div className='mt-2 d-flex gap-3 flex-wrap'>
                                                       <div className='form-check'>
                                                              <input className='form-check-input' type='radio' name='color' id='grey' value="#938D8F" onChange={handleColor}/>
                                                              <div className='smallboxarea smallboxgrey' htmlFor="grey"></div>
                                                       </div>
                                                       <div className='form-check'>
                                                              <input className='form-check-input' type='radio' name='color' id='black' value="#111111" onChange={handleColor}/>
                                                              <div className='smallboxarea smallboxblack' htmlFor="black"></div>
                                                       </div>
                                                       <div className='form-check'>
                                                             <input className='form-check-input' type='radio' name='color' id='yellow' value="#ffcc00" onChange={handleColor}/>
                                                             <div className='smallboxarea smallboxyellow' htmlFor="yellow"></div>
                                                       </div>
                                                       <div className='form-check'>
                                                              <input className='form-check-input' type='radio' name='color' id='blue' value="#0055ff" onChange={handleColor}/>
                                                              <div className='smallboxarea smallboxblue' htmlFor="blue"></div>
                                                      </div>
                                                      <div className='form-check'>
                                                             <input className='form-check-input' type='radio' name='color' id='white' value="#fdfdfd" onChange={handleColor}/>
                                                             <label htmlFor="white" className='form-check-label'>White</label>
                                                      </div>
                                            </div>
                                </div>
                            : null
                        }
        </div>
    </>
  )
}

export default SearchUtils