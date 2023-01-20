import useGuestValidation from '@/hooks/useGuestValidation';
import { commentActions } from '@/redux/comments/commentsSlice';
import { companyActions } from '@/redux/company/companySlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { notificationActions } from '@/redux/notification/notificationSlice';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { realtime } from '@/utils/altogic';
import { COMPANY_TABS } from 'constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl } from '../utils';
import { Danger, Email } from './icons';
import InfoModal from './InfoModal';

export default function Realtime() {
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletedCompanyName, setDeletedCompanyName] = useState(false);
  const [invitation, setInvitation] = useState();
  const [deletedCompany, setDeletedCompany] = useState();
  const [deleteIdeaModal, setDeleteIdeaModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userIp = useSelector((state) => state.auth.userIp);
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const guestInfo = useSelector((state) => state.idea.guestInfo);
  const voteGuestAuth = useGuestValidation('voteIdea');
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
          company: data.message.company._id
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
        companyActions.updateCompanySuccess({
          ...data.message.company,
          role: company?.role
        })
      );
    }
  }
  function acceptedInvitationHandler({ message }) {
    dispatch(companyActions.acceptInvitation(message));
  }
  function updateSublistHandler(data) {
    if (data.message.sender !== user._id && company._id === data.message.companyId) {
      dispatch(companyActions.updateCompanySubListsOrderRealtime(data.message));
    }
  }
  function createIdeasHandler({ message }) {
    dispatch(ideaActions.createIdeaSuccess(message));
  }
  function updateIdeaHandler({ message }) {
    dispatch(ideaActions.updateIdeaRealtime(message));
  }
  function deleteIdeaHandler({ message }) {
    const idea = new URLSearchParams(document.location.search).get('feedback');
    if (idea === message) {
      dispatch(toggleFeedBackDetailModal());
      setDeleteIdeaModal(true);
    }
    dispatch(ideaActions.deleteIdeaSuccess(message));
  }
  function voteIdeaHandler({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && userIp !== message.ip) ||
      (voteGuestAuth && guestInfo.guestEmail !== message.guestEmail)
    ) {
      dispatch(ideaActions.upVoteIdeaRealtime(message.ideaId));
    }
  }
  function downVoteIdeaHandler({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && userIp !== message.ip) ||
      (voteGuestAuth && guestInfo.guestEmail !== message.guestEmail)
    ) {
      dispatch(ideaActions.downVoteIdeaRealtime(message.ideaId));
    }
  }
  function addCommentHandler({ message }) {
    dispatch(commentActions.addCommentSuccess(message));
  }
  function updateCommentHandler({ message }) {
    dispatch(commentActions.updateCommentSuccess(message));
  }
  function deleteCommentHandler({ message }) {
    dispatch(commentActions.deleteCommentSuccess(message));
  }
  function addReplyHandler({ message }) {
    dispatch(repliesActions.createReplySuccess(message));
  }
  function updateReplyHandler({ message }) {
    dispatch(repliesActions.updateReplySuccess(message));
  }
  function deleteReplyHandler({ message }) {
    dispatch(repliesActions.deleteReplySuccess(message));
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
      realtime.on('create-idea', createIdeasHandler);
      realtime.on('update-idea', updateIdeaHandler);
      realtime.on('delete-idea', deleteIdeaHandler);
      realtime.on('vote-idea', voteIdeaHandler);
      realtime.on('downVote-idea', downVoteIdeaHandler);
      realtime.on('add-comment', addCommentHandler);
      realtime.on('update-comment', updateCommentHandler);
      realtime.on('delete-comment', deleteCommentHandler);
      realtime.on('add-reply', addReplyHandler);
      realtime.on('update-reply', updateReplyHandler);
      realtime.on('delete-reply', deleteReplyHandler);
    } else if (company) {
      realtime.join(company._id);
      realtime.on('update-company', updateCompanyHandler);
      realtime.on('create-idea', createIdeasHandler);
      realtime.on('update-idea', updateIdeaHandler);
      realtime.on('delete-idea', deleteIdeaHandler);
      realtime.on('vote-idea', voteIdeaHandler);
      realtime.on('downVote-idea', downVoteIdeaHandler);
      realtime.on('add-comment', addCommentHandler);
      realtime.on('update-comment', updateCommentHandler);
      realtime.on('delete-comment', deleteCommentHandler);
      realtime.on('add-reply', addReplyHandler);
      realtime.on('update-reply', updateReplyHandler);
      realtime.on('delete-reply', deleteReplyHandler);
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
      realtime.off('create-idea', createIdeasHandler);
      realtime.off('update-idea', updateIdeaHandler);
      realtime.off('delete-idea', deleteIdeaHandler);
      realtime.off('vote-idea', voteIdeaHandler);
      realtime.off('downVote-idea', downVoteIdeaHandler);
      realtime.off('add-comment', addCommentHandler);
      realtime.off('update-comment', updateCommentHandler);
      realtime.off('delete-comment', deleteCommentHandler);
      realtime.off('add-reply', addReplyHandler);
      realtime.off('update-reply', updateReplyHandler);
      realtime.off('delete-reply', deleteReplyHandler);
    };
  }, [user, companies, company]);

  const handleAcceptInvitation = () => {
    dispatch(
      companyActions.updateMemberStatus({
        id: invitation._id,
        companyId: invitation.company._id,
        onSuccess: () => router.push('/dashboard')
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
        router.push(generateUrl('select-company'));
      } else {
        router.push(generateUrl('create-new-company'));
      }
    }
  };
  return (
    <>
      <InfoModal
        show={deleteDialog}
        title={` You have been removed from <b>${deletedCompanyName}</b>`}
        icon={<Email className="w-6 h-6 text-indigo-600" />}
        description="Please contact your company admin for more information"
        onConfirm={handleDeleteMembership}
        confirmText="OK"
        confirmColor="indigo"
        cancelOnClick={() => {}}
      />
      <InfoModal
        show={invitationDialog}
        title=" New Invitation"
        description={`You have been invited to join <b>${invitation?.company.name}</b> as an <b>${invitation?.role}</b>`}
        cancelOnClick={handleDeclineInvitation}
        onConfirm={handleAcceptInvitation}
        icon={<Email className="w-6 h-6 text-indigo-600" />}
        confirmText="Accept"
        cancelText="Decline"
        confirmColor="indigo"
        canCancel
      />
      <InfoModal
        show={deleteIdeaModal}
        cancelOnClick={setDeleteIdeaModal}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="The idea you are viewing has been deleted."
        description="Please contact your company admin for more information"
        onConfirm={setDeleteIdeaModal}
        confirmColor="red"
        confirmText="OK"
      />
    </>
  );
}
