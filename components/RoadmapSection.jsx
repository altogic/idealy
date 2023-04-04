import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { companyActions } from '@/redux/company/companySlice';
import { useMemo, useState } from 'react';
import { Draggable, resetServerContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { realtime } from '@/utils/altogic';
import EmptyState from './EmptyState';
import { Eye, EyeSlash } from './icons';
import RoadMapCard from './RoadMapCard';
import { Tooltip2, TooltipContent, TooltipTrigger } from './Tooltip2';

function RoadmapVisibilityIcon({ isPrivate }) {
  return isPrivate ? (
    <Eye className="w-5 h-5 text-green-500 dark:text-green-600 purple:text-green-600" />
  ) : (
    <EyeSlash className="w-5 h-5 text-red-500 dark:text-red-600 purple:text-red-600" />
  );
}

export default function RoadmapSection({ status, ideas, provided, roadmap, ...rest }) {
  resetServerContext();
  const dispatch = useDispatch();
  const { company, isGuest } = useSelector((state) => state.company);
  const user = useSelector((state) => state.auth.user);
  const [sortedIdeas, setSortedIdeas] = useState();
  const isPrivate = useMemo(
    () => roadmap?.publicStatuses?.includes(status?._id),
    [roadmap, status]
  );
  useUpdateEffect(() => {
    const temp = structuredClone(ideas);
    setSortedIdeas(temp ? temp.sort((a, b) => a.order - b.order) : []);
  }, [ideas]);
  const grid = 16;
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,
    cursor: isGuest ? 'pointer' : draggableStyle.cursor
  });
  return (
    <div
      className="flex-shrink-0 w-[384px] p-6 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg"
      ref={!isGuest ? provided.innerRef : null}
      {...provided.droppableProps}
      {...rest}>
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 mb-4">
        <div className="flex items-center gap-2">
          <svg className="h-2.5 w-2.5" fill={status?.color} viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-medium tracking-sm">
            {status?.name || 'No Status'}{' '}
            <span className="font-normal">({ideas?.length || 0})</span>
          </span>
        </div>
        <div className="relative group border-l border-slate-200 dark:border-aa-600 purple:border-pt-800 px-4">
          {isGuest ? (
            <RoadmapVisibilityIcon isPrivate={isPrivate} />
          ) : (
            <Tooltip2>
              <TooltipTrigger
                onClick={() => {
                  const publicStatuses = structuredClone(roadmap?.publicStatuses || []);
                  if (isPrivate) {
                    publicStatuses.splice(publicStatuses.indexOf(status._id), 1);
                  } else {
                    publicStatuses.push(status._id);
                    realtime.send(company._id, 'make-status-public', {
                      statusId: status._id,
                      roadmapId: roadmap._id,
                      data: sortedIdeas,
                      sender: user?.id
                    });
                  }
                  dispatch(
                    companyActions.updateCompanySubLists({
                      id: roadmap._id,
                      property: 'roadmaps',
                      update: { publicStatuses },
                      role: company?.role
                    })
                  );
                }}>
                <RoadmapVisibilityIcon isPrivate={isPrivate} />
              </TooltipTrigger>
              <TooltipContent>{isPrivate ? 'Hide Status' : 'Show Status'}</TooltipContent>
            </Tooltip2>
          )}
        </div>
      </div>
      <div className="inline overflow-y-auto space-y-4 max-h-[700px]">
        {sortedIdeas?.length ? (
          sortedIdeas?.map((idea, index) => (
            <Draggable key={idea._id} draggableId={idea._id} index={index}>
              {(provided, snapshot) => (
                <RoadMapCard
                  idea={idea}
                  provided={provided}
                  style={getItemStyle(provided.draggableProps.style)}
                  combineWith={snapshot.combineWith}
                />
              )}
            </Draggable>
          ))
        ) : (
          <EmptyState
            title="No feature ideas found"
            description="You don’t have any idea for this status."
          />
        )}
      </div>
      {provided.placeholder}
    </div>
  );
}
