import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import IdeaActions from './admin/IdeaActions';
import IdeaPriority from './admin/IdeaPriority';
import IdeaStatuses from './admin/IdeaStatuses';
import IdeaVisibility from './admin/IdeaVisibility';

export default function IdeaDetailAdmin() {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);

  const updateIdea = (req) => {
    dispatch(
      ideaActions.updateIdea({
        _id: idea._id,
        ...req
      })
    );
  };

  return (
    <div className="flex-shrink-0 w-72 bg-white dark:bg-aa-900 purple:bg-pt-1000 border-r border-slate-200 dark:border-aa-600 purple:border-pt-800">
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 px-4 py-9 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-aa-200 purple:text-pt-200">
            Admin
          </h2>
        </div>
        <div className="flex flex-col flex-1 bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-4 overflow-y-auto">
          <IdeaStatuses updateIdea={(req) => updateIdea(req)} />
          <hr className="my-2 border-slate-200 dark:border-aa-600 purple:border-pt-800" />
          <IdeaPriority updateIdea={(req) => updateIdea(req)} />
          <hr className="my-2 border-slate-200 dark:border-aa-600 purple:border-pt-800" />
          <IdeaVisibility updateIdea={(req) => updateIdea(req)} />
        </div>
        <IdeaActions updateIdea={(req) => updateIdea(req)} />
      </div>
    </div>
  );
}
