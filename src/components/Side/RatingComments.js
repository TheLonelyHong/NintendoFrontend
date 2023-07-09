import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import { auth } from '../../firebase/firebase';
import { showMsg } from '../../utils/tools';

const RatingComments = () => {

  const handleRating = () => {
        if(!auth?.currentUser?.email){
                  showMsg("Please login to rate !" , "ERROR");
                  return;
        }
  };


  return (
    <>
        <div className='btn-group w-100'>
                <button type='button' className='btn btn-warning' onClick={handleRating}> <StarIcon/>Rating</button>
                <button type='button' className='btn btn-customize-red'> <CommentIcon/>Ask questions</button>
        </div>
    </>
  )
}

export default RatingComments