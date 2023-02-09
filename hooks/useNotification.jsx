import { notificationActions } from '@/redux/notification/notificationSlice';
import { queue, realtime } from '@/utils/altogic';
import { useDispatch, useSelector } from 'react-redux';

export default function useNotification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const sendNotification = ({ message, targetUser, type, notificationType, subject }) => {
    dispatch(
      notificationActions.sendNotification({
        user: user._id,
        companyId: company._id,
        message,
        targetUser,
        type
      })
    );
    realtime.send(
      notificationType === 'company' ? company._id : targetUser,
      notificationType === 'company' ? 'notification' : 'user-notification',
      {
        ...(notificationType === 'company' ? { companyId: company._id } : { userId: targetUser }),
        user,
        message,
        type
      }
    );

    queue.submitMessage('63e4dd7a04f6cf50c3ac8851', {
      entry: {
        targetUser,
        message,
        type: notificationType,
        subject,
        companyName: company.name
      }
    });
  };
  return sendNotification;
}
