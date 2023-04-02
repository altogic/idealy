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
  const selectedRoadmap = useSelector((state) => state.idea.selectedRoadmap);
  const { company, companies, isGuest } = useSelector((state) => state.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const voteGuestAuth = useGuestValidation('voteIdea');

  const sendNotification = useNotification();

  const dispatch = useDispatch();
  const router = useRouter();
  const ideaDetailModal = useRef(false);
  const voteGuest = useRef(false);
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
  function notificationHandler({ message }) {
    if (message.userId !== user._id && !isGuest) {
      dispatch(notificationActions.receiveNotificationRealtime(message.message));
    }
  }
  function userNotificationHandler({ message }) {
    dispatch(notificationActions.receiveNotificationRealtime(message.message));
  }
  function updateCompanyHandler({ message }) {
    if (message.company._id === company._id || (user && message.sender !== user?._id)) {
      localStorageUtil.set('theme', message.company.theme);
      dispatch(
        companyActions.updateCompanySuccess({
          ...message.company,
          role: company?.role
        })
      );
    }
  }
  function acceptedInvitationHandler({ message }) {
    dispatch(companyActions.acceptInvitation(message));
  }
  function updateSublistHandler(data) {
    if (data.message.sender !== user?._id && company._id === data.message.companyId) {
      dispatch(companyActions.updateCompanySubListsOrderRealtime(data.message));
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

  function makeStatusPublicHandler({ message }) {
    if (user?._id !== message.sender && selectedRoadmap?._id === message.roadmapId) {
      dispatch(ideaActions.makeStatusPublicRealtime(message));
    }
  }

  useEffect(() => {
    if (user && company) {
      realtime.join(user._id);
      realtime.on('delete-membership', deleteMembershipHandler);
      realtime.on('update-role', updateRoleHandler);
      realtime.on('new-invitation', newInvitationHandler);
      realtime.on('user-notification', userNotificationHandler);
      realtime.on('approve-access', approveAccessHandler);
      realtime.on('reject-access', rejectAccessHandler);
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
      realtime.on('update-sublist', updateSublistHandler);
      realtime.on('update-ideas-order', updateIdeaOrder);
      realtime.on('make-status-public', makeStatusPublicHandler);
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
      realtime.off('approve-access', approveAccessHandler);
      realtime.off('reject-access', rejectAccessHandler);
      realtime.off('approve-access', approveAccessCompanyHandler);
      realtime.off('reject-access', rejectAccessCompanyHandler);
      realtime.off('request-access', requestAccessHandler);
      realtime.off('merge-idea', mergeIdeaHandler);
      realtime.off('update-ideas-order', updateIdeaOrder);
      realtime.off('make-status-public', makeStatusPublicHandler);
    };
  }, [user, companies, company]);

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
      url: generateUrl('dashboard', invitation.company.subdomain)
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
      url: generateUrl('dashboard', invitation.company.subdomain)
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
      } else {
        router.push(generateUrl('create-new-company'));
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
