import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { addGuestInfoToLocalStorage } from '../utils';

export default function useSaveGuestInformation() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const saveGuestInformation = ({ email, name, avatar }) => {
    console.log('saveGuestInformation', email, name, avatar);
    addGuestInfoToLocalStorage(email, name, avatar);
    dispatch(
      authActions.setGuestInfo({
        email,
        name,
        avatar: avatar || guestInfo.avatar
      })
    );
    if (email) {
      dispatch(
        companyActions.createCompanyUser({
          companyId: company._id,
          name,
          email,
          avatar: avatar || guestInfo.avatar
        })
      );
    }
  };
  return saveGuestInformation;
}
