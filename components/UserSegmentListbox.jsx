import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import useAddCompanySublist from '@/hooks/useAddCompanySublist';
import BaseListBox from './BaseListBox';
import Button from './Button';
import { Plus, ThreeStar } from './icons';
import CreateModal from './CreateModal';

export default function UserSegmentListbox({ size, user }) {
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const [segments, setSegments] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const addCompanySubList = useAddCompanySublist();

  function handleReset() {
    setSegments(null);
    dispatch(
      companyActions.updateCompanyUser({
        _id: user?._id,
        segment: null
      })
    );
  }
  function handleUpdateUser(value) {
    setSegments(value);
    dispatch(
      companyActions.updateCompanyUser({
        _id: user?._id,
        segment: value?._id
      })
    );
  }
  function handleCreateCategory(name) {
    addCompanySubList(name, 'userSegments', (data) => handleUpdateUser(data));
  }
  useEffect(() => {
    if (user) {
      setSegments(user?.segment);
    }
  }, [user]);
  return (
    <>
      <div>
        {!!company?.userSegments.length && (
          <BaseListBox
            value={segments}
            label={segments?.name}
            onChange={(value) => handleUpdateUser(value)}
            field="name"
            type="status"
            options={company?.userSegments}
            size={size}
            onReset={() => handleReset()}
          />
        )}
        <Button
          variant="text"
          text="Add User Segment"
          icon={<Plus className="w-4 h-4 icon" />}
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={(name) => handleCreateCategory(name)}
        icon={<ThreeStar className="w-6 h-6 icon-green" />}
        title="Add User Segment"
        description="Add a new user segment to your company"
        label="User Segment Name"
        id="userSegment"
      />
    </>
  );
}
