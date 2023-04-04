import SectionTitle from '@/components/SectionTitle';
import Toggle from '@/components/Toggle';
import { authActions } from '@/redux/auth/authSlice';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NotificationSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedNotification, setSelectedNotification] = useState();
  const selectedCompany = useSelector((state) => state.company.company);
  const [notification, setNotification] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      dailyDigest: false,
      weeklyDigest: false,
      vote: false,
      comment: false,
      reply: false,
      mention: false,
      adminEditIdea: false,
      ideaApproved: false,
      ideaRejected: false,
      adminAddIdea: false,
      accountApproval: false,
      statusChange: false
    }
  );
  const [disableAll, setDisableAll] = useState();
  useEffect(() => {
    if (user && selectedCompany) {
      const notification = user.notifications?.find((n) => n.companyId === selectedCompany?._id);
      if (notification) {
        setSelectedNotification(notification);
        setNotification({
          ...notification
        });
        setDisableAll(
          notification.dailyDigest &&
            notification.weeklyDigest &&
            notification.vote &&
            notification.comment &&
            notification.reply &&
            notification.mention &&
            notification.adminEditIdea &&
            notification.ideaApproved &&
            notification.ideaRejected &&
            notification.adminAddIdea &&
            notification.accountApproval &&
            notification.statusChange
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
    setNotification({
      dailyDigest: !disableAll,
      weeklyDigest: !disableAll,
      vote: !disableAll,
      comment: !disableAll,
      reply: !disableAll,
      mention: !disableAll,
      adminEdit: !disableAll,
      ideaApproved: !disableAll,
      ideaRejected: !disableAll,
      adminAdd: !disableAll,
      accountApproval: !disableAll,
      statusChange: !disableAll
    });

    setDisableAll(!disableAll);
    dispatch(
      authActions.disableAllNotifications({
        id: selectedNotification?._id,
        value: {
          dailyDigest: !disableAll,
          weeklyDigest: !disableAll,
          vote: !disableAll,
          comment: !disableAll,
          reply: !disableAll,
          mention: !disableAll,
          adminEditIdea: !disableAll,
          ideaApproved: !disableAll,
          ideaRejected: !disableAll,
          adminAddIdea: !disableAll,
          accountApproval: !disableAll,
          statusChange: !disableAll
        }
      })
    );
  };
  return (
    <div className="max-w-lg space-y-16">
      <div className="space-y-6">
        <Toggle
          enabled={notification.dailyDigest}
          title="Daily Admin Digest"
          onChange={() => {
            setNotification({ dailyDigest: !notification.dailyDigest });
            updateNotification('dailyDigest', !notification.dailyDigest);
          }}
        />
        <Toggle
          enabled={notification.weeklyDigest}
          title="Weekly Digest"
          onChange={() => {
            setNotification({ weeklyDigest: !notification.weeklyDigest });
            updateNotification('weeklyDigest', !notification.weeklyDigest);
          }}
        />
        <Toggle
          enabled={notification.vote}
          title="When someone votes on your Idea"
          onChange={() => {
            setNotification({ vote: !notification.vote });
            updateNotification('vote', !notification.vote);
          }}
        />
        <Toggle
          enabled={notification.comment}
          title="When someone comments on your Idea"
          onChange={() => {
            setNotification({ comment: !notification.comment });
            updateNotification('comment', !notification.comment);
          }}
        />
        <Toggle
          enabled={notification.reply}
          title="When someone replies to your comment"
          onChange={() => {
            setNotification({ reply: !notification.reply });
            updateNotification('reply', !notification.reply);
          }}
        />
        <Toggle
          enabled={notification.mention}
          title="When someone mentions you in a comment"
          onChange={() => {
            setNotification({ mention: !notification.mention });
            updateNotification('mention', !notification.mention);
          }}
        />
        <Toggle
          enabled={notification.statusChange}
          title="When the Status of your Idea changes"
          onChange={() => {
            setNotification({ statusChange: !notification.statusChange });
            updateNotification('statusChange', !notification.statusChange);
          }}
        />
        <Toggle
          enabled={notification.adminEditIdea}
          title="When an Admin changes the wording of your Idea"
          onChange={() => {
            setNotification({ adminEditIdea: !notification.adminEditIdea });
            updateNotification('adminEditIdea', !notification.adminEditIdea);
          }}
        />
        <Toggle
          enabled={notification.ideaApproved}
          title="When your Idea is approved"
          onChange={() => {
            setNotification({ ideaApproved: !notification.ideaApproved });
            updateNotification('ideaApproved', !notification.ideaApproved);
          }}
        />
        <Toggle
          enabled={notification.ideaRejected}
          title="When your Idea is rejected"
          onChange={() => {
            setNotification({ ideaRejected: !notification.ideaRejected });
            updateNotification('ideaRejected', !notification.ideaRejected);
          }}
        />
        <Toggle
          enabled={notification.adminAddIdea}
          title="When an Admin adds an Idea for you"
          onChange={() => {
            setNotification({ adminAddIdea: !notification.adminAddIdea });
            updateNotification('adminAddIdea', !notification.adminAddIdea);
          }}
        />
        <Toggle
          enabled={notification.accountApproval}
          title="When your account is approved"
          onChange={() => {
            setNotification({ accountApproval: !notification.accountApproval });
            updateNotification('accountApproval', !notification.accountApproval);
          }}
        />
      </div>
      <div>
        <div className="pb-4 mb-6 border-b border-slate-200">
          <SectionTitle sectionTitle="Personal" />
        </div>
        <Toggle
          enabled={disableAll}
          title={`${!disableAll ? 'Enable' : 'Disable'} all notifications`}
          onChange={toggleAllNotifications}
        />
      </div>
    </div>
  );
}
