import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { companyActions } from '@/redux/company/companySlice';
import cn from 'classnames';
import { useMemo, useState } from 'react';
import { Draggable, resetServerContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from './EmptyState';
import RoadMapCard from './RoadMapCard';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { Eye, EyeSlash } from './icons';
import RoadmapCardSkeleton from './RoadmapCardSkeleton';

function RoadmapVisibilityIcon({ isPrivate, disabled }) {
  return isPrivate ? (
    <Eye
      className={cn(
        'w-5 h-5 text-green-500 dark:text-green-600 purple:text-green-600',
        disabled && 'opacity-50'
      )}
    />
  ) : (
    <EyeSlash
      className={cn(
        'w-5 h-5 text-red-500 dark:text-red-600 purple:text-red-600',
        disabled && 'opacity-50'
      )}
    />
  );
}

export default function RoadmapSection({ status, ideas, provided, roadmap, ...rest }) {
  resetServerContext();
  const dispatch = useDispatch();
  const { company, isGuest } = useSelector((state) => state.company);
  const loading = useSelector((state) => state.idea.getIdeaLoading);
  const [sortedIdeas, setSortedIdeas] = useState();
  const isPrivate = useMemo(
    () => roadmap?.publicStatuses?.includes(status?._id),
    [roadmap, status]
  );
  useUpdateEffect(() => {
    const temp = structuredClone(ideas);
    setSortedIdeas(temp?.length ? temp.sort((a, b) => a.order - b.order) : []);
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
        <div className="flex items-center gap-2 flex-1">
          <svg className="h-2.5 w-2.5" fill={status?.color} viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>

          <div className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-medium tracking-sm flex items-center justify-between flex-1 ">
            <span className="truncate max-w-[16rem] block">{status?.name || 'No Status'} </span>
            <div className="rounded-md border border-slate-200 dark:border-aa-1000 purple:border-pt-1000 px-2 bg-slate-50 dark:bg-aa-600 purple:bg-pt-800 ">
              <span className="font-normal">{ideas?.length || 0}</span>
            </div>
          </div>
        </div>
        <div className="relative group border-l border-slate-200 dark:border-aa-600 purple:border-pt-800 px-4 flex items-center">
          {isGuest ? (
            <RoadmapVisibilityIcon isPrivate={isPrivate} />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => {
                    const publicStatuses = structuredClone(roadmap?.publicStatuses || []);
                    if (isPrivate) {
                      publicStatuses.splice(publicStatuses.indexOf(status._id), 1);
                    } else {
                      publicStatuses.push(status._id);
                    }
                    dispatch(
                      companyActions.updateCompanySubLists({
                        id: roadmap._id,
                        property: 'roadmaps',
                        update: { publicStatuses },
                        role: company?.role
                      })
                    );
                  }}
                  disabled={!status?.name}
                  className={cn(!status?.name && 'cursor-not-allowed')}>
                  <RoadmapVisibilityIcon isPrivate={isPrivate} disabled={!status?.name} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{isPrivate ? 'Hide Status' : 'Show Status'}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="inline overflow-y-auto space-y-4 max-h-[700px]">
        {loading ? (
          <RoadmapCardSkeleton />
        ) : sortedIdeas?.length ? (
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
