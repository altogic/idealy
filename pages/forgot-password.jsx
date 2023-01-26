import Head from 'next/head';
import { useEffect } from 'react';
import { authActions } from '@/redux/auth/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '@/components/Input';
import Button from '@/components/Button';
import BackToLogin from '@/components/BackToLogin';

export default function ForgotPassword() {
  const forgotPasswordSchema = new yup.ObjectSchema({
    email: yup.string().email('Email must be valid.').required('Email is required')
  });
  const dispatch = useDispatch();
  const router = useRouter();
  async function formSubmit(data) {
    dispatch(
      authActions.forgotPassword({
        ...data,
        onSuccess: () => router.push(`/forgot-password-email?email=${data.email}`)
      })
    );
  }
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(forgotPasswordSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message !== 'A user with the provided email already exists.')
          setError('email', { type: 'manuel', message: err.message });
      });
    }
  }, [error, setError]);
  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Forgot Password</title>
        <meta name="description" content="Altogic Canny Alternative Forgot Password" />
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
                <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Forgot password?</h1>
                <p className="text-slate-600 text-base tracking-sm">
                  No worries, we’ll send you reset instructions.
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(formSubmit)} method="POST" className="space-y-6">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      label="Email *"
                      placeholder="Enter your email"
                      register={register('email')}
                      error={errors.email}
                    />

                    <Button
                      type="submit"
                      loading={loading}
                      text="Reset password"
                      variant="indigo"
                      fullWidth
                    />
                  </form>
                  <BackToLogin />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-l-[40px]"
              src="./forgot-password.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
