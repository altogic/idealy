import { notificationActions } from '@/redux/notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl } from '../utils';

export default function useNotification() {
  const dispatch = useDispatch();
  const { user, guestInfo } = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company.company);

  const sendNotification = ({ message, targetUser, type, url, companyId, userId, subdomain }) => {
    if (targetUser && targetUser === user?._id) return;
    dispatch(
      notificationActions.sendNotification({
        user: userId ?? user?._id,
        companyId: companyId ?? company?._id,
        guest: guestInfo?._id,
        message,
        targetUser,
        type,
        url: generateUrl(url, company?.subdomain ?? subdomain)
      })
    );
  };
  return sendNotification;
}
