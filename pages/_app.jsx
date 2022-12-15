import { authActions } from '@/redux/auth/authSlice';
import { wrapper } from '@/redux/store';
import 'animate.css/animate.min.css';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp'
  });
  useEffect(() => {
    const user = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    if (user && session) {
      dispatch(authActions.authStateChange({ user, session }));
    }
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        width="500px"
        transition={toastTransition}
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
