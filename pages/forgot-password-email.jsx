import Head from 'next/head';
import { useRouter } from 'next/router';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import BackToLogin from '@/components/BackToLogin';

export default function ForgotPasswordEmail() {
  const router = useRouter();
  const { email } = router.query;
  const dispatch = useDispatch();
  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Forgot Password Email</title>
        <meta name="description" content="Altogic Canny Alternative Forgot Password Email" />
      </Head>
      <div className="relative h-screen">
        <a
          href="https://www.altogic.com/"
          className="flex fixed bottom-3 right-3 sm:bottom-8 sm:right-8 z-50"
          target="_blank"
          rel="noopener noreferrer">
          <img src="./powered-by-altogic.svg" alt="" />
        </a>
        <div className="grid xl:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-6 ring-8 ring-indigo-50">
                  <svg
                    className="w-7 h-7 text-indigo-600"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.8333 10.4999C19.8333 9.9028 19.6055 9.30568 19.1499 8.85008C18.6943 8.39447 18.0972 8.16667 17.5 8.16667M17.5 17.5C21.366 17.5 24.5 14.366 24.5 10.5C24.5 6.63401 21.366 3.5 17.5 3.5C13.634 3.5 10.5 6.63401 10.5 10.5C10.5 10.8193 10.5214 11.1336 10.5628 11.4415C10.6309 11.948 10.6649 12.2013 10.642 12.3615C10.6181 12.5284 10.5877 12.6184 10.5055 12.7655C10.4265 12.9068 10.2873 13.046 10.009 13.3243L4.04673 19.2866C3.84496 19.4884 3.74407 19.5893 3.67192 19.707C3.60795 19.8114 3.56081 19.9252 3.53224 20.0442C3.5 20.1785 3.5 20.3212 3.5 20.6065V22.6333C3.5 23.2867 3.5 23.6134 3.62716 23.863C3.73901 24.0825 3.91749 24.261 4.13701 24.3728C4.38657 24.5 4.71327 24.5 5.36667 24.5H8.16667V22.1667H10.5V19.8333H12.8333L14.6757 17.991C14.954 17.7127 15.0932 17.5735 15.2345 17.4945C15.3816 17.4123 15.4716 17.3819 15.6385 17.358C15.7987 17.3351 16.052 17.3691 16.5585 17.4372C16.8664 17.4786 17.1807 17.5 17.5 17.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Check your email</h1>
                <p className="text-slate-500 mb-6 text-base tracking-sm">
                  We sent a password reset link to <br />{' '}
                  <span className="text-slate-700">{email}</span>
                </p>
                <p className="text-slate-500 mb-8 text-center text-sm tracking-sm">
                  Didn’t receive the email?{' '}
                  <button
                    type="button"
                    onClick={() => dispatch(authActions.forgotPassword({ email }))}
                    className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500">
                    Click to resend
                  </button>
                </p>
                <BackToLogin />
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-l-[40px]"
              src="./login.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
