import BackToLogin from '@/components/BackToLogin';
import { Danger } from '@/components/icons';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import AuthService from '@/services/auth';
import companyService from '@/services/company';
import { realtime } from '@/utils/altogic';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { generateUrl, setSessionCookie } from '../utils';

export default function AuthRedirect({ error, session, user, companies }) {
  const router = useRouter();
  const dispatch = useDispatch();
  async function checkProps() {
    if (!error) {
      dispatch(
        authActions.getAuthGrant({
          session,
          user,
          error
        })
      );
      if (companies?.length) {
        dispatch(companyActions.setCompanies(companies));
      }

      if (companies && !companies?.length) {
        router.push(generateUrl('create-new-company'));
      } else if (companies?.length === 1) {
        router.push(generateUrl('dashboard', companies[0].subdomain));
      } else if (companies?.length > 1) {
        router.push(generateUrl('select-company'));
      } else {
        router.push('/');
      }
    }
  }
  useEffect(() => {
    checkProps();
    if (router.query.status === 401) {
      alert(router.query.error);
      router.push(generateUrl('login'));
    } else if (router.query.action === 'reset-pwd') {
      router.push({
        pathname: 'reset-password',
        query: { access_token: router.query.access_token }
      });
    } else if (router.query.action === 'change-email') {
      router.push({
        pathname: 'email-changed-message'
      });
    }
  }, []);

  return (
    <div>
      {!_.isNil(error) && (
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
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-6 ring-8 ring-red-50">
                    <Danger className="w-8 h-8 icon-red" />
                  </span>
                  <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Error</h1>
                  <p className="text-slate-500 text-lg"> {router.query.error}</p>
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
      )}
    </div>
  );
}

export const getServerSideProps = async ({ query, req, res }) => {
  try {
    const { user, errors, session } = await AuthService.getAuthGrant(query.access_token);
    const invitation = JSON.parse(getCookie('invitation-token', { req, res }) || null);
    const props = {
      action: query.action,
      error: null,
      user,
      session,
      invitation
    };
    if (query.error) {
      return {
        props: {
          error: query.error,
          action: query.action
        }
      };
    }
    if (invitation) {
      if (query.action === 'oauth-signup') {
        const { data } = await companyService.registerTeamMember({
          user: user._id,
          companyId: invitation.companyId,
          role: invitation.role,
          status: 'Active'
        });
        AuthService.updateUserCanCreateCompany(user._id, invitation.canCreateCompany);
        realtime.send(invitation.companyId, 'accept-invitation', {
          sender: user._id,
          payload: data
        });
      } else if (query.action === 'oauth-signin') {
        await companyService.updateMemberStatus({
          userId: user._id,
          companyId: invitation.companyId,
          status: 'Active',
          email: user.email
        });
      }
    }
    if (query.action !== 'reset-pwd' && query.action !== 'change-email') {
      const { data } = await companyService.getUserCompanies(user?._id);
      props.companies = data;
    }
    if (user) {
      AuthService.setSession(session);
      setSessionCookie(session, user, req, res);
      return {
        props
      };
    }
    return {
      props: {
        action: query.action,
        error: errors.items[0].message
      }
    };
  } catch (error) {
    setCookie('error', error, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30
    });
  }
  return {
    props: {}
  };
};
