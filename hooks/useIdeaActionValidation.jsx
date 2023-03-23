import _ from 'lodash';
import { useSelector } from 'react-redux';
import useGuestValidation from './useGuestValidation';

export default function useIdeaActionValidation(model, fieldName) {
  const { company, isGuest } = useSelector((state) => state.company);
  const { user, userIp, guestInfo } = useSelector((state) => state.auth);
  const guestValidation = useGuestValidation(fieldName);

  if (user) {
    return isGuest ? user?._id === model?.author?._id || user?._id === model?.user?._id : true;
  }
  if (!_.isEmpty(guestInfo) && guestValidation && fieldName !== 'reply') {
    return guestInfo?.email === model?.guestEmail || (company?.role && company?.role !== 'Guest');
  }

  return userIp === model?.ip || (company?.role && company?.role !== 'Guest');
}
