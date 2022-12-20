import Head from 'next/head';
import { useRouter } from 'next/router';
import { Email } from '@/components/icons';
import { useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import BackToLogin from '@/components/BackToLogin';

export default function MailVerification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email, operation } = router.query;
  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Mail Verification</title>
        <meta name="description" content="Altogic Canny Alternative Mail Verification" />
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
                  <Email className="w-7 h-7 text-indigo-600" />
                </span>
                <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Check your email</h1>
                <p className="text-slate-500 mb-6 text-base tracking-sm">
                  We sent a verification link to <br />{' '}
                  <span className="text-slate-700">{email}</span>
                </p>
                {!operation && (
                  <p className="text-slate-500 mb-8 text-center text-sm tracking-sm">
                    Didn’t receive the email?{' '}
                    <button
                      onClick={() => dispatch(authActions.resendVerificationEmail(email))}
                      type="button"
                      className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500">
                      Click to resend
                    </button>
                  </p>
                )}
                <BackToLogin />
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
