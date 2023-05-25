import { notificationActions } from '@/redux/notification/notificationSlice';
import localStorageUtil from '@/utils/localStorageUtil';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import _ from 'lodash';
import useUpdateEffect from './useUpdatedEffect';

export default function useNotification() {
  const dispatch = useDispatch();
  const { user, guestInfo } = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company.company);
  const [notificationRequest, setNotificationRequest] = useState({});
  const sendNotification = ({
    message,
    targetUser,
    type,
    url,
    ideaId,
    companyId,
    userId,
    name
  }) => {
    if (targetUser && targetUser === user?._id) return;
    const guest = guestInfo?._id ? guestInfo : localStorageUtil.get('guestAuthentication');
    if (!guest) {
      setNotificationRequest({
        user: userId ?? user?._id,
        companyId: companyId ?? company?._id,
        guest: guest?._id,
        name,
        message,
        targetUser,
        type,
        url,
        ideaId
      });
    }
    if (user || guest) {
      dispatch(
        notificationActions.sendNotification({
          user: userId ?? user?._id,
          companyId: companyId ?? company?._id,
          guest: guest?._id,
          name,
          message,
          targetUser,
          type,
          url,
          ideaId
        })
      );
    }
  };

  useUpdateEffect(() => {
    if (!_.isEmpty(guestInfo) && !_.isEmpty(notificationRequest)) {
      dispatch(
        notificationActions.sendNotification({
          ...notificationRequest,
          guest: guestInfo._id
        })
      );
      setNotificationRequest({});
    }
  }, [guestInfo, notificationRequest]);

  return sendNotification;
}
