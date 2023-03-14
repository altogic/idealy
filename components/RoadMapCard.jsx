import useRouteIdea from '@/hooks/useRouteIdea';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopicBadges from './TopicBadges';

export default function RoadMapCard({ idea, provided, ...rest }) {
  const routeIdea = useRouteIdea();
  const dispatch = useDispatch();
  const [ideaState, setIdeaState] = useState();
  const { selectedIdea } = useSelector((state) => state.idea);
  const handleClickIdea = () => {
    routeIdea(idea._id);
    dispatch(ideaActions.setSelectedIdea(idea));
    dispatch(toggleFeedBackDetailModal());
  };
  useUpdateEffect(() => {
    if (selectedIdea && selectedIdea._id === idea._id) {
      setIdeaState(selectedIdea);
    }
  }, [selectedIdea]);

  useEffect(() => {
    if (idea) {
      setIdeaState(idea);
    }
  }, [idea]);

  return (
    <button type="button" onClick={handleClickIdea}>
      <div
        className="p-4 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg mt-2 text-left"
        ref={provided?.innerRef}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
        {...rest}>
        {ideaState?.coverImage && (
          <img
            src={ideaState?.coverImage}
            className="w-full h-[135px] mb-4 object-cover rounded-lg"
            alt={ideaState?.title}
          />
        )}

        <div className="flex gap-3.5">
          <span className="inline-flex items-center justify-center flex-shrink-0 w-[50px] h-[50px] text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-2xl font-semibold tracking-md border-2 border-slate-300 rounded-lg">
            {ideaState?.voteCount}
          </span>
          <div>
            <div className="flex items-start justify-between gap-3.5">
              <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-5 text-base font-semibold tracking-sm">
                {ideaState?.title}
              </h6>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {idea?.topics.map((topic) => (
                <TopicBadges key={topic} badgeName={topic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
