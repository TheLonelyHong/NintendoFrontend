import { BrowserRouter } from 'react-router-dom';
import HeadBar from './components/HeadBar/Headbar';
import MainLayout from './hoc/MainLayout';
import AnimateRoute from './hoc/AnimateRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useEffect, useState } from 'react';
import { Loader } from './utils/tools';
import { extractUserDataOut } from './redux/Thunk/userThunk';
import { useDispatch } from 'react-redux';
import Footer from './components/Home/Footer';

function App() {

  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
            onAuthStateChanged(auth , (user) => {
                      if(user){
                            dispatch(extractUserDataOut({email:user.email}));
                            setLoading(false);
                      }else{
                            setLoading(false);
                      }
            });
            // eslint-disable-next-line
  } , []);

  return (
      <>
          {
            loading ? 
              <>
                <Loader/>
              </>
            :
            
            <BrowserRouter>
                      <HeadBar/>
                      <MainLayout>
                            <AnimateRoute/>
                      </MainLayout>
                      <Footer/>
            </BrowserRouter>
          }
      </>
  );
}

export default App;
