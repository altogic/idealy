import { useEffect } from 'react';
import Head from 'next/head';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Input from '@/components/Input';
import { authActions } from '@/redux/auth/authSlice';
import { useRouter } from 'next/router';
import { companyActions } from '@/redux/company/companySlice';
import { getCookie } from 'cookies-next';
import _ from 'lodash';
import Providers from '@/components/Providers';
import Button from '@/components/Button';
import companyService from '@/services/company';

export default function CreateAnAccount({ company, invitation }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.registerError);
  const registerSchema = yup.object().shape({
    email: yup.string().email('Wrong Email.').required('Email is required.'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be at most 50 characters')
      .required('Password is required'),
    name: yup.string().required('Name is required')
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur'
  });
  const onSubmit = (data) => {
    dispatch(
      authActions.register({
        ...data,
        emailVerified: !_.isNil(invitation),
        company,
        onSuccess: (user) => {
          if (!_.isNil(invitation)) {
            dispatch(
              companyActions.addNewMember({
                user,
                companyId: invitation.companyId,
                role: invitation.role,
                status: 'Active'
              })
            );

            dispatch(companyActions.selectCompany(company));
            router.push('/public-view');
          } else {
            router.push(`/mail-verification-message?email=${data.email}`);
          }
        }
      })
    );
  };

  useEffect(() => {
    setValue('email', invitation?.email);
  }, [invitation]);

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError('email', {
          type: 'manuel',
          message: err.message
        });
      });
    }
  }, [error, setError]);
  useEffect(
    () => () => {
      dispatch(authActions.clearError());
    },
    []
  );
  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Create an Account</title>
        <meta name="description" content="Altogic Canny Alternative Create an Account" />
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
            <img
              className="absolute top-8 left-8 w-[123px] h-[42px] mb-20 md:mb-44"
              src="./logo-black.svg"
              alt="Altogic"
            />
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div>
                <h1 className="text-3xl font-semibold text-slate-800">Sign Up</h1>
                <p className="text-slate-600 mt-3 text-base tracking-sm">Start your feedback.</p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-5">
                    <Input
                      id="name"
                      name="name"
                      label="Name *"
                      register={register('name')}
                      error={errors.name}
                      placeholder="Enter your name"
                    />

                    <Input
                      id="email"
                      name="email"
                      label="Email *"
                      placeholder="Enter your email"
                      register={register('email')}
                      error={errors.email}
                      type="email"
                      disabled={!!invitation?.email}
                    />

                    <div className="space-y-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        label="Password *"
                        register={register('password')}
                        error={errors.password}
                      />
                      <span className="inline-block text-slate-500 mt-2 text-sm tracking-sm">
                        Must be at least 8 characters.
                      </span>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        loading={loading}
                        text="Get started"
                        variant="indigo"
                        fullWidth
                      />
                    </div>
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
                  <p className="text-center text-sm text-slate-500 mt-8">
                    Don’t have an account?{' '}
                    <Link href="/login">
                      <a className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500">
                        Login
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
              src="./create-an-account.png"
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
  if (invitation) {
    const { data, errors } = await companyService.getCompanyById(invitation.companyId);
    console.log(data);
    if (errors) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }
    return {
      props: {
        invitation,
        company: data
      }
    };
  }
  return { props: {} };
}
