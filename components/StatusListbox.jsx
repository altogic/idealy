import useAddCompanySublist from '@/hooks/useAddCompanySublist';
import useNotification from '@/hooks/useNotification';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';
import Button from './Button';
import CreateModal from './CreateModal';
import { Plus, ThreeStar } from './icons';

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
        message: `The  status of <b>${idea.title}</b> removed`,
        targetUser: idea?.author?._id,
        type: 'ideaStatusChanged',
        ideaId: idea._id
      });
    });

    setStatus(null);
  }
  const handleUpdateIdea = (value) => {
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
          ideaId: idea._id
        });
      }
    );
  };
  function handleCreateStatus(name) {
    addCompanySubList(name, 'statuses', (data) => handleUpdateIdea(data));
  }

  useEffect(() => {
    if (idea) {
      const status = company?.statuses.find((status) => status._id === idea?.status?._id);
      setStatus(status);
    }
  }, [idea]);

  return (
    <>
      <div>
        {!!company?.statuses.length && (
          <BaseListBox
            value={status}
            label={status?.name}
            onChange={handleUpdateIdea}
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
