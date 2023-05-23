import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useNotification from '@/hooks/useNotification';
import useAddCompanySublist from '@/hooks/useAddCompanySublist';
import BaseListBox from './BaseListBox';
import Button from './Button';
import { Plus, ThreeStar } from './icons';
import CreateModal from './CreateModal';

export default function StatusListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const [status, setStatus] = useState(idea?.status);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const updateIdea = useUpdateIdea(idea);
  const sendNotification = useNotification();
  const addCompanySubList = useAddCompanySublist();

  function handleReset() {
    updateIdea({ status: null, statusUpdatedAt: Date.now(), isCompleted: false }, () => {
      sendNotification({
        message: `The  status of ${idea.title} cleared`,
        targetUser: idea?.author?._id,
        type: 'ideaStatusChanged',
        url: `/public-view?feedback=${idea._id}`
      });
    });

    setStatus(null);
  }
  function handleUpdateIdea(value) {
    setStatus(value);
    updateIdea(
      {
        status: value._id,
        statusUpdatedAt: Date.now(),
        isCompleted: value.isCompletedStatus
      },
      () => {
        sendNotification({
          message: `The  status of <b>${idea.title}</b> changed to <b>${value.name}</b>`,
          targetUser: idea?.author?._id,
          type: 'statusChange',
          url: `/public-view?feedback=${idea._id}`
        });
      }
    );
  }
  function handleCreateStatus(name) {
    addCompanySubList(name, 'statuses', (data) => handleUpdateIdea(data));
  }
  useEffect(() => {
    if (idea) {
      setStatus(idea?.status);
    }
  }, [idea]);

  return (
    <>
      <div>
        {!!company?.statuses.length && (
          <BaseListBox
            value={status}
            label={status?.name}
            onChange={(value) => handleUpdateIdea(value)}
            field="name"
            options={company?.statuses}
            size={size}
            type="status"
            onReset={() => handleReset()}
          />
        )}
        <Button
          variant="text"
          text="Add Status"
          icon={<Plus className="w-4 h-4 icon" />}
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={(name) => handleCreateStatus(name)}
        icon={<ThreeStar className="w-6 h-6 icon-green" />}
        title="Add Status"
        description="Add a new status to your company"
        label="Status Name"
        id="status"
      />
    </>
  );
}
