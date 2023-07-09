import React from 'react';
import { motion } from 'framer-motion';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader , showMsg } from '../../utils/tools';
import { useDispatch , useSelector } from 'react-redux';
import { createUser } from '../../redux/Thunk/userThunk';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const { email , username , password , confirmPassword } = formProps;
        if(!email || !username || !password || !confirmPassword){
                  showMsg("Any of these cannot be blank!" , "ERROR");
                  return;
        }
        if(password !== confirmPassword){
                  showMsg("Password not match!" , "ERROR");
                  return;
        }

        dispatch(createUser({username , email , password}))
            .then((con) => {
                        if(con.type === "user/createUser/fulfilled"){
                              navigate('/product')
                        }else{
                              navigate('/register');
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
                                  <label htmlFor='username' className='form-label weightBold'>Username: </label>
                                  <div className='form-floating'>
                                        <input type='text' className='form-control' id='usernameHolder' placeholder='username...' name='username'/>
                                        <label htmlFor='usernameHolder'>Username...</label>
                                  </div>
                              </div>
                              <div className='mt-2'>
                                  <label htmlFor='password' className='form-label weightBold'>Password: </label>
                                  <div className='form-floating'>
                                        <input type='password' className='form-control' id='passwordHolder' placeholder='password...' name='password'/>
                                        <label htmlFor='passwordHolder'>Password...</label>
                                  </div>
                              </div>
                              <div className='mt-2'>
                                  <label htmlFor='confirmPassword' className='form-label weightBold'>Confirm Password: </label>
                                  <div className='form-floating'>
                                        <input type='password' className='form-control' id='confirmPasswordHolder' placeholder='confirmPassword...' name='confirmPassword'/>
                                        <label htmlFor='confirmPasswordHolder'>Confirm Password...</label>
                                  </div>
                              </div>
                              <div className='w-100 d-flex justify-content-end align-items-center mt-2'>
                                    <button type='submit' className='btn btn-customize-red button-width'>Sign Up</button>
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
                          <LinkContainer to="/login">
                                <span className='color-red underline pointer'>Want to Sign In ?</span>
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

export default Register