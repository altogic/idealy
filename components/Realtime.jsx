import useGuestValidation from '@/hooks/useGuestValidation';
import { commentActions } from '@/redux/comments/commentsSlice';
import { companyActions } from '@/redux/company/companySlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { notificationActions } from '@/redux/notification/notificationSlice';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { realtime } from '@/utils/altogic';
import localStorageUtil from '@/utils/localStorageUtil';
import { COMPANY_TABS } from 'constants';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNotification from '@/hooks/useNotification';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { authActions } from '@/redux/auth/authSlice';
import { generateUrl } from '../utils';
import { Email } from './icons';
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
  const { company, companies, isGuest } = useSelector((state) => state.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const voteGuestAuth = useGuestValidation('voteIdea');
  const reactionGuestAuth = useGuestValidation('announcementReaction');

  const sendNotification = useNotification();

  const dispatch = useDispatch();
  const router = useRouter();
  const ideaDetailModal = useRef(false);
  const voteGuest = useRef(false);
  const reactGuest = useRef(false);
  const guestInfoState = useRef({});
  useEffect(() => {
    ideaDetailModal.current = feedBackDetailModal;
  }, [feedBackDetailModal]);

  useEffect(() => {
    voteGuest.current = voteGuestAuth;
  }, [voteGuestAuth]);
  useEffect(() => {
    guestInfoState.current = guestInfo;
  }, [guestInfo]);

  useEffect(() => {
    reactGuest.current = reactionGuestAuth;
  }, [reactionGuestAuth]);

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
          company: data.message.company._id ?? data.message.companyId
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
  function notificationHandler({ message }) {
    if (message.userId !== user._id && !isGuest) {
      dispatch(notificationActions.receiveNotificationRealtime(message.message));
    }
  }
  function userNotificationHandler({ message }) {
    dispatch(notificationActions.receiveNotificationRealtime(message.message));
  }
  function updateCompanyHandler({ message }) {
    if (message.company._id === company._id && message.sender !== user?._id) {
      const { company: msgCompany } = message;
      localStorageUtil.set('theme', message.company.theme);
      if (msgCompany.roadmaps?.length > 0 && isGuest) {
        msgCompany.roadmaps = msgCompany.roadmaps.filter((r) => r.isPublic);
      }
      dispatch(
        companyActions.updateCompanySuccess({
          ...msgCompany,
          role: company?.owner === user?._id ? 'Owner' : company?.role
        })
      );
    }
  }
  function acceptedInvitationHandler({ message }) {
    dispatch(companyActions.acceptInvitation(message));
  }
  function updateSublistOrderHandler(data) {
    if (data.message.sender !== user?._id && company._id === data.message.companyId) {
      dispatch(companyActions.updateCompanySubListsOrderRealtime(data.message));
    }
  }
  function updateSublistHandler(data) {
    if (data.message.sender !== user?._id && company._id === data.message.companyId) {
      dispatch(companyActions.updateCompanySubListsRealtime(data.message));
    }
  }
  function createIdeasHandler({ message }) {
    const topics = router.query.topics?.split(',');
    const statuses = router.query.status?.split(',');
    const intersection = topics?.filter((topic) => message.topics.includes(topic));
    const isTopicsMatch = _.isNil(topics) || intersection?.length > 0;
    const isStatusesMatch = _.isNil(statuses) || statuses.includes(message.status);
    if (
      (message.isApproved || (company.role && company.role !== 'Guest')) &&
      isTopicsMatch &&
      isStatusesMatch
    ) {
      dispatch(ideaActions.createIdeaSuccess(message));
      dispatch(
        companyActions.updateCompanyUserCounts({
          email: message?.guestEmail,
          userId: message?.userId,
          property: 'ideaCount'
        })
      );
    }
  }
  function updateIdeaHandler({ message }) {
    if (message.sender !== user?._id) {
      const isShown = isGuest
        ? message.showOnRoadMap && !message.isPrivate && !message.isArchived && !message.isCompleted
        : true;

      dispatch(
        ideaActions.updateIdeaRealtime({
          data: message,
          isShown,
          isAdminView: router.asPath.includes('dashboard'),
          isRoadmap: router.asPath.includes('roadmap')
        })
      );
    }
  }
  function deleteIdeaHandler({ message }) {
    const idea = new URLSearchParams(document.location.search).get('feedback');
    if (idea === message.id && message.sender !== user?._id) {
      dispatch(toggleFeedBackDetailModal());
      setDeleteIdeaModal(true);
    }
    dispatch(ideaActions.deleteIdeaSuccess(message.id));
  }
  function voteIdeaHandler({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && !voteGuest.current && userIp !== message.ip) ||
      (voteGuest.current && guestInfoState.current.email !== message.guestEmail) ||
      (!user && !userIp && !guestInfoState.current.email)
    ) {
      dispatch(ideaActions.upVoteIdeaRealtime(message.ideaId));
      dispatch(
        companyActions.updateCompanyUserCounts({
          email: message?.guestEmail,
          userId: message?.userId,
          property: 'voteCount'
        })
      );
    }
  }
  function downVoteIdeaHandler({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && !voteGuest.current && userIp !== message.ip) ||
      (voteGuest.current && guestInfoState.current.email !== message.guestEmail) ||
      (!user && !userIp && !guestInfoState.current.email)
    ) {
      dispatch(ideaActions.downVoteIdeaRealtime(message.ideaId));
    }
  }

  function addCommentHandler({ message }) {
    if (ideaDetailModal.current) {
      dispatch(commentActions.addCommentSuccess(message));
    }
    dispatch(ideaActions.addedNewComment(message.ideaId));
    if (!isGuest) {
      dispatch(
        companyActions.updateCompanyUserCounts({
          email: message?.guestEmail,
          userId: message?.userId,
          property: 'commentCount'
        })
      );
    }
  }

  function updateCommentHandler({ message }) {
    dispatch(commentActions.updateCommentSuccess(message));
  }
  function deleteCommentHandler({ message }) {
    dispatch(commentActions.deleteCommentSuccess(message.commentId));
    dispatch(ideaActions.deleteComment(message.ideaId));
  }
  function addReplyHandler({ message }) {
    if (ideaDetailModal.current || router.asPath.includes('dashboard')) {
      dispatch(repliesActions.createReplySuccess(message));
      dispatch(commentActions.addedReply(message.commentId));
    }
  }
  function updateReplyHandler({ message }) {
    dispatch(repliesActions.updateReplySuccess(message));
  }
  function deleteReplyHandler({ message }) {
    dispatch(repliesActions.deleteReplySuccess(message));
    dispatch(commentActions.deleteReply(message.commentId));
  }
  function approveAccessHandler({ message }) {
    if (user._id === message.user._id) {
      dispatch(companyActions.approvedAccessRequest(message));
      router.push('/public-view');
    }
  }
  function rejectAccessHandler({ message }) {
    if (user._id === message.user._id) {
      dispatch(companyActions.rejectCompanyAccessRequestSuccess(message));
      router.push(generateUrl('/dashboard', companies[0].subdomain));
    }
  }
  function approveAccessCompanyHandler({ message }) {
    if (user._id !== message.sender) {
      dispatch(companyActions.approveCompanyAccessRequestSuccess(message));
    }
  }
  function rejectAccessCompanyHandler({ message }) {
    if (user._id !== message.user._id) {
      dispatch(companyActions.rejectCompanyAccessRequestSuccess(message));
    }
  }

  function requestAccessHandler({ message }) {
    if (user._id !== message.user._id && router.asPath.includes('request-access')) {
      dispatch(companyActions.requestAccessRealtime(message));
    }
  }
  function mergeIdeaHandler({ message }) {
    dispatch(ideaActions.mergeIdeasSuccess(message));
  }
  function updateIdeaOrder({ message }) {
    if (user?._id !== message.sender) dispatch(ideaActions.updateIdeasOrderRealtime(message));
  }

  function publishAnnouncementHandler({ message }) {
    if (user?._id !== message.sender) {
      dispatch(announcementActions.createAnnouncementSuccess(message));
    }
  }
  function deleteAnnouncementHandler({ message }) {
    if (user?._id !== message.sender) {
      dispatch(announcementActions.deleteAnnouncementSuccess(message.announcementId));
    }
  }

  function createAnnouncementReaction({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && !reactGuest.current && userIp !== message.ip) ||
      (reactGuest.current && guestInfoState.current.email !== message.guestEmail) ||
      (!user && !userIp && !guestInfoState.current.email)
    ) {
      dispatch(announcementActions.createAnnouncementReactionRealtimeSuccess(message));
    }
  }

  function deleteAnnouncementReaction({ message }) {
    if (
      (user && user._id !== message.userId) ||
      (!user && !reactGuest.current && userIp !== message.ip) ||
      (reactGuest.current && guestInfoState.current.email !== message.guestEmail) ||
      (!user && !userIp && !guestInfoState.current.email)
    ) {
      dispatch(announcementActions.deleteAnnouncementReactionRealtimeSuccess(message));
    }
  }

  function deleteCompanyUser({ message }) {
    setDeletedCompanyName(message.companyName);
    setDeletedCompany(message.companyId);
    setDeleteDialog(true);
    dispatch(authActions.setGuestInfo({}));
  }
  function createNewCompanyUserHandler({ message }) {
    if (user?._id !== message.sender) {
      dispatch(companyActions.addNewCompanyUser(message));
    }
  }
  useEffect(() => {
    if (user && company) {
      realtime.join(user._id);
      realtime.join(user.email);
      realtime.on('delete-membership', deleteMembershipHandler);
      realtime.on('update-role', updateRoleHandler);
      realtime.on('new-invitation', newInvitationHandler);
      realtime.on('user-notification', userNotificationHandler);
      realtime.on('approve-access', approveAccessHandler);
      realtime.on('reject-access', rejectAccessHandler);
      realtime.on('delete-company-user', deleteCompanyUser);
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
      realtime.on('accept-invitation', acceptedInvitationHandler);
      realtime.on('request-access', requestAccessHandler);
      realtime.on('reject-access', rejectAccessHandler);
    }
    if (company) {
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
      realtime.on('approve-access', approveAccessCompanyHandler);
      realtime.on('reject-access', rejectAccessCompanyHandler);
      realtime.on('request-access', requestAccessHandler);
      realtime.on('merge-idea', mergeIdeaHandler);
      realtime.on('update-sublist-order', updateSublistOrderHandler);
      realtime.on('update-ideas-order', updateIdeaOrder);
      realtime.on('delete-announcement', deleteAnnouncementHandler);
      realtime.on('create-announcement-reaction', createAnnouncementReaction);
      realtime.on('delete-announcement-reaction', deleteAnnouncementReaction);
      realtime.on('publish-announcement', publishAnnouncementHandler);
      realtime.on('update-sublist', updateSublistHandler);
      realtime.on('create-new-company-user', createNewCompanyUserHandler);
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
      realtime.off('update-sublist-order', updateSublistOrderHandler);
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
      realtime.off('approve-access', approveAccessHandler);
      realtime.off('reject-access', rejectAccessHandler);
      realtime.off('approve-access', approveAccessCompanyHandler);
      realtime.off('reject-access', rejectAccessCompanyHandler);
      realtime.off('request-access', requestAccessHandler);
      realtime.off('merge-idea', mergeIdeaHandler);
      realtime.off('update-ideas-order', updateIdeaOrder);
      realtime.off('delete-announcement', deleteAnnouncementHandler);
      realtime.off('create-announcement-reaction', createAnnouncementReaction);
      realtime.off('delete-announcement-reaction', deleteAnnouncementReaction);
      realtime.off('publish-announcement', publishAnnouncementHandler);
      realtime.off('delete-company-user', deleteCompanyUser);
      realtime.off('create-new-company-user', createNewCompanyUserHandler);
    };
  }, [user, companies, company]);

  useEffect(() => {
    if (guestInfo.email) {
      realtime.join(guestInfo.email);
      realtime.on('delete-company-user', deleteCompanyUser);
    }
    return () => {
      realtime.off('delete-company-user', deleteCompanyUser);
    };
  }, [guestInfo]);

  const handleAcceptInvitation = () => {
    dispatch(
      companyActions.updateMemberStatus({
        id: invitation._id,
        companyId: invitation.company._id,
        onSuccess: () => router.push(generateUrl('dashboard', invitation.company.subdomain))
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
    sendNotification({
      message: `<b>${user.name}</b> has accepted your invitation to join <b>${invitation.company.name}</b>`,
      type: 'acceptInvitation',
      url: '/dashboard'
    });
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
    sendNotification({
      message: `<b>${user.name}</b> has declined your invitation to join <b>${invitation.company.name}</b>`,
      type: 'rejectInvitation',
      url: '/dashboard'
    });
    setInvitationDialog(false);
  };
  const handleDeleteMembership = () => {
    setDeleteDialog(false);
    if (company._id === deletedCompany) {
      if (companies.length === 1) {
        dispatch(companyActions.selectCompany(companies[0]));
        router.push(generateUrl('dashboard', companies[0].subdomain));
      } else if (companies.length > 1) {
        router.push(generateUrl('select-company'));
      } else if (user) {
        router.push(generateUrl('create-new-company'));
      } else {
        router.push('/login');
      }
    }
  };
  return (
    <>
      <InfoModal
        show={deleteDialog}
        title={
          <span>
            You have been removed from <b>{deletedCompanyName}</b>
          </span>
        }
        icon={<Email className="w-6 h-6 icon-indigo" />}
        description="Please contact your company admin for more information"
        onConfirm={handleDeleteMembership}
        confirmText="OK"
        confirmColor="indigo"
        cancelOnClick={() => {}}
      />
      <InfoModal
        show={invitationDialog}
        title=" New Invitation"
        description={
          <span>
            You have been invited to join <b>{invitation?.company.name}</b> as an{' '}
            <b>{invitation?.role}</b>
          </span>
        }
        cancelOnClick={handleDeclineInvitation}
        onConfirm={handleAcceptInvitation}
        onClose={() => setInvitationDialog(false)}
        icon={<Email className="w-6 h-6 text-indigo-600" />}
        confirmText="Accept"
        cancelText="Decline"
        confirmColor="indigo"
        canCancel
      />
      <InfoModal
        show={deleteIdeaModal}
        cancelOnClick={() => {}}
        icon={<Email className="w-6 h-6 text-indigo-600" />}
        title="The idea you are viewing has been deleted."
        onConfirm={() => {
          setDeleteIdeaModal(false);
          dispatch(ideaActions.setSelectedIdea(null));
        }}
        confirmColor="indigo"
        confirmText="OK"
      />
    </>
  );
}
