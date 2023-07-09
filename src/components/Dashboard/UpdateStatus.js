import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { getAllOrders , updateOrderStatus } from '../../redux/Thunk/orderThunk';
import { showMsg } from '../../utils/tools';
import { useDispatch } from 'react-redux';

const UpdateStatus = ({orderID , packedName}) => {

    const [open , setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const { status } = formProps;
            if(!status){
                    showMsg("Cannot be blank !" , "ERROR");
                    return;
            }
            dispatch(updateOrderStatus({orderID , status , packedName}))
             .then(() => {
                    dispatch(getAllOrders());
             });
    }

    const handleOpen = () => {
            setOpen(!open);
    }

  return (
    <div>
        <button type='button' className='btn btn-warning mt-2' onClick={() => handleOpen()}>Update status <EditIcon/></button>
        {
            open ? 
                <form onSubmit={handleSubmit}>
                            <input type='text' className='form-control mt-2' placeholder='Packed...' name='status'/>
                            <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            : null
        }
    </div>
  )
}

export default UpdateStatus