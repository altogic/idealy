import React from 'react';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Router from 'next/router';
import { isNil } from 'lodash';
import { generateUrl } from '../utils';

export default function Providers({ invitation }) {
  const dispatch = useDispatch();
  const handleProviderClick = (provider) => {
    dispatch(
      authActions.authenticateWithProvider({
        provider,
        onSuccess: (user) => {
          if (!isNil(invitation)) {
            if (user.isInvited) {
              dispatch(
                companyActions.addNewMember({
                  user: user._id,
                  companyId: invitation.companyId,
                  role: invitation.role,
                  status: 'Active'
                })
              );
            } else {
              dispatch(companyActions.updateMemberStatus({ companyId: invitation.companyId }));
              Router.push(generateUrl('select-company'));
            }
          }
        }
      })
    );
  };
  return (
    <div>
      <div>
        <p className="inline-block text-slate-700 mb-3 text-sm font-medium tracking-sm">
          Sign in with
        </p>

        <div className="mt-1 grid grid-cols-3 gap-3">
          <div>
            <button
              type="button"
              onClick={() => handleProviderClick('google')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50">
              <span className="sr-only">Sign in with Google</span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1015_28687)">
                  <path
                    d="M23.7663 12.9661C23.7663 12.1504 23.7001 11.3302 23.559 10.5277H12.2402V15.1487H18.722C18.453 16.6391 17.5888 17.9575 16.3233 18.7952V21.7936H20.1903C22.4611 19.7036 23.7663 16.617 23.7663 12.9661Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2401 24.6905C15.4766 24.6905 18.2059 23.6278 20.1945 21.7936L16.3276 18.7952C15.2517 19.5272 13.8627 19.9416 12.2445 19.9416C9.11388 19.9416 6.45946 17.8296 5.50705 14.99H1.5166V18.0809C3.55371 22.1331 7.7029 24.6905 12.2401 24.6905Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.50277 14.9899C5.00011 13.4996 5.00011 11.8858 5.50277 10.3954V7.30447H1.51674C-0.185266 10.6953 -0.185266 14.6901 1.51674 18.0809L5.50277 14.9899Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.2401 5.43933C13.9509 5.41287 15.6044 6.05663 16.8434 7.23833L20.2695 3.81228C18.1001 1.77517 15.2208 0.655201 12.2401 0.690475C7.7029 0.690475 3.55371 3.24789 1.5166 7.30447L5.50264 10.3954C6.45064 7.5514 9.10947 5.43933 12.2401 5.43933Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_28687">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.689667)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleProviderClick('github')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50">
              <span className="sr-only">Sign in with Github</span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1015_28702)">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    fill="#000000"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_28702">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.689667)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleProviderClick('facebook')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50">
              <span className="sr-only">Sign in with Facebook</span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1015_28711)">
                  <path
                    d="M24 12.6897C24 6.06225 18.6274 0.689667 12 0.689667C5.37258 0.689667 0 6.06225 0 12.6897C0 18.6791 4.3882 23.6437 10.125 24.5439V16.1584H7.07812V12.6897H10.125V10.0459C10.125 7.03842 11.9166 5.37717 14.6576 5.37717C15.9701 5.37717 17.3438 5.61154 17.3438 5.61154V8.56467H15.8306C14.34 8.56467 13.875 9.48975 13.875 10.4397V12.6897H17.2031L16.6711 16.1584H13.875V24.5439C19.6118 23.6437 24 18.6791 24 12.6897Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M16.6711 16.1584L17.2031 12.6897H13.875V10.4397C13.875 9.49068 14.34 8.56467 15.8306 8.56467H17.3438V5.61154C17.3438 5.61154 15.9705 5.37717 14.6576 5.37717C11.9166 5.37717 10.125 7.03842 10.125 10.0459V12.6897H7.07812V16.1584H10.125V24.5439C11.3674 24.7383 12.6326 24.7383 13.875 24.5439V16.1584H16.6711Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_28711">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.689667)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
