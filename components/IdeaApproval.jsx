import React from 'react';
import Button from '@/components/Button';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal } from '@/redux/general/generalSlice';
import { endpoint } from '@/utils/altogic';
import { useDispatch, useSelector } from 'react-redux';

export default function IdeaApproval() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const loading = useSelector((state) => state.idea.isLoading);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const dispatch = useDispatch();

  function handleApprove(isApproved) {
    updateIdea(
      {
        isApproved
      },
      () => {
        endpoint.post('/idea/approval', {
          companyName: company.name,
          email: idea.author.email || idea.guestEmail,
          message: `Your idea has been ${isApproved ? 'approved' : 'rejected'}`
        });
      }
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={() => handleApprove(true)}
        text="Approve"
        variant="indigo"
        loading={loading}
        fullWidth
        size="sm"
        height="10"
      />
      <Button
        type="button"
        onClick={() => dispatch(toggleDeleteFeedBackModal())}
        text="Reject"
        variant="red"
        fullWidth
        size="sm"
        height="10"
      />
    </div>
  );
}
