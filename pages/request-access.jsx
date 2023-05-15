import Button from '@/components/Button';
import { Check } from '@/components/icons';
import Layout from '@/components/Layout';
import useNotification from '@/hooks/useNotification';
import { companyActions } from '@/redux/company/companySlice';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { generateUrl } from '../utils';

export default function RequestAccess() {
  const sessionUser = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const accessRequest = useSelector((state) => state.company.accessRequest);
  const isLoading = useSelector((state) => state.company.getAccessRequestLoading);
  const companyLoading = useSelector((state) => state.company.getCompanyLoading);
  const sendNotification = useNotification();

  const [user, setUser] = useState();
  const [userApproval, setUserApproval] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) setUser(sessionUser);
  }, [sessionUser]);

  useEffect(() => {
    if (company?.role) {
      Router.push(generateUrl('public-view', company.subdomain));
    }
    if (user && company?._id) {
      dispatch(
        companyActions.getAccessRequest({
          companyId: company._id,
          userId: user?._id
        })
      );
    }
  }, [user, company?._id, company?.role]);

  useEffect(() => {
    if (company?.privacy) {
      setUserApproval(company.privacy.userApproval);
    }
  }, [company?.privacy]);

  return (
    <Layout>
      <div className="relative max-w-screen-xl mx-auto request-access">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-11 h-full">
          {isLoading || companyLoading ? (
            <ClipLoader color="#312E81" size={100} loading={isLoading || companyLoading} />
          ) : (
            <>
              <div className="text-center lg:text-left">
                <h2
                  className={`max-w-md mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-2xl tracking-md ${
                    !userApproval ? 'mb-8' : ''
                  }`}>
                  This board has been marked as private and can only be viewed by users with
                  permission.{' '}
                </h2>
                {userApproval && (
                  <p className="max-w-xs mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 my-8 text-xl font-medium tracking-sm">
                    {user
                      ? 'You will need to request access in order to view it.'
                      : 'You will need to sign in to request access.'}
                  </p>
                )}
                {user && userApproval ? (
                  accessRequest ? (
                    <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200">
                      Your access request has been submitted. <br />
                      You will be notified by email when your request has been accepted or rejected.
                    </span>
                  ) : (
                    <Button
                      type="button"
                      text="Request Access"
                      icon={<Check className="w-5 h-5 icon" />}
                      variant="indigo"
                      size="sm"
                      mobileFullWidth="mobileFullWidth"
                      onClick={() => {
                        dispatch(
                          companyActions.requestAccess({
                            companyId: company._id,
                            user: user._id,
                            onSuccess: () => {
                              sendNotification({
                                message: `<b>${user.name}</b> has requested access to <b>${company.name}</b>`,
                                type: 'requestAccess',
                                url: 'settings?tab=access%20requests'
                              });
                            }
                          })
                        );
                      }}
                    />
                  )
                ) : (
                  !user && (
                    <>
                      <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200 tracking-sm">
                        {' '}
                        Already have an account?{' '}
                      </span>
                      <Link
                        href={generateUrl(
                          `/login${
                            userApproval
                              ? `?redirect=${generateUrl('request-access', company.subdomain)}`
                              : ''
                          }`
                        )}>
                        <a className="text-indigo-700  dark:text-aa-300 purple:dark:text-aa-200 purple:text-pt-400 purple:hover:text-pt-300 underline ml-2">
                          Login
                        </a>
                      </Link>
                    </>
                  )
                )}
              </div>
              <img src="./request-access.png" alt="" srcSet="./request-access.png 2x" />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
