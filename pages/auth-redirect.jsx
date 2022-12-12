import { useEffect } from 'react';
import AuthService from '@/services/auth';
import companyService from '@/services/company';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { getCookie, setCookie } from 'cookies-next';
import BackToLogin from '@/components/BackToLogin';
import { Danger } from '@/components/icons';

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
        router.push('/admin/create-new-company');
      } else if (companies?.length === 1) {
        dispatch(companyActions.selectCompany(companies[0]));
        router.push('admin/dashboard');
      } else if (companies?.length > 1) {
        router.push('/admin/select-company');
      } else {
        router.push('/');
      }
    }
  }
  useEffect(() => {
    checkProps();
    if (router.query.status === 401) {
      alert(router.query.error);
      router.push('/login');
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
      {error && (
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
                    <Danger className="w-8 h-8 text-red-600" />
                  </span>
                  <h1 className="text-slate-800 mb-3 text-3xl font-semibold">
                    Verification token expired
                  </h1>
                  <p className="text-slate-500 text-lg">
                    This email verification token has already been used or has expired.
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
      session
    };
    if (query.error) {
      return {
        props: {
          error: query.error
        }
      };
    }

    if (invitation) {
      if (query.action === 'oauth-signup') {
        await companyService.registerTeamMember({
          user: user._id,
          companyId: invitation.companyId,
          role: invitation.role,
          status: 'Active'
        });
        AuthService.updateUserCanCreateCompany(user._id, invitation.canCreateCompany);
      } else if (query.action === 'oauth-signin') {
        await companyService.updateMemberStatus({
          userId: user._id,
          companyId: invitation.companyId
        });
      }
    }

    if (query.action !== 'reset-pwd' && query.action !== 'change-email') {
      const { data } = await companyService.getUserCompanies(user?._id);
      props.companies = data.response.companies;
    }
    if (user) {
      AuthService.setSessionCookie(session.token, req, res);
      AuthService.setSession(session);
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
