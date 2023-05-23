import AddANewRoadMap from '@/components/AddANewRoadMap';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import Errors from '@/components/Errors';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import Layout from '@/components/Layout';
import RoadmapBoard from '@/components/RoadmapBoard';
import RoadmapFilter from '@/components/RoadmapFilter';
import { Plus } from '@/components/icons';
import useCheckCompanyPrivacy from '@/hooks/useCheckCompanyPrivacy';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function RoadMapAdmin() {
  const router = useRouter();
  const { company, isGuest } = useSelector((state) => state.company);
  const [roadmap, setRoadmap] = useState(company?.roadmaps?.[0]);
  const [openCreateRoadmapModal, setOpenCreateRoadmapModal] = useState(false);
  const [error, setError] = useState();

  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  useCheckCompanyPrivacy();
  const dispatch = useDispatch();

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

  const roadmapStatuses = useMemo(() => {
    if (company?.statuses && roadmap) {
      const temp = structuredClone(company?.statuses);
      const statuses = temp.sort((a, b) => a.order - b.order);
      if (statuses && isGuest) {
        return statuses.filter((status) => roadmap.publicStatuses?.includes(status._id));
      }
      return statuses;
    }
    return [];
  }, [company?.statuses, roadmap, isGuest]);

  const sortedRoadmaps = useMemo(() => {
    if (company?.roadmaps) {
      const temp = structuredClone(company?.roadmaps);
      const roadmaps = temp.sort((a, b) => a.order - b.order);
      return roadmaps;
    }
    return [];
  }, [company?.roadmaps]);

  useEffect(() => {
    if (router.isReady && sortedRoadmaps) {
      const roadmapId = router.query.roadmap;
      const roadmap =
        sortedRoadmaps.find((roadmap) => roadmap._id === roadmapId) || sortedRoadmaps[0];
      setRoadmap(roadmap);
      dispatch(ideaActions.setSelectedRoadmap(roadmap));
    }
  }, [sortedRoadmaps, router]);

  useEffect(() => {
    if (roadmap) {
      dispatch(
        ideaActions.getIdeasByRoadmap({
          filter: [
            `this.roadmap._id == '${roadmap._id}'`,
            isGuest &&
              'this.showOnRoadMap == true && this.isPrivate == false && this.isArchived == false && this.isApproved == true',
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
  }, [company?.siteNavigation, company?.role]);

  useUpdateEffect(() => {
    if (company?.roadmaps && roadmap) {
      const selectedRoadmap = company?.roadmaps.find((r) => r._id === roadmap._id);
      setRoadmap(selectedRoadmap);
    }
  }, [company?.roadmaps]);

  return (
    <>
      <Head>
        <title>Idealy - Roadmap</title>
      </Head>
      <Layout>
        <div className="overflow-auto max-w-full">
          <div className="h-[calc(100vh-97px)] w-full px-4 lg:px-8">
            {error ? (
              <Errors title={error?.title} message={error?.message} />
            ) : (
              <div className="flex flex-col h-full  ">
                {!!company?.roadmaps?.length && (
                  <>
                    <div className="space-y-2 my-14">
                      <div className="flex items-center gap-2">
                        <RoadmapFilter
                          roadmap={roadmap}
                          setRoadmap={setRoadmap}
                          roadmaps={sortedRoadmaps}
                        />
                      </div>
                      <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                        {roadmap?.description}
                      </p>
                    </div>
                    {!!roadmapStatuses.length && (
                      <RoadmapBoard roadmap={roadmap} roadmapStatuses={roadmapStatuses} />
                    )}
                  </>
                )}
                <div className="m-auto flex flex-col justify-center">
                  {((!roadmap?.publicStatuses?.length && isGuest) ||
                    !company?.roadmaps?.length) && (
                    <EmptyState
                      title="No items to view"
                      description={
                        roadmap?.publicStatuses?.length
                          ? 'There is no public status for this roadmap.'
                          : 'There is no public roadmap for this company.'
                      }
                    />
                  )}
                  {!company?.roadmaps?.length && !isGuest && (
                    <Button
                      variant="text"
                      text="Add Roadmap"
                      icon={<Plus className="w-4 h-4 icon" />}
                      onClick={() => setOpenCreateRoadmapModal(true)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
          {!isGuest && <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />}
          <AddANewRoadMap
            show={openCreateRoadmapModal}
            cancelOnClick={() => setOpenCreateRoadmapModal(false)}
          />
        </div>
      </Layout>
    </>
  );
}
