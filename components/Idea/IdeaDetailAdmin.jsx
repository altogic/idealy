import { useSelector } from 'react-redux';
import Divider from '../Divider';
import IdeaActions from './admin/IdeaActions';
import IdeaApproval from './admin/IdeaApproval';
import IdeaPriority from './admin/IdeaPriority';
import IdeaStatuses from './admin/IdeaStatuses';
import IdeaVisibility from './admin/IdeaVisibility';

export default function IdeaDetailAdmin() {
  const idea = useSelector((state) => state.idea.selectedIdea);

  return (
    <div className="flex-shrink-0 w-72 bg-white dark:bg-aa-900 purple:bg-pt-1000 border-r border-slate-200 dark:border-aa-600 purple:border-pt-800">
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 p-5 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-aa-200 purple:text-pt-200">
            Admin
          </h2>
        </div>
        <div className="flex flex-col flex-1 bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-4 overflow-y-auto">
          <IdeaStatuses />
          <Divider className="my-4" />
          <IdeaPriority />
          <Divider className="my-4" />
          <IdeaVisibility />
          {!idea?.isApproved && (
            <>
              <Divider className="my-4" />
              <IdeaApproval />
            </>
          )}
        </div>
        <IdeaActions />
      </div>
    </div>
  );
}
