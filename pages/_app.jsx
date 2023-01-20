import { ideaActions } from '@/redux/ideas/ideaSlice';
import { wrapper } from '@/redux/store';
import localStorageUtil from '@/utils/localStorageUtil';
import 'animate.css/animate.min.css';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp'
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const guestInfo = localStorageUtil.get('guestAuthentication');
    if (guestInfo) {
      dispatch(ideaActions.setGuestInfo(guestInfo));
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
