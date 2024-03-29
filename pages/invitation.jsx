import { Danger, Email } from '@/components/icons';
import useNotification from '@/hooks/useNotification';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import AuthService from '@/services/auth';
import companyService from '@/services/company';
import { deleteCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { realtime } from '@/utils/altogic';
import { generateUrl } from '../utils';

export default function Invitation({ invitation, errors, companies, user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const sendNotification = useNotification();
  useEffect(() => {
    if (errors && !router.asPath.includes('invalid-or-expired-token')) {
      router.replace('/invitation', {
        shallow: true,
        query: { token: 'invalid-or-expired-token' }
      });
    }
  }, [errors]);

  useEffect(() => {
    const sessionUser = AuthService.getUser();
    if (sessionUser && !errors) {
      if (sessionUser?.email !== invitation?.email) {
        dispatch(authActions.logout());
      } else if (invitation) {
        sendNotification({
          message: `<b>${user?.name}</b> accepted your invitation to join <b>${invitation.companyName}</b>`,
          type: 'acceptInvitation',
          url: '/settings?tab=invite%20team',
          companyId: invitation.companyId
        });
        realtime.send(invitation.companyId, 'new-member', {
          ...invitation,
          userId: user._id,

          isAccepted: true
        });
        dispatch(
          companyActions.updateMemberStatus({
            companyId: invitation.companyId,
            onSuccess: () => router.push(generateUrl('public-view', invitation?.companySubdomain))
          })
        );
        deleteCookie('invitation');
      }
    }
  }, [user, companies, invitation]);

  return (
    <div>
      <Head>
        <title>Idealy - Mail Verification</title>
        <meta name="description" content="Idealy - Mail Verification" />
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
              {!errors ? (
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-6 ring-8 ring-indigo-50">
                    <Email className="w-7 h-7 icon-indigo" />
                  </span>
                  <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Invitation</h1>
                  <p className="text-slate-500 mb-6 text-base tracking-sm">
                    {invitation.companyName} has sent you an invitation to be{' '}
                    <span className="text-slate-700">{invitation.role}</span>
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-6 ring-8 ring-red-50">
                    <Danger className="w-7 h-7 icon-red" />
                  </span>
                  <h1 className="text-red-500 mb-3 text-3xl font-semibold">Invalid Invitation</h1>
                  <p className="text-slate-500 mb-6 text-base tracking-sm">
                    The invitation is invalid or has expired.
                  </p>
                </div>
              )}
              <p className="text-slate-500 mb-8 text-center text-sm tracking-sm">
                Do you have an account?{' '}
                <Link href="/login?isInvited=true">
                  <a className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500">
                    Click to login
                  </a>
                </Link>
              </p>
              <p className="text-slate-500 mb-8 text-center text-sm tracking-sm">
                <Link href="/register?isInvited=true">
                  <a className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500">
                    Create an account
                  </a>
                </Link>
              </p>
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
export async function getServerSideProps({ req, res, query }) {
  const { token } = query;
  const { data, errors } = await companyService.checkInvitation(token);
  const { data: user } = await AuthService.getUserFromDbByEmail(data?.email);

  const { data: companies } = await companyService.getUserCompanies(user[0]?._id);
  if (data) {
    setCookie('invitation-token', data, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      domain: process.env.NEXT_PUBLIC_DOMAIN
    });
    return {
      props: {
        invitation: data,
        companies,
        ...(user.length > 0 && { user: user[0] })
      }
    };
  }

  return {
    props: {
      token,
      invitation: null,
      errors,
      ...(user.length > 0 && { user: user[0] })
    }
  };
}
