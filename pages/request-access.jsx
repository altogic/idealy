import Button from '@/components/Button';
import { Check } from '@/components/icons';
import Layout from '@/components/Layout';
import { companyActions } from '@/redux/company/companySlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { realtime } from '@/utils/altogic';
import { notificationActions } from '@/redux/notification/notificationSlice';

export default function RequestAccess() {
  const sessionUser = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const accessRequest = useSelector((state) => state.company.accessRequest);
  const isLoading = useSelector((state) => state.company.getAccessRequestLoading);
  const companyLoading = useSelector((state) => state.company.getCompanyLoading);

  const [user, setUser] = useState();
  const [userApproval, setUserApproval] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) setUser(sessionUser);
  }, [user]);

  useEffect(() => {
    if (user && company) {
      dispatch(
        companyActions.getAccessRequest({
          companyId: company._id,
          userId: user?._id
        })
      );
    }
  }, [user, company]);

  useEffect(() => {
    if (company) {
      setUserApproval(company.privacy.userApproval);
    }
  }, [company]);

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
                      Your request has been reviewing
                    </span>
                  ) : (
                    <Button
                      type="button"
                      text="Request Access"
                      icon={<Check className="w-5 h-5" />}
                      variant="indigo"
                      size="sm"
                      mobileFullWidth="mobileFullWidth"
                      onClick={() => {
                        dispatch(
                          companyActions.requestAccess({
                            companyId: company._id,
                            user: user._id
                          })
                        );
                        dispatch(
                          notificationActions.sendNotification({
                            user: user._id,
                            companyId: company._id,
                            message: `New request access for <b>${company?.name}</b>`
                          })
                        );
                        realtime.send(company._id, 'notification', {
                          user,
                          companyId: company._id,
                          message: `New request access for <b>${company?.name}</b>`
                        });
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
                      <Link href="/login">
                        <a className="text-indigo-700  dark:text-aa-200 purple:text-pt-200 ml-2">
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
