import React, { useEffect, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { notificationActions } from '@/redux/notification/notificationSlice';
import { realtime } from '@/utils/altogic';
import { COMPANY_TABS } from 'constants';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { Email } from './icons';
import { generateUrl } from '../utils';

export default function Realtime() {
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletedCompanyName, setDeletedCompanyName] = useState(false);
  const [invitation, setInvitation] = useState();
  const [deletedCompany, setDeletedCompany] = useState();
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();
  const router = useRouter();

  function deleteMembershipHandler(data) {
    dispatch(companyActions.deleteCompanyMemberRealtime(data.message));
    setDeletedCompanyName(data.message.companyName);
    setDeletedCompany(data.message.companyId);
    setDeleteDialog(true);
  }
  function updateRoleHandler(data) {
    dispatch(companyActions.updateCompanyMemberRoleRealtime(data.message));
  }

  function newInvitationHandler(data) {
    setInvitation(data.message);
    setInvitationDialog(true);
  }
  function newMemberHandler(data) {
    if (data.message.isAccepted) {
      dispatch(
        companyActions.updateMemberStatusRealtime({
          userId: data.message.userId,
          company: data.message.company
        })
      );
    } else {
      dispatch(companyActions.declineInvitationRealtime(data.message.userId));
    }
  }
  function updateMemberHandler(data) {
    dispatch(
      companyActions.updateCompanyMemberRoleRealtime({
        id: data.message.id,
        companyId: data.message.companyId,
        role: data.message.role,
        isCompany: true,
        isRegistered: data.message.isRegistered
      })
    );
    if (
      router.asPath.includes('settings') &&
      COMPANY_TABS.findIndex((tab) => tab.name.toLowerCase() === router.query.tab) &&
      data.message.role === 'Moderator'
    ) {
      router.push('settings', {
        query: {
          tab: 'profile'
        }
      });
    }
  }
  function deleteCompanyMemberHandler(data) {
    dispatch(
      companyActions.deleteCompanyMemberRealtime({
        ...data.message,
        isCompany: true,
        isRegistered: data.message.isRegistered
      })
    );
  }
  function inviteTeamMemberHandler(data) {
    if (user?._id !== data.message.sender && company._id === data.message.companyId) {
      dispatch(companyActions.addNewMemberRealtime(data.message));
    }
  }
  function userUpdateHandler(data) {
    if (user._id !== data.message._id) {
      dispatch(companyActions.updateCompanyMemberRealtime(data.message));
    }
  }
  function companyDeletedHandler(data) {
    if (user._id !== data.message.sender) {
      dispatch(companyActions.deleteCompanyRealtime(data.message.companyId));
    }
    setDeletedCompanyName(data.message.companyName);
    setDeletedCompany(data.message.companyId);
    setDeleteDialog(true);
  }
  function notificationHandler(data) {
    if (data.message.user !== user._id) {
      dispatch(notificationActions.receiveNotificationRealtime(data.message));
    }
  }
  function userNotificationHandler(data) {
    if (data.message.user === user._id) {
      dispatch(notificationActions.receiveNotificationRealtime(data.message));
    }
  }
  function updateCompanyHandler(data) {
    if (data.message.company._id === company._id || (user && data.message.sender !== user?._id)) {
      dispatch(
        companyActions.selectCompany({
          ...data.message.company,
          role: company?.role
        })
      );
      dispatch(
        companyActions.updateCompanyRealtime({
          ...data.message.company,
          role: company?.role
        })
      );
    }
  }
  function acceptedInvitationHandler(data) {
    if (data.message.sender !== user._id) {
      dispatch(companyActions.acceptInvitation(data.message.payload));
    }
  }
  function updateSublistHandler(data) {
    if (data.message.sender !== user._id && company._id === data.message.companyId) {
      dispatch(companyActions.updateCompanySubListsOrderRealtime(data.message));
    }
  }
  useEffect(() => {
    if (user && company) {
      realtime.join(user._id);
      realtime.on('delete-membership', deleteMembershipHandler);
      realtime.on('update-role', updateRoleHandler);
      realtime.on('new-invitation', newInvitationHandler);
      realtime.on('user-notification', userNotificationHandler);
    }

    if (companies && companies.length > 0) {
      companies.forEach((company) => {
        realtime.join(company._id);
      });
      realtime.on('new-member', newMemberHandler);
      realtime.on('update-member', updateMemberHandler);
      realtime.on('delete-member', deleteCompanyMemberHandler);
      realtime.on('invite-team-member', inviteTeamMemberHandler);
      realtime.on('user-update', userUpdateHandler);
      realtime.on('company-deleted', companyDeletedHandler);
      realtime.on('notification', notificationHandler);
      realtime.on('update-company', updateCompanyHandler);
      realtime.on('accept-invitation', acceptedInvitationHandler);
      realtime.on('update-sublist', updateSublistHandler);
    } else if (company) {
      realtime.join(company._id);
      realtime.on('update-company', updateCompanyHandler);
    }
    return () => {
      realtime.off('delete-membership', deleteMembershipHandler);
      realtime.off('user-notification', userNotificationHandler);
      realtime.off('update-role', updateRoleHandler);
      realtime.off('new-invitation', newInvitationHandler);
      realtime.off('new-member', newMemberHandler);
      realtime.off('update-member', updateMemberHandler);
      realtime.off('delete-member', deleteCompanyMemberHandler);
      realtime.off('invite-team-member', inviteTeamMemberHandler);
      realtime.off('user-update', userUpdateHandler);
      realtime.off('company-deleted', companyDeletedHandler);
      realtime.off('notification', notificationHandler);
      realtime.off('update-company', updateCompanyHandler);
      realtime.off('accept-invitation', acceptedInvitationHandler);
      realtime.off('update-sublist', updateSublistHandler);
    };
  }, [user, companies, company]);

  const handleAcceptInvitation = () => {
    dispatch(
      companyActions.updateMemberStatus({
        id: invitation._id,
        companyId: invitation.company._id
      })
    );
    dispatch(
      companyActions.invalidateInvitationToken({
        companyId: invitation.company._id,
        email: user.email
      })
    );
    dispatch(
      companyActions.acceptInvitationRealtime({
        ...invitation.company,
        role: invitation.role
      })
    );
    realtime.send(invitation.company._id, 'new-member', {
      ...invitation,
      userId: user._id,
      isAccepted: true
    });
    dispatch(
      notificationActions.sendNotification({
        user: user._id,
        companyId: invitation.company._id,
        message: `<b>${user.name}</b> has accepted your invitation to join <b>${invitation.company.name}</b>`
      })
    );
    setInvitationDialog(false);
    router.push(generateUrl('dashboard', invitation.company.subdomain));
  };
  const handleDeclineInvitation = () => {
    dispatch(
      companyActions.updateMemberStatus({
        id: invitation._id,
        companyId: invitation.company._id,
        status: 'Declined'
      })
    );
    realtime.send(invitation.company._id, 'new-member', {
      userId: user._id,
      isAccepted: false
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
  const handleDeleteMembership = () => {
    setDeleteDialog(false);
    if (company._id === deletedCompany) {
      if (companies.length === 1) {
        dispatch(companyActions.selectCompany(companies[0]));
      } else if (companies.length > 1) {
        router.push('/admin/select-company');
      } else {
        router.push('/admin/create-new-company');
      }
    }
  };
  return (
    <>
      <Transition appear show={deleteDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                  <div className="space-y-2 mt-2">
                    <h2 className="text-slate-800 text-lg font-medium tracking-sm">
                      You have been removed from <b>{deletedCompanyName}</b>
                    </h2>
                    <p className="text-slate-500 text-sm tracking-sm">
                      Please contact your company admin for more information
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-6 gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center bg-indigo-600 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleDeleteMembership}>
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
    </>
  );
}
