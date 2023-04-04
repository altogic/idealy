import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useNotification from '@/hooks/useNotification';
import BaseListBox from './BaseListBox';

export default function StatusListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const [status, setStatus] = useState(idea?.status);
  const sendNotification = useNotification();
  function handleReset() {
    updateIdea({ status: null, statusUpdatedAt: Date.now(), isCompleted: false }, () => {
      sendNotification({
        message: `The  status of ${idea.title} cleared`,
        targetUser: idea?.author?._id,
        type: 'ideaStatusChanged',
        url: `public-view?feedback=${idea._id}`
      });
    });

    setStatus(null);
  }

  useEffect(() => {
    if (idea) {
      setStatus(idea?.status);
    }
  }, [idea]);

  return (
    <BaseListBox
      value={status}
      label={status?.name}
      onChange={(value) => {
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
              url: `public-view?feedback=${idea._id}`
            });
          }
        );
      }}
      field="name"
      options={company?.statuses}
      size={size}
      type="status"
      onReset={() => handleReset()}
    />
  );
}
