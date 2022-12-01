import { useEffect } from 'react';
import { wrapper } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp'
  });
  useEffect(() => {
    if (!company) {
      dispatch(
        companyActions.selectCompany(JSON.parse(localStorage.getItem('selectedCompany') || '[]'))
      );
    }
  }, [company]);

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
