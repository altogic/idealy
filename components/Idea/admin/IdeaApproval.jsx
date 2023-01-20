import useUpdateIdea from '@/hooks/useUpdateIdea';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaApproval() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const isLoading = useRef(false);
  const loading = useSelector((state) => state.idea.isLoading);
  const updateIdea = useUpdateIdea(idea);

  function handleApprove(isApproved) {
    isLoading.current = true;

    updateIdea({ isApproved });
  }
  useEffect(() => {
    isLoading.current = false;
  }, [isLoading]);

  return (
    <IdeaAdminTab title="Approval">
      <div className="flex items-center justify-between gap-2">
        <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
          Approve
        </span>
        <div className="flex items-center gap-2">
          {loading && isLoading.current ? (
            <ClipLoader
              size={15}
              color="#4B5563"
              loading={loading && isLoading.current}
              className="mr-4"
            />
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleApprove(true)}
                className="flex items-center gap-2 p-2 text-sm bg-slate-100 dark:bg-aa-700 purple:bg-pt-700 rounded-lg hover:bg-slate-200 dark:hover:bg-aa-900 dark:purple:bg-pt-800">
                <CheckIcon className="w-4 h-4 text-slate-900 dark:text-aa-200 purple:text-pt-200" />
                <span className="text-slate-900 dark:text-aa-100 purple:text-pt-100">Yes</span>
              </button>
              <button
                type="button"
                onClick={() => handleApprove(false)}
                className="flex items-center gap-2 p-2 text-sm bg-slate-100 dark:bg-aa-700 purple:bg-pt-700 rounded-lg hover:bg-slate-200 dark:hover:bg-aa-900 dark:purple:bg-pt-800">
                <XIcon className="w-4 h-4 text-slate-900 dark:text-aa-200 purple:text-pt-200" />
                <span className="text-slate-900 dark:text-aa-100 purple:text-pt-100">No</span>
              </button>
            </>
          )}
        </div>
      </div>
    </IdeaAdminTab>
  );
}
