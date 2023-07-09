import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({product}) => {
  return (
        <div className='card card_width'>
                <LazyLoadImage
                    className='card-img-top card-img-height'
                    alt='no img loaded'
                    src={`${product.imageURL[0]}`}
                    effect='blur'
                    draggable={false}
                />
                <div className='card-body'>
                        <h5 className='card-title'>{product.title}</h5>
                        <h6 className='card-title color-red'>RM{product.price}.00</h6>
                        <p className='card-text'>{product.description}</p>
                        <LinkContainer to={`/one/${product.id}`}>
                                <button type='button' className='btn btn-customize-red'>Details</button>
                        </LinkContainer>
                </div>
        </div>
  )
}

export default ProductItem