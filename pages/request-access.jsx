import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { companyActions } from '@/redux/company/companySlice';
import Button from '@/components/Button';
import { Check } from '@/components/icons';
import Layout from '@/components/Layout';

export default function RequestAccess() {
  const sessionUser = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const accessRequest = useSelector((state) => state.company.accessRequest);
  const [user, setUser] = useState();
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

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-11">
        <div className="text-center lg:text-left">
          <h2 className="max-w-md mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-2xl tracking-md">
            This board has been marked as private and can only be viewed by users with permission.{' '}
          </h2>
          <p className="max-w-xs mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 my-10 text-xl font-medium tracking-sm">
            {user
              ? 'You will need to request access in order to view it.'
              : 'You will need to sign in to request access.'}
          </p>
          {user ? (
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
                onClick={() =>
                  dispatch(
                    companyActions.requestAccess({
                      companyId: company._id,
                      user: user._id
                    })
                  )
                }
              />
            )
          ) : (
            <div className="text-lg">
              <div>
                Already have an account?{' '}
                <Link href="/login">
                  <a className="text-indigo-700 dark:text-aa-200 purple:text-pt-200 ml-2">Login</a>
                </Link>
              </div>
              <div>
                Don&apos;t have an account?{' '}
                <Link href="/signup">
                  <a className="text-indigo-700  dark:text-aa-200 purple:text-pt-200 ml-2">
                    Sign Up
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
        <img src="./request-access.png" alt="" srcSet="./request-access.png 2x" />
      </div>
    </Layout>
  );
}
