import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import BaseListBox from './BaseListBox';

export default function UserSegmentListbox({ size, user }) {
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const [segments, setSegments] = useState(null);
  function handleReset() {
    setSegments(null);
    dispatch(
      companyActions.updateCompanyUser({
        _id: user?._id,
        segment: null
      })
    );
  }
  useEffect(() => {
    if (user) {
      setSegments(user?.segment);
    }
  }, [user]);
  return (
    <BaseListBox
      value={segments}
      label={segments?.name}
      onChange={(value) => {
        setSegments(value);
        dispatch(
          companyActions.updateCompanyUser({
            _id: user?._id,
            segment: value?._id
          })
        );
      }}
      field="name"
      type="status"
      options={company?.userSegments}
      size={size}
      onReset={() => handleReset()}
    />
  );
}
