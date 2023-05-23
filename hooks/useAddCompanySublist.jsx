import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';

export default function useAddCompanySublist() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);

  return (name, fieldName, onSuccess) => {
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName,
        value: {
          name,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          order: company[fieldName].length + 1
        },
        onSuccess: (data) => onSuccess(data)
      })
    );
  };
}
