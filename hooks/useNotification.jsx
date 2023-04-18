import { notificationActions } from '@/redux/notification/notificationSlice';
import localStorageUtil from '@/utils/localStorageUtil';
import { useDispatch, useSelector } from 'react-redux';

export default function useNotification() {
  const dispatch = useDispatch();
  const { user, guestInfo } = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company.company);

  const sendNotification = ({ message, targetUser, type, url, companyId, userId, name }) => {
    if (targetUser && targetUser === user?._id) return;
    const guest = guestInfo?._id ? guestInfo : localStorageUtil.get('guestAuthentication');
    dispatch(
      notificationActions.sendNotification({
        user: userId ?? user?._id,
        companyId: companyId ?? company?._id,
        guest: guest?._id,
        name,
        message,
        targetUser,
        type,
        url
      })
    );
  };

  return sendNotification;
}
