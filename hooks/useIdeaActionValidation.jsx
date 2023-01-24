import _ from 'lodash';
import { useSelector } from 'react-redux';

export default function useIdeaActionValidation(model) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const userIp = useSelector((state) => state.auth.userIp);
  const guestInfo = useSelector((state) => state.idea.guestInfo);

  if (user) {
    return user?._id === model?.author?._id || company?.role;
  }
  if (!_.isNil(guestInfo)) {
    return guestInfo?.guestEmail === model?.email || company?.role;
  }

  return userIp === model?.ip || company?.role;
}
