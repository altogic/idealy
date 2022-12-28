import Button from '@/components/Button';
import Input from '@/components/Input';
import Providers from '@/components/Providers';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie, deleteCookie } from 'cookies-next';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { generateUrl, setSessionCookie } from '../utils';

export default function Login({ invitation }) {
  const loginSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.loginError);
  const loading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const loginOnSuccess = async (companies, session, user) => {
    setSessionCookie(session, {
      _id: user._id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      canCreateCompany: user.canCreateCompany,
      isDeleted: user.isDeleted
    });
    if (_.isNil(invitation)) {
      if (companies.length === 0) {
        router.push(generateUrl('create-new-company'));
      } else if (companies.length === 1) {
        router.push(generateUrl('public-view', companies[0].subdomain));
      } else {
        router.push(generateUrl('select-company'));
      }
    } else {
      const company = companies.find((c) => c._id === invitation.companyId);
      dispatch(companyActions.updateMemberStatus({ companyId: invitation.companyId }));
      router.push(generateUrl('public-view', company.subdomain));
    }
  };
  async function formSubmit(data) {
    dispatch(
      authActions.login({
        ...data,
        onSuccess: (companies, session, user) => loginOnSuccess(companies, session, user)
      })
    );
  }

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError('password', { type: 'manuel', message: err.message });
        setError('email', { type: 'manuel', message: null });
      });
    }
  }, [error, setError]);

  useEffect(() => {
    setValue('email', invitation?.email);
  }, [invitation]);

  useEffect(() => {
    if (user && company && _.isNil(invitation)) {
      router.push(generateUrl('public-view', company.subdomain));
    }
    return () => {
      dispatch(authActions.clearError());
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Login</title>
        <meta name="description" content="Altogic Canny Alternative Login" />
      </Head>
      <div className="relative h-screen">
        <a
          href="https://www.altogic.com/"
          className="flex fixed bottom-3 right-3 sm:bottom-8 sm:right-8 z-50"
          target="_blank"
          rel="noreferrer">
          <img src="./powered-by-altogic.svg" alt="" />
        </a>
        <div className="grid xl:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div className="flex flex-col items-center">
                <img className="w-[192px] h-[66px] mb-6" src="./logo-black.svg" alt="Altogic" />
                <h2 className="text-3xl font-semibold text-slate-800">Welcome Back!</h2>
                <p className="text-slate-600 mt-3 text-base tracking-sm">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
                    <Input
                      label="Email"
                      type="email"
                      id="email"
                      name="email"
                      error={errors.email}
                      register={register('email')}
                      placeholder="johndoe@example.com"
                      disabled={!!invitation?.email}
                    />

                    <Input
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      error={errors.password}
                      register={register('password')}
                      placeholder="Enter your password"
                    />

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link href="/forgot-password">
                          <a className="text-indigo-700 text-sm font-medium tracking-sm hover:text-indigo-500">
                            Forgot your password?
                          </a>
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      loading={loading}
                      text="Sign in"
                      variant="indigo"
                      fullWidth
                    />
                    <div className="mt-6 relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">Or continue with</span>
                      </div>
                    </div>
                    <Providers invitation={invitation} />
                  </form>
                  <p className="text-center mt-8 text-sm text-slate-500">
                    Don’t have an account?{' '}
                    <Link href={generateUrl('register')}>
                      <a className="text-indigo-700 text-sm font-medium tracking-sm hover:text-indigo-500">
                        Sign up
                      </a>
                    </Link>
                  </p>
                </div>
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
export async function getServerSideProps({ req, res }) {
  const invitation = JSON.parse(getCookie('invitation-token', { req, res }) || null);
  deleteCookie('invitation-token', { req, res });
  deleteCookie('user', { req, res });
  deleteCookie('session', { req, res });
  deleteCookie('session_token', { req, res });
  if (invitation) {
    return {
      props: {
        invitation
      }
    };
  }
  return {
    props: {}
  };
}
