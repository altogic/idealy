import Button from '@/components/Button';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal } from '@/redux/general/generalSlice';
import { endpoint } from '@/utils/altogic';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import IdeaAdminTab from './IdeaAdminTab';

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
    <IdeaAdminTab title="Approval">
      <div className="flex items-center justify-between gap-2">
        <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
          Approve
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => handleApprove(true)}
            text="Approve"
            icon={
              <CheckIcon className="w-4 h-4 text-slate-100 dark:text-aa-200 purple:text-pt-200" />
            }
            variant="indigo"
            loading={loading}
            size="sm"
            height="8"
          />
          <Button
            type="button"
            onClick={() => dispatch(toggleDeleteFeedBackModal())}
            text="Reject"
            icon={<XIcon className="w-4 h-4 text-slate-100 dark:text-aa-200 purple:text-pt-200" />}
            variant="red"
            size="sm"
            height="8"
          />
        </div>
      </div>
    </IdeaAdminTab>
  );
}
