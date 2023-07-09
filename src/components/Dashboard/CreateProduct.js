import React, { useState } from 'react';
import AnimatePage from '../../hoc/AnimatePage';
import ImageUpload from './ImageUpload';
import { useDispatch , useSelector } from 'react-redux';
import { uploadProduct } from '../../redux/Thunk/productThunk';
import { Loader , showMsg } from '../../utils/tools';


const CreateProduct = () => {

  const [image , setImage] = useState([]);
  const [controller , setController] = useState("");
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleImage = (imageList , addUpdateIndex) => {
        setImage(imageList);
  }

  const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const formProps = Object.fromEntries(formData);
          const { category , color , title , desc , price , stock } = formProps;
          
            if(!category || !title || !desc || !price || !stock){
                        showMsg("Please enter details before submit" , "ERROR");
                        return;
            }

            if(image.length !== 3){
                        showMsg("Please upload 3 images for reference" , "ERROR");
                        return;
            }

            dispatch(uploadProduct({category , color , title , desc , price , stock , image:image}));
  }

  return (
      <>
        {
            user.current && user.current.role === "admin" ? 
            <AnimatePage>
                        <div className='width-50 mt-4 min-height'>
                              <form onSubmit={handleSubmit}>
                                                <div>
                                                      <label htmlFor='category' className='form-label weightBold'>Item category: </label>
                                                      <div>
                                                            <select className='form-select' onChange={(e) => setController(e.target.value)} name='category'>
                                                                        <option value="">Select category</option>
                                                                        <option value="console">Gaming console</option>
                                                                        <option value="games">Games</option>
                                                                        <option value="controller">Controller</option>
                                                            </select>
                                                            {
                                                                  controller === 'controller' ? 
                                                                        <div className='mt-2 d-flex gap-3'>
                                                                              <div className='form-check'>
                                                                                    <input className='form-check-input' type='radio' name='color' id='grey' value="#938D8F"/>
                                                                                    <div className='smallboxarea smallboxgrey' htmlFor="grey"></div>
                                                                              </div>
                                                                              <div className='form-check'>
                                                                                    <input className='form-check-input' type='radio' name='color' id='black' value="#111111"/>
                                                                                    <div className='smallboxarea smallboxblack' htmlFor="black"></div>
                                                                              </div>
                                                                              <div className='form-check'>
                                                                                    <input className='form-check-input' type='radio' name='color' id='yellow' value="#ffcc00"/>
                                                                                    <div className='smallboxarea smallboxyellow' htmlFor="yellow"></div>
                                                                              </div>
                                                                              <div className='form-check'>
                                                                                    <input className='form-check-input' type='radio' name='color' id='blue' value="#0055ff"/>
                                                                                    <div className='smallboxarea smallboxblue' htmlFor="blue"></div>
                                                                              </div>
                                                                              <div className='form-check'>
                                                                                    <input className='form-check-input' type='radio' name='color' id='white' value="#fdfdfd"/>
                                                                                    <label htmlFor="white" className='form-check-label'>White</label>
                                                                              </div>
                                                                        </div>
                                                                  : null
                                                            }
                                                      </div>
                                                </div>
                                                <div className='mt-2'>
                                                      <label htmlFor='title' className='form-label weightBold'>Item name: </label>
                                                      <div className='form-floating'>
                                                            <input type='text' className='form-control' id='titleHolder' placeholder='item name...' name='title'/>
                                                            <label htmlFor='titleHolder'>Item name...</label>
                                                      </div>
                                                </div>
                                                <div className='mt-2'>
                                                      <label htmlFor='desc' className='form-label weightBold'>Item description: </label>
                                                      <div className='form-floating'>
                                                            <textarea className='form-control resize-none' id='descHolder' placeholder='item desc...' name='desc'></textarea>
                                                            <label htmlFor='descHolder'>Item desc...</label>
                                                      </div>
                                                </div>
                                                <div className='mt-2'>
                                                      <label htmlFor='price' className='form-label weightBold'>Item price: </label>
                                                      <div className='form-floating'>
                                                            <input type='number' className='form-control' id='priceHolder' placeholder='item price...' name='price'/>
                                                            <label htmlFor='priceHolder'>Item price...</label>
                                                      </div>
                                                </div>
                                                <div className='mt-2'>
                                                      <label htmlFor='stock' className='form-label weightBold'>Item stock: </label>
                                                      <div className='form-floating'>
                                                            <input type='number' className='form-control' id='stockHolder' placeholder='item stock...' name='stock'/>
                                                            <label htmlFor='stockHolder'>Item stock...</label>
                                                      </div>
                                                </div>
                                                <div className='mt-2 w-100'>
                                                      <ImageUpload image={image} handleImage = {handleImage}/>
                                                </div>
                                                <div className='mt-2 w-100 d-flex justify-content-end align-items-center'>
                                                      <button type='submit' className='btn btn-customize-red button-width'>Upload product</button>
                                                </div>
                              </form>
                              {
                                    product.loading ? 
                                          <>
                                                <Loader/>
                                          </>
                                    : null
                              }
                        </div>
            </AnimatePage>                  
            :
            <>
                  <div className='text-center mt-5'>
                              <h1>Your are not allowed to upload product.</h1>
                  </div>
            </>
        }
      </>
  )
}

export default CreateProduct