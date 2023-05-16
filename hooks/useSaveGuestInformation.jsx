import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { realtime } from '@/utils/altogic';
import { addGuestInfoToLocalStorage } from '../utils';

export default function useSaveGuestInformation(saveLocal = true) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const user = useSelector((state) => state.auth.user);
  const saveGuestInformation = ({ email, name, avatar, onSuccess }) => {
    if (saveLocal && !email) {
      addGuestInfoToLocalStorage({ name, avatar });
      dispatch(
        authActions.setGuestInfo({
          name,
          avatar
        })
      );
    }

    if (email || user) {
      dispatch(
        companyActions.createCompanyUser({
          companyId: company._id,
          name,
          email: email || user?.email,
          avatar: avatar || guestInfo?.avatar,
          ...(!email && user && { user: user?._id }),
          onSuccess: (user) => {
            if (!user) {
              realtime.join(email);
              addGuestInfoToLocalStorage(user);
              dispatch(
                authActions.setGuestInfo({
                  ...user
                })
              );
            }
            if (onSuccess) onSuccess(user);
          }
        })
      );
    }
  };
  return saveGuestInformation;
}
