import { companyActions } from '@/redux/company/companySlice';
import { Draggable, resetServerContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import EmptyState from './EmptyState';
import { Eye, EyeSlash } from './icons';
import RoadMapCard from './RoadMapCard';
import { Tooltip2, TooltipContent, TooltipTrigger } from './Tooltip2';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  position: isDragging ? 'absolute' : '',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',

  // styles we need to apply on draggables
  ...draggableStyle
});
export default function RoadmapSection({ status, ideas, provided, ...rest }) {
  resetServerContext();
  const dispatch = useDispatch();
  return (
    <div
      className="flex-shrink-0 w-[384px] p-6 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg"
      ref={provided.innerRef}
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
          <Tooltip2>
            <TooltipTrigger
              onClick={() => {
                dispatch(
                  companyActions.updateCompanySubLists({
                    id: status._id,
                    property: 'statuses',
                    fieldName: 'showOnRoadMap',
                    value: !status?.showOnRoadMap
                  })
                );
              }}>
              {status?.showOnRoadMap ? (
                <Eye className="w-5 h-5 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
              ) : (
                <EyeSlash className="w-5 h-5 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
              )}
            </TooltipTrigger>
            <TooltipContent>{status?.showOnRoadMap ? 'Hide Status' : 'Show Status'}</TooltipContent>
          </Tooltip2>
        </div>
      </div>
      <div className="inline overflow-y-auto space-y-4 max-h-[700px]">
        {ideas?.length ? (
          ideas?.map((idea, index) => (
            <Draggable key={idea._id} draggableId={idea._id} index={index}>
              {(provided, snapshot) => (
                <RoadMapCard
                  idea={idea}
                  provided={provided}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
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
