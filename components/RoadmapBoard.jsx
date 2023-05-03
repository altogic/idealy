import InfoModal from '@/components/InfoModal';
import RoadmapSection from '@/components/RoadmapSection';
import { Merge } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

export default function RoadmapBoard({ roadmap, roadmapStatuses }) {
  const [state, setState] = useState();
  const [backupState, setBackupState] = useState();
  const [openMergeDialog, setOpenMergeDialog] = useState(false);
  const [mergedIdeas, setMergedIdeas] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.idea.isLoading);
  const { roadmapIdeas } = useSelector((state) => state.idea);
  const { isGuest } = useSelector((state) => state.company);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => ({ ...item, roadmapOrder: index + 1 }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (result.combine) {
      setOpenMergeDialog(true);
      setState((state) => ({
        ...state,
        [result.source.droppableId]: state[result.source.droppableId].filter(
          (idea) => idea._id !== result.draggableId
        )
      }));
      setBackupState(state);
      setMergedIdeas({
        baseIdea: result.combine.draggableId,
        mergedIdea: result.draggableId,
        status: result.combine.droppableId
      });
      return;
    }
    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      // const effectedItems = _.intersectionBy(items, state[sInd], 'roadmapOrder');
      dispatch(ideaActions.updateIdeasOrder({ ideas: items, sourceId: sInd }));
      setState((state) => ({ ...state, [sInd]: items }));
    } else {
      const destinationList = state[dInd] || [];
      const result = move(state[sInd], destinationList, source, destination);
      const sourceIdea = state[sInd][source.index];
      dispatch(
        ideaActions.updateIdea({
          idea: {
            _id: sourceIdea._id,
            status: dInd === 'undefined' ? null : dInd
          },
          onSuccess: () => {
            const orderedResult = result[dInd].map((item, index) => ({
              ...item,
              roadmapOrder: index + 1
            }));
            dispatch(
              ideaActions.updateIdeasOrder({
                ideas: orderedResult,
                sourceId: dInd,
                destinationId: sInd,
                sourceIdea
              })
            );
          }
        })
      );

      setState((state) => ({
        ...state,
        [sInd]: result[sInd],
        [dInd]: result[dInd]
      }));
    }
  };
  function handleMerge() {
    dispatch(
      ideaActions.mergeIdeas({
        baseIdea: mergedIdeas.baseIdea,
        mergedIdea: mergedIdeas.mergedIdea,
        onSuccess: () => setOpenMergeDialog(false)
      })
    );
  }
  function cancelMerge() {
    setOpenMergeDialog(false);
    setState(backupState);
  }
  useEffect(() => {
    if (roadmapIdeas) {
      setState(roadmapIdeas);
    }
  }, [roadmapIdeas]);

  return (
    <div className="flex-1 flex flex-nowrap items-start gap-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {!isGuest && (
          <Droppable droppableId="undefined" index={0} isCombineEnabled>
            {(provided) => (
              <RoadmapSection ideas={state?.undefined} provided={provided} roadmap={roadmap} />
            )}
          </Droppable>
        )}
        {roadmapStatuses?.map((status, index) => (
          <Droppable key={status._id} droppableId={status._id} index={index + 1} isCombineEnabled>
            {(provided) => (
              <RoadmapSection
                status={status}
                ideas={state?.[status._id]}
                provided={provided}
                roadmap={roadmap}
              />
            )}
          </Droppable>
        ))}
      </DragDropContext>
      {!isGuest && (
        <InfoModal
          show={openMergeDialog}
          title="Merge Ideas"
          description={<span>Are you sure you want to merge these ideas?</span>}
          cancelOnClick={() => cancelMerge()}
          onConfirm={() => handleMerge()}
          onClose={() => cancelMerge()}
          icon={<Merge className="w-6 h-6 icon-indigo" />}
          confirmText="Accept"
          cancelText="Decline"
          confirmColor="indigo"
          canCancel
          loading={loading}
        />
      )}
    </div>
  );
}
