import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { addGuestInfoToLocalStorage } from '../utils';

export default function useSaveGuestInformation(saveLocal = true) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const saveGuestInformation = ({ email, name, avatar, onSuccess }) => {
    if (saveLocal && !email) {
      addGuestInfoToLocalStorage({ name, avatar });
    }

    if (email) {
      dispatch(
        companyActions.createCompanyUser({
          companyId: company._id,
          name,
          email,
          avatar: avatar || guestInfo.avatar,
          onSuccess: (user) => {
            if (onSuccess) onSuccess();
            addGuestInfoToLocalStorage(user);
            dispatch(
              authActions.setGuestInfo({
                ...user
              })
            );
          }
        })
      );
    }
  };
  return saveGuestInformation;
}
