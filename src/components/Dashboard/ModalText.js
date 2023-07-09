import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import {orderCompleted , getClientOrder} from '../../redux/Thunk/orderThunk';
import { useDispatch } from 'react-redux';

const ModalText = ({show , close , orderID}) => {

        const dispatch = useDispatch();

        const orderCompleteTask = () => {
                        dispatch(orderCompleted({orderID}))
                         .then(() => {
                                dispatch(getClientOrder());
                         })
        }

  return (
    <>
        <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                        <Modal.Title className='color-red'>Warning ! <WarningIcon/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h5>
                            This cannot be undo , are you sure ? 
                            <WarningIcon/>
                        </h5>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant='secondary' onClick={close}>
                                Close
                        </Button>
                        <Button variant='warning' onClick={() => {
                                        orderCompleteTask();
                                        close();
                        }}>
                                Receive <WarningIcon/>
                        </Button>
                </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalText