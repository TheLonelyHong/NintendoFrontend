import React from 'react';
import { motion } from 'framer-motion';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userSignIn } from '../../redux/Thunk/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { Loader , showMsg } from '../../utils/tools';
import { getClientOrder } from '../../redux/Thunk/orderThunk';


const Login = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const formProps = Object.fromEntries(formData);
          const { email , password } = formProps;
          if(!email || !password){
                  showMsg("Please enter email and password!" , "ERROR");
                  return;
          }

          dispatch(userSignIn({email , password}))
            .then((con) => {
                        if(con.type === "user/userSignIn/fulfilled"){
                                    dispatch(getClientOrder());
                                    navigate("/product");
                        }else{
                                    navigate("/login");
                        }
            });
  }


  return (
    <motion.section
        initial={{opacity:0}}
        animate={{opacity:1 , transition:{duration:0.5}}}
        exit={{opacity:0 , transition:{duration:0.5}}}
    >
          <div className='width-50 mt-4 min-height'>
                <form onSubmit={handleSubmit}>
                        <div>
                              <label htmlFor='email' className='form-label weightBold'>Email: </label>
                              <div className='form-floating'>
                                    <input type='email' className='form-control' id='emailHolder' placeholder='email...' name='email'/>
                                    <label htmlFor='emailHolder'>Email address...</label>
                              </div>
                        </div>
                        <div className='mt-2'>
                              <label htmlFor='password' className='form-label weightBold'>Password: </label>
                              <div className='form-floating'>
                                    <input type='password' className='form-control' id='passwordHolder' placeholder='password...' name='password'/>
                                    <label htmlFor='passwordHolder'>Password...</label>
                              </div>
                        </div>
                        <div className='w-100 d-flex justify-content-end align-items-center mt-2'>
                              <button type='submit' className='btn btn-customize-red button-width'>Sign In</button>
                        </div>
                        {
                              user.loading ? 
                                    <>
                                          <Loader/>
                                    </>
                              : null
                        }
                </form>
                <div className='mt-3 text-center'>
                          <LinkContainer to="/register">
                                <span className='color-red underline pointer'>No account ? Want to register ?</span>
                          </LinkContainer>
                </div>
                <div className='mt-3 text-center'>
                          <LinkContainer to="/forgot">
                                <span className='color-red underline pointer'>Forgot password ?</span>
                          </LinkContainer>
                </div>
          </div>
    </motion.section>
  )
}

export default Login