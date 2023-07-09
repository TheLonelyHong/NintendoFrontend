import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import RatingComments from './RatingComments';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { LinkContainer } from 'react-router-bootstrap';
import { addItems , getTotalAndQuantity } from '../../redux/Slice/cartSlice';
import { showMsg } from '../../utils/tools';

const Details = () => {

    const product = useSelector(state => state.product);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [quantity , setQuantity] = useState(1);

    const handleQuantity = (type) => {
                switch(type){
                        case 'ADD':
                            if(quantity >= Number(product.one.stock)){
                                    setQuantity(Number(product.one.stock));
                            }else{
                                    setQuantity((prevState) => prevState + 1);
                            }
                            break;
                        case 'MINUS':
                            if(quantity <= 1){
                                    setQuantity(1)
                            }else{
                                    setQuantity((prevState) => prevState - 1);
                            }
                            break;
                        default:
                            return false;
                }
    }

    const handleCart = (category , title , price , imgURL , id , stock) => {
            dispatch(addItems({category , title , price , quantity:quantity , imgURL , id , stock}));
            dispatch(getTotalAndQuantity());
            showMsg("Added to cart" , "SUCCESS")
    }

  return (
    <>
        {
            product.one && product.one.rating? 
                <>
                    <div className='p-4'>
                            <h5>Category: {product.one.category}</h5>
                            <h4>{product.one.title}</h4>
                            <h6 className='color-red'>RM{product.one.price}.00</h6>
                            <h6>Stock: {product.one.stock ? "In Stock" : "Out of stock"}</h6>
                            <p>{product.one.description}</p>
                            <div className='mt-2'>
                                    <Rating readOnly value={product.one.rating.length}/>
                            </div>
                    </div>
                    <div className='p-4'>
                            <RatingComments/>
                    </div>
                    <div className='mt-4 p-4'>
                        {
                            user.current.email ? 
                                <div className='d-flex justify-content-start align-items-center gap-3'>
                                    <div className='d-flex gap-3 align-items-end'>
                                            <button type='button' className='btn' onClick={() => handleQuantity("MINUS")}>
                                                    <RemoveIcon/>
                                            </button>
                                            <h4>{quantity}</h4>
                                            <button type='button' className='btn' onClick={() => handleQuantity("ADD")}>
                                                    <AddIcon/>
                                            </button>
                                    </div>
                                    <button type='button' className='btn btn-customize-red' onClick={() => handleCart(product.one.category , product.one.title , product.one.price , product.one.imageURL[0] , product.one.id , product.one.stock)}>
                                            <ShoppingCartIcon/> Add to cart
                                    </button>
                                </div>
                            :
                                <LinkContainer to="/login">
                                    <button type='button' className='btn btn-customize-black'>
                                            <PersonIcon/> Login first
                                    </button>
                                </LinkContainer>
                        }
                    </div>
                </>
            : null
        }
    </>
  )
}

export default Details