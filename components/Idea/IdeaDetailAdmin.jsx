import cn from 'classnames';
import { useSelector } from 'react-redux';
import Divider from '../Divider';
import { Close } from '../icons';
import IdeaActions from './admin/IdeaActions';
import IdeaApprovalTab from './admin/IdeaApprovalTab';
import IdeaPriorityTab from './admin/IdeaPriorityTab';
import IdeaStatuses from './admin/IdeaStatuses';
import IdeaVisibilityTab from './admin/IdeaVisibilityTab';

export default function IdeaDetailAdmin({ adminOpen, setAdminOpen }) {
  const idea = useSelector((state) => state.idea.selectedIdea);

  return (
    <div
      className={cn(
        `flex-shrink-0 lg:w-72 bg-white dark:bg-aa-900 purple:bg-pt-1000 border-r border-slate-200 dark:border-aa-600 purple:border-pt-800`,
        adminOpen ? 'block w-full h-full z-50' : 'fixed top-0 left-0 lg:relative'
      )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between flex-shrink-0 p-5 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-aa-200 purple:text-pt-200">
            Admin
          </h2>
          <button
            type="button"
            onClick={() => setAdminOpen(false)}
            className="inline-flex lg:hidden items-center justify-center w-8 h-8 text-slate-500 rounded-md transition">
            <span className="sr-only">Close panel</span>
            <Close className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
          </button>
        </div>
        <div className="flex flex-col flex-1 bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-4 overflow-y-auto">
          <IdeaStatuses />
          <Divider className="my-4" />
          <IdeaPriorityTab />
          <Divider className="my-4" />
          <IdeaVisibilityTab />
          {!idea?.isApproved && (
            <>
              <Divider className="my-4" />
              <IdeaApprovalTab />
            </>
          )}
        </div>
        <IdeaActions />
      </div>
    </div>
  );
}
