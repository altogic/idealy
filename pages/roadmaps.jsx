import AddANewRoadMap from '@/components/AddANewRoadMap';
import BaseListBox from '@/components/BaseListBox';
import { Merge, Plus } from '@/components/icons';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfoModal from '@/components/InfoModal';
import Layout from '@/components/Layout';
import RoadmapSection from '@/components/RoadmapSection';
import { Tooltip2, TooltipContent, TooltipTrigger } from '@/components/Tooltip2';
import { companyActions } from '@/redux/company/companySlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

export default function RoadMapAdmin() {
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);
  const { company } = useSelector((state) => state.company);
  const { roadmapIdeas } = useSelector((state) => state.idea);
  const [roadmap, setRoadmap] = useState(company?.roadmaps?.[0]);
  const [state, setState] = useState();
  const [backupState, setBackupState] = useState();
  const [openMergeDialog, setOpenMergeDialog] = useState(false);
  const [mergedIdeas, setMergedIdeas] = useState();
  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);

  const loading = useSelector((state) => state.idea.isLoading);

  const dispatch = useDispatch();
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

    return result;
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
      setBackupState(state[result.source.droppableId]);
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
      const temp = items.map((item, index) => ({ ...item, roadmapOrder: index + 1 }));
      dispatch(ideaActions.updateIdeasOrder({ ideas: temp, sourceId: sInd }));
      setState((state) => ({ ...state, [sInd]: items }));
    } else {
      const destinationList = state[dInd] || [];
      const result = move(state[sInd], destinationList, source, destination);
      const sourceIdea = state[sInd][source.index];
      dispatch(
        ideaActions.updateIdea({
          idea: {
            _id: sourceIdea._id,
            status: dInd
          }
        })
      );

      const orderedResult = result[dInd].map((item, index) => ({
        ...item,
        roadmapOrder: index + 1
      }));
      dispatch(ideaActions.updateIdeasOrder({ ideas: orderedResult, sourceId: dInd }));
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
  function handleCloseIdea() {
    const temp = router.query;
    delete temp?.feedback;
    dispatch(ideaActions.setSelectedIdea(null));
    dispatch(toggleFeedBackDetailModal());
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
  }
  function cancelMerge() {
    setOpenMergeDialog(false);
    setState((state) => ({
      ...state,
      [mergedIdeas.status]: backupState
    }));
  }
  const sortedStatuses = useMemo(() => {
    if (company) {
      const temp = structuredClone(company?.statuses);
      const statuses = temp.sort((a, b) => a.order - b.order);
      if (statuses && (!company?.role || company?.role === 'Guest')) {
        return statuses.filter((status) => status?.showOnRoadMap);
      }
      return statuses;
    }
    return [];
  }, [company]);
  useEffect(() => {
    if (router.isReady && company && !roadmap) {
      const roadmapId = router.query.roadmap;
      const roadmap =
        company?.roadmaps.find((roadmap) => roadmap._id === roadmapId) || company?.roadmaps[0];
      setRoadmap(roadmap);
    }
  }, [company, router]);

  useEffect(() => {
    if (roadmapIdeas) {
      setState(roadmapIdeas);
    }
  }, [roadmapIdeas]);

  useEffect(() => {
    if (roadmap) {
      dispatch(
        ideaActions.getIdeasByRoadmap({
          roadmapId: roadmap._id
        })
      );
    }
  }, [roadmap]);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Roadmap Admin Page</title>
        <meta name="description" content="Altogic Canny Alternative Roadmap Admin Page" />
      </Head>
      <Layout>
        <div className="container ml-auto">
          <div className="mx-auto">
            <div className="space-y-2 my-14">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Tooltip2>
                    <TooltipTrigger
                      onClick={() => {
                        dispatch(
                          companyActions.updateCompanySubLists({
                            id: roadmap._id,
                            property: 'roadmaps',
                            fieldName: 'isPublic',
                            value: !roadmap?.isPublic
                          })
                        );
                        setRoadmap((roadmap) => ({ ...roadmap, isPublic: !roadmap?.isPublic }));
                      }}>
                      {!roadmap?.isPublic ? (
                        <LockClosedIcon className="w-7 h-7 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
                      ) : (
                        <LockOpenIcon className="w-7 h-7 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      {roadmap?.isPublic ? 'Make this roadmap private' : 'Make this roadmap public'}
                    </TooltipContent>
                  </Tooltip2>

                  <BaseListBox
                    value={roadmap}
                    label={roadmap?.name}
                    field="name"
                    options={company?.roadmaps}
                    size="xxl"
                    onChange={(value) => {
                      setRoadmap(value);
                      router.push({
                        pathname: '/roadmaps',
                        query: { roadmap: value._id }
                      });
                    }}
                    type="create">
                    <button
                      type="button"
                      className="inline-flex items-center gap-3 text-slate-400 py-2"
                      onClick={() => setIsCreate(!isCreate)}>
                      <Plus className="w-4 h-4 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
                      Add a new roadmap
                    </button>
                  </BaseListBox>
                </div>
              </div>
              <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                {roadmap?.description}
              </p>
            </div>
          </div>
          <div className="flex flex-nowrap items-start gap-8 overflow-auto max-w-full">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="no-status" index={0} isCombineEnabled>
                {(provided) => <RoadmapSection ideas={state?.['no-status']} provided={provided} />}
              </Droppable>
              {sortedStatuses?.map((status, index) => (
                <Droppable
                  key={status._id}
                  droppableId={status._id}
                  index={index + 1}
                  isCombineEnabled>
                  {(provided) => (
                    <RoadmapSection
                      status={status}
                      ideas={state?.[status._id]}
                      provided={provided}
                    />
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </div>
        <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
        <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />
        <InfoModal
          show={openMergeDialog}
          title="Merge Ideas"
          description={<span>Are you sure you want to merge this ideas?</span>}
          cancelOnClick={() => cancelMerge()}
          onConfirm={() => handleMerge()}
          onClose={() => cancelMerge()}
          icon={<Merge className="w-6 h-6 text-indigo-600" />}
          confirmText="Accept"
          cancelText="Decline"
          confirmColor="indigo"
          canCancel
          loading={loading}
        />
        <AddANewRoadMap
          show={isCreate}
          onClose={() => setIsCreate(false)}
          cancelOnClick={() => setIsCreate(false)}
          title="Create new roadmap"
          description="Please enter a name for this roadmap."
        />
      </Layout>
    </>
  );
}
