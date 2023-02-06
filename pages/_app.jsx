import { authActions } from '@/redux/auth/authSlice';
import { wrapper } from '@/redux/store';
import localStorageUtil from '@/utils/localStorageUtil';
import 'animate.css/animate.min.css';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp'
  });
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();

  useEffect(() => {
    const guestInfo = localStorageUtil.get('guestAuthentication');
    if (guestInfo) {
      dispatch(authActions.setGuestInfo(guestInfo));
    }
  }, []);
  useEffect(() => {
    const theme = localStorageUtil.get('theme');
    document.body.className = theme;
  }, []);
  useEffect(() => {
    if (company) {
      document.title = company.name;
      document.body.className = company.theme;
      localStorageUtil.set('theme', company.theme);
      localStorageUtil.set('companyId', company._id);
    }
  }, [company]);

  useEffect(() => {
    const userFromCookie = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    if (userFromCookie && session) {
      dispatch(authActions.authStateChange({ user: userFromCookie, session }));
      localStorage.removeItem('guestAuthentication');
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
