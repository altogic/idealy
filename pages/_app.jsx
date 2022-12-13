import { useEffect } from 'react';
import { wrapper } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import { getCookie } from 'cookies-next';
import { authActions } from '@/redux/auth/authSlice';
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
    const selectedCompany = JSON.parse(getCookie('selectedCompany') || null);
    if (user && session) {
      dispatch(authActions.authStateChange({ user, session }));
    }
    if (selectedCompany) {
      dispatch(companyActions.selectCompany(selectedCompany));
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
