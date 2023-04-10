import AddANewRoadMap from '@/components/AddANewRoadMap';
import BaseListBox from '@/components/BaseListBox';
import EmptyState from '@/components/EmptyState';
import Errors from '@/components/Errors';
import { Merge, Plus } from '@/components/icons';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfoModal from '@/components/InfoModal';
import Layout from '@/components/Layout';
import RoadmapSection from '@/components/RoadmapSection';
import SearchInput from '@/components/SearchInput';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { companyActions } from '@/redux/company/companySlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/hooks/useDebounce';
import _ from 'lodash';

function RoadmapVisibilityIcon({ isPublic }) {
  return isPublic ? (
    <LockClosedIcon className="w-7 h-7 text-red-500 dark:text-red-600 purple:text-red-600" />
  ) : (
    <LockOpenIcon className="w-7 h-7 text-green-500 dark:text-green-600 purple:text-green-600" />
  );
}

export default function RoadMapAdmin() {
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);
  const { company, isGuest } = useSelector((state) => state.company);
  const { roadmapIdeas } = useSelector((state) => state.idea);
  const [roadmap, setRoadmap] = useState(company?.roadmaps?.[0]);
  const [state, setState] = useState();
  const [backupState, setBackupState] = useState();
  const [openMergeDialog, setOpenMergeDialog] = useState(false);
  const [mergedIdeas, setMergedIdeas] = useState();
  const [searchText, setSearchText] = useState();
  const [error, setError] = useState();
  const isFiltered = useRef(false);
  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);

  const loading = useSelector((state) => state.idea.isLoading);

  const dispatch = useDispatch();
  useDebounce(searchText, () => {
    if (router.isReady) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          search: searchText
        }
      });
      dispatch(ideaActions.searchRoadmapIdeas(searchText));
    }
  });
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
    setState(backupState);
  }

  function onSearchChange(e) {
    setSearchText(e.target.value);
  }

  const roadmapStatuses = useMemo(() => {
    if (company && roadmap) {
      const temp = structuredClone(company?.statuses);
      const statuses = temp.sort((a, b) => a.order - b.order);
      if (statuses && isGuest) {
        return statuses.filter((status) => roadmap.publicStatuses?.includes(status._id));
      }
      return statuses;
    }
    return [];
  }, [company, roadmap, isGuest]);

  const filteredRoadmaps = useMemo(() => {
    if (company) {
      const temp = structuredClone(company?.roadmaps);
      const roadmaps = temp.sort((a, b) => a.order - b.order);
      return roadmaps;
    }
    return [];
  }, [company]);

  useEffect(() => {
    if (router.isReady && filteredRoadmaps) {
      const roadmapId = router.query.roadmap;
      const roadmap =
        filteredRoadmaps.find((roadmap) => roadmap._id === roadmapId) || filteredRoadmaps[0];
      setRoadmap(roadmap);
      dispatch(ideaActions.setSelectedRoadmap(roadmap));
    }
  }, [filteredRoadmaps, router]);

  useEffect(() => {
    if (roadmapIdeas) {
      setState(roadmapIdeas);
    }
  }, [roadmapIdeas]);

  useEffect(() => {
    if (roadmap) {
      dispatch(
        ideaActions.getIdeasByRoadmap({
          filter: [
            `this.roadmap._id == '${roadmap._id}'`,
            isGuest &&
              'this.showOnRoadMap == true && this.isPrivate == false && this.isArchived == false && this.isApproved == true',
            'this.isMerged== false',
            isGuest &&
              roadmap.publicStatuses?.length &&
              `(${roadmap.publicStatuses
                ?.map((status) => `this.status._id == '${status}'`)
                .join(' || ')})`
          ]
            .filter(Boolean)
            .join(' && ')
        })
      );
    }
  }, [roadmap]);
  useEffect(() => {
    if (company) {
      if (!company?.siteNavigation?.roadmap && !(company?.role && company?.role !== 'Guest')) {
        setError({
          title: 'Roadmaps are disabled',
          message:
            'Roadmaps are disabled for this company. Please contact company administrator for detail information.'
        });
      } else {
        setError(null);
      }
    }
  }, [company]);

  useUpdateEffect(() => {
    if (company && roadmap) {
      const selectedRoadmap = company?.roadmaps.find((r) => r._id === roadmap._id);
      setRoadmap(selectedRoadmap);
    }
  }, [company]);

  useEffect(() => {
    const { search } = router.query;
    if (search) {
      setSearchText(search);
      if (!_.isEmpty(roadmapIdeas) && !isFiltered.current) {
        dispatch(ideaActions.searchRoadmapIdeas(search));
        isFiltered.current = true;
      }
    }
  }, [router.query.search]);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Roadmap Admin Page</title>
        <meta name="description" content="Altogic Canny Alternative Roadmap Admin Page" />
      </Head>
      <Layout>
        <div className="h-[calc(100vh-93px)] w-full px-8">
          {error ? (
            <Errors title={error?.title} message={error?.message} />
          ) : (
            <div className="flex flex-col h-full">
              {!!company?.roadmaps?.length && (
                <>
                  <div className="space-y-2 my-14">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        {isGuest ? (
                          <RoadmapVisibilityIcon isPublic={!roadmap?.isPublic} />
                        ) : (
                          <Tooltip>
                            <TooltipTrigger
                              onClick={() => {
                                dispatch(
                                  companyActions.updateCompanySubLists({
                                    id: roadmap._id,
                                    property: 'roadmaps',
                                    update: { isPublic: !roadmap?.isPublic },
                                    role: company?.role
                                  })
                                );
                                setRoadmap((roadmap) => ({
                                  ...roadmap,
                                  isPublic: !roadmap?.isPublic
                                }));
                              }}>
                              <RoadmapVisibilityIcon isPublic={!roadmap?.isPublic} />
                            </TooltipTrigger>

                            <TooltipContent>
                              {roadmap?.isPublic
                                ? 'Make this roadmap private'
                                : 'Make this roadmap public'}
                            </TooltipContent>
                          </Tooltip>
                        )}

                        <BaseListBox
                          value={roadmap}
                          label={roadmap?.name}
                          field="name"
                          options={filteredRoadmaps}
                          size="xxl"
                          className="flex-1"
                          onChange={(value) => {
                            setRoadmap(value);
                            dispatch(ideaActions.setSelectedIdea(value));
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
                        <SearchInput
                          searchText={searchText}
                          onSearch={(e) => onSearchChange(e)}
                          onClear={() => {
                            setSearchText('');
                            router.push({
                              pathname: router.pathname,
                              query: { ...router.query, search: '' }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                      {roadmap?.description}
                    </p>
                  </div>
                  {!!roadmapStatuses.length && (
                    <div className="flex-1 flex flex-nowrap items-start gap-8 overflow-auto max-w-full">
                      <DragDropContext onDragEnd={onDragEnd}>
                        {!isGuest && (
                          <Droppable droppableId="undefined" index={0} isCombineEnabled>
                            {(provided) => (
                              <RoadmapSection
                                ideas={state?.undefined}
                                provided={provided}
                                roadmap={roadmap}
                              />
                            )}
                          </Droppable>
                        )}
                        {roadmapStatuses?.map((status, index) => (
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
                                roadmap={roadmap}
                              />
                            )}
                          </Droppable>
                        ))}
                      </DragDropContext>
                    </div>
                  )}
                </>
              )}
              <div className="m-auto">
                {((!roadmap?.publicStatuses?.length && isGuest) || !company?.roadmaps?.length) && (
                  <EmptyState
                    title="No items to view"
                    description="There is no public status for this roadmap."
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
        {!isGuest && (
          <>
            <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />
            <InfoModal
              show={openMergeDialog}
              title="Merge Ideas"
              description={<span>Are you sure you want to merge these ideas?</span>}
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
          </>
        )}
      </Layout>
    </>
  );
}
