import React , { useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ModalText from './ModalText';

const ReceiveButton = ({orderID}) => {

    const [show , setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

  return (
    <div className='w-100 mt-3 d-flex justify-content-end align-items-center mb-3'>
        <button type='button' className='btn btn-warning button-width' onClick={() => handleShow()}>
            Receive <LocalShippingIcon/>
        </button>
        <ModalText show={show} close = {() => handleClose()} orderID = {orderID}/>
    </div>
  )
}

export default ReceiveButton