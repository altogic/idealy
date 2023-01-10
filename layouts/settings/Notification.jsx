import { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Toggle from '@/components/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';

export default function Notification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedNotification, setSelectedNotification] = useState();
  const selectedCompany = useSelector((state) => state.company.company);
  const [disableAll, setDisableAll] = useState();
  const [dailyDigest, setDailyDigest] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [voteOnIdea, setVoteOnIdea] = useState(false);
  const [commentOnIdea, setCommentOnIdea] = useState(false);
  const [replyOnIdea, setReplyOnIdea] = useState(false);
  const [mentionInAComment, setMentionInAComment] = useState(false);
  const [adminEditIdea, setAdminEditIdea] = useState(false);
  const [ideaApproved, setIdeaApproved] = useState(false);
  const [ideaRejected, setIdeaRejected] = useState(false);
  const [adminAddIdea, setAdminAddIdea] = useState(false);
  const [adminVoteIdea, setAdminVoteIdea] = useState(false);
  const [accountApproval, setAccountApproval] = useState(false);
  const [ideaStatusChange, setIdeaStatusChange] = useState(false);

  useEffect(() => {
    if (user && selectedCompany) {
      const notification = user.notifications?.find((n) => n.companyId === selectedCompany?._id);
      if (notification) {
        setSelectedNotification(notification);
        setDailyDigest(notification.dailyDigest);
        setWeeklyDigest(notification.weeklyDigest);
        setVoteOnIdea(notification.voteOnIdea);
        setCommentOnIdea(notification.commentOnIdea);
        setReplyOnIdea(notification.replyOnIdea);
        setMentionInAComment(notification.mentionInAComment);
        setAdminEditIdea(notification.adminEditIdea);
        setIdeaApproved(notification.ideaApproved);
        setIdeaRejected(notification.ideaRejected);
        setAdminAddIdea(notification.adminAddIdea);
        setAdminVoteIdea(notification.adminVoteIdea);
        setAccountApproval(notification.accountApproval);
        setIdeaStatusChange(notification.ideaStatusChange);
        setDisableAll(
          notification.dailyDigest &&
            notification.weeklyDigest &&
            notification.voteOnIdea &&
            notification.commentOnIdea &&
            notification.replyOnIdea &&
            notification.mentionInAComment &&
            notification.adminEditIdea &&
            notification.ideaApproved &&
            notification.ideaRejected &&
            notification.adminAddIdea &&
            notification.adminVoteIdea &&
            notification.accountApproval
        );
      }
    }
  }, [user, selectedCompany]);
  const updateNotification = (fieldName, value) => {
    dispatch(
      authActions.updateNotificationSettings({ id: selectedNotification?._id, fieldName, value })
    );
  };
  const toggleAllNotifications = () => {
    setDailyDigest(!disableAll);
    setWeeklyDigest(!disableAll);
    setVoteOnIdea(!disableAll);
    setCommentOnIdea(!disableAll);
    setReplyOnIdea(!disableAll);
    setMentionInAComment(!disableAll);
    setAdminEditIdea(!disableAll);
    setIdeaApproved(!disableAll);
    setIdeaRejected(!disableAll);
    setAdminAddIdea(!disableAll);
    setAdminVoteIdea(!disableAll);
    setAccountApproval(!disableAll);
    setIdeaStatusChange(!disableAll);
    setDisableAll(!disableAll);
    dispatch(
      authActions.disableAllNotifications({
        id: selectedNotification?._id,
        value: {
          dailyDigest: !disableAll,
          weeklyDigest: !disableAll,
          voteOnIdea: !disableAll,
          commentOnIdea: !disableAll,
          replyOnIdea: !disableAll,
          mentionInAComment: !disableAll,
          adminEditIdea: !disableAll,
          ideaApproved: !disableAll,
          ideaRejected: !disableAll,
          adminAddIdea: !disableAll,
          adminVoteIdea: !disableAll,
          accountApproval: !disableAll,
          ideaStatusChange: !disableAll
        }
      })
    );
  };
  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
        <SectionTitle
          sectionTitle="Notifications"
          sectionDescription="Keep your inbox under control."
          big
        />
      </div>
      <div className="max-w-lg">
        <div className="space-y-6">
          <Toggle
            enabled={dailyDigest}
            title="Daily Admin Digest"
            onChange={() => {
              setDailyDigest(!dailyDigest);
              updateNotification('dailyDigest', !dailyDigest);
            }}
          />
          <Toggle
            enabled={weeklyDigest}
            title="Weekly Digest"
            onChange={() => {
              setWeeklyDigest(!weeklyDigest);
              updateNotification('weeklyDigest', !weeklyDigest);
            }}
          />
          <Toggle
            enabled={voteOnIdea}
            title="When someone votes on your Idea"
            onChange={() => {
              setVoteOnIdea(!voteOnIdea);
              updateNotification('voteOnIdea', !voteOnIdea);
            }}
          />
          <Toggle
            enabled={commentOnIdea}
            title="When someone comments on your Idea"
            onChange={() => {
              setCommentOnIdea(!commentOnIdea);
              updateNotification('commentOnIdea', !commentOnIdea);
            }}
          />
          <Toggle
            enabled={replyOnIdea}
            title="When someone replies to your comment"
            onChange={() => {
              setReplyOnIdea(!replyOnIdea);
              updateNotification('replyOnIdea', !replyOnIdea);
            }}
          />
          <Toggle
            enabled={mentionInAComment}
            title="When someone mentions you in a comment"
            onChange={() => {
              setMentionInAComment(!mentionInAComment);
              updateNotification('mentionInAComment', !mentionInAComment);
            }}
          />
          <Toggle
            enabled={ideaStatusChange}
            title="When the Status of your Idea changes"
            onChange={() => {
              setIdeaStatusChange(!ideaStatusChange);
              updateNotification('ideaStatusChange', !ideaStatusChange);
            }}
          />
          <Toggle
            enabled={adminEditIdea}
            title="When an Admin changes the wording of your Idea"
            onChange={() => {
              setAdminEditIdea(!adminEditIdea);
              updateNotification('adminEditIdea', !adminEditIdea);
            }}
          />
          <Toggle
            enabled={ideaApproved}
            title="When your Idea is approved"
            onChange={() => {
              setIdeaApproved(!ideaApproved);
              updateNotification('ideaApproved', !ideaApproved);
            }}
          />
          <Toggle
            enabled={ideaRejected}
            title="When your Idea is rejected"
            onChange={() => {
              setIdeaRejected(!ideaRejected);
              updateNotification('ideaRejected', !ideaRejected);
            }}
          />
          <Toggle
            enabled={adminAddIdea}
            title="When an Admin adds an Idea for you"
            onChange={() => {
              setAdminAddIdea(!adminAddIdea);
              updateNotification('adminAddIdea', !adminAddIdea);
            }}
          />
          <Toggle
            enabled={adminVoteIdea}
            title="When an Admin votes on an Idea for you"
            onChange={() => {
              setAdminVoteIdea(!adminVoteIdea);
              updateNotification('adminVoteIdea', !adminVoteIdea);
            }}
          />
          <Toggle
            enabled={accountApproval}
            title="When your account is approved"
            onChange={() => {
              setAccountApproval(!accountApproval);
              updateNotification('accountApproval', !accountApproval);
            }}
          />
        </div>
        <hr className="mt-6 mb-20 border-slate-200" />
        <div className="pb-4 mb-6 border-b border-slate-200">
          <SectionTitle sectionTitle="Personal" />
        </div>
        <Toggle
          enabled={disableAll}
          title={`${!disableAll ? 'Enable' : 'Disable'} all notifications`}
          onChange={toggleAllNotifications}
        />
      </div>
    </>
  );
}
