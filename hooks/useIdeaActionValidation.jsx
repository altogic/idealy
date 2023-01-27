import _ from 'lodash';
import { useSelector } from 'react-redux';
import useGuestValidation from './useGuestValidation';

export default function useIdeaActionValidation(model, fieldName) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const userIp = useSelector((state) => state.auth.userIp);
  const guestInfo = useSelector((state) => state.idea.guestInfo);
  const guestValidation = useGuestValidation(fieldName);

  if (user) {
    return user?._id === model?.author?._id || company?.role;
  }
  if (!_.isEmpty(guestInfo) && guestValidation) {
    return guestInfo?.guestEmail === model?.guestEmail || company?.role;
  }

  return userIp === model?.ip || company?.role;
}
