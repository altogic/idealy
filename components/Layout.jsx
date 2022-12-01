import React, { useEffect, useState, Fragment } from 'react';
import Head from 'next/head';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import realtimeService from '@/utils/realtime';
import { Dialog, Transition } from '@headlessui/react';
import Header from './Header';
import { Email } from './icons';

export default function Layout({ children }) {
  const router = useRouter();
  const [canFetchCompany, setCanFetchCompany] = useState(true);
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [invitation, setInvitation] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const invitation = JSON.parse(getCookie('invitation-token') || null);
    if (invitation) {
      dispatch(
        companyActions.invalidateInvitationToken({
          companyId: invitation.companyId,
          email: user.email
        })
      );
      deleteCookie('invitation-token');
    }
    if (isAuthenticated) {
      dispatch(authActions.setUser());
    } else {
      router.push('/public-view');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.isNil(companies) && isAuthenticated) {
      router.push('/admin/create-new-company');
    }
  }, [companies]);

  useEffect(() => {
    if (user && _.isEmpty(companies) && canFetchCompany) {
      setCanFetchCompany(false);
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, [user, companies]);

  useEffect(() => {
    if (user) {
      realtimeService.join(user._id);
      realtimeService.listen('user-message', (data) => {
        console.log(data);
        switch (data.message.type) {
          case 'delete-member':
            dispatch(
              companyActions.deleteCompanyMemberRealtime({
                id: data.message.id,
                companyId: data.message.companyId,
                onSuccess: () => {
                  router.push('/admin/create-new-company');
                }
              })
            );
            break;
          case 'update-role':
            dispatch(companyActions.updateCompanyMemberRoleRealtime(data.message));
            break;
          case 'invite-team-member':
            setInvitation(data.message);
            setInvitationDialog(true);
            break;
          default:
            break;
        }
      });
    }
    if (companies && companies.length > 0) {
      companies.forEach((company) => {
        realtimeService.join(company._id);
        realtimeService.listen('company-message', (data) => {
          console.log(data);
          switch (data.message.type) {
            case 'new-member':
              if (data.message.isAccepted) {
                dispatch(
                  companyActions.updateMemberStatusRealtime({
                    userId: data.message.userId,
                    company: data.message.company
                  })
                );
              } else {
                dispatch(
                  companyActions.deleteCompanyMemberRealtime({
                    userId: data.message.userId,
                    companyId: data.message.companyId
                  })
                );
              }
              break;
            case 'update-member':
              dispatch(
                companyActions.updateCompanyMemberRoleRealtime({
                  id: data.message.id,
                  companyId: data.message.companyId,
                  role: data.message.role,
                  isCompany: true
                })
              );
              break;
            case 'delete-member':
              dispatch(
                companyActions.deleteCompanyMemberRealtime({
                  userId: data.message.userId,
                  companyId: data.message.companyId,
                  isCompany: true
                })
              );
              break;
            case 'invite-team-member':
              if (user._id !== data.message.sender) {
                dispatch(companyActions.addNewMemberRealtimeSuccess(data.message));
              }
              break;
            default:
              break;
          }
        });
      });
    }
    return () => {
      realtimeService.leave('invite-team');
      companies.forEach((company) => {
        realtimeService.leave(company._id);
      });
    };
  }, [user, companies]);
  const handleAcceptInvitation = () => {
    dispatch(
      companyActions.updateMemberStatus({ id: invitation._id, companyId: invitation.companyId })
    );
    dispatch(
      companyActions.invalidateInvitationToken({
        companyId: invitation.company._id,
        email: user.email
      })
    );
    dispatch(companyActions.acceptInvitationRealtime(invitation.company));
    realtimeService.sendMessage(company._id, 'company-message', {
      ...invitation,
      type: 'new-member',
      userId: user._id,
      isAccepted: true,
      sa: true
    });
    setInvitationDialog(false);

    router.push('/public-view');
  };
  const handleDeclineInvitation = () => {
    dispatch(
      companyActions.deleteCompanyMember({
        userId: user._id,
        email: user?.email,
        companyId: invitation.company._id
      })
    );
    realtimeService.sendMessage(company._id, 'company-message', {
      type: 'new-member',
      companyId: invitation.company._id,
      userId: user._id,
      isAccepted: false,
      as: true
    });
    dispatch(
      companyActions.invalidateInvitationToken({
        type: 'new-member',
        companyId: invitation.company._id,
        email: user.email
      })
    );
    setInvitationDialog(false);
  };
  return (
    <div>
      <Head>
        <link rel="icon" href={company?.favicon} />
      </Head>
      <Header />
      <main className="px-4">
        {children}
        <Transition appear show={invitationDialog} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setInvitationDialog(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full">
                      <Email className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-slate-800 text-lg font-medium tracking-sm">
                        New Invitation
                      </h2>
                      <p className="text-slate-500 text-sm tracking-sm">
                        You have been invited to join <b>{invitation?.company.name}</b> as an{' '}
                        <b>{invitation?.role}</b>
                      </p>
                    </div>
                    <div className="flex items-center justify-center mt-6 gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center bg-white text-gray-700 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300  rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500  focus:ring-offset-2"
                        onClick={handleDeclineInvitation}>
                        Decline
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center bg-indigo-600 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleAcceptInvitation}>
                        Accept
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
      {/* <Footer /> */}
      {company?.whiteLabel?.isHideBanner && (
        <a href="https://www.altogic.com/" target="_blank" rel="noopener noreferrer">
          <img className="fixed bottom-8 right-8" src="./powered-by-altogic.svg" alt="" />
        </a>
      )}
    </div>
  );
}
