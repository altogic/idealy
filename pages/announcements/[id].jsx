import AnnouncementCard from '@/components/Announcement/AnnouncementCard';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import useOpenFeedbackModal from '@/hooks/useOpenFeedbackModal';
import useClickAnnouncementIdea from '@/hooks/useClickAnnouncementIdea';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import AnnouncementSkeleton from '@/components/Announcement/AnnouncementSkeleton';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AnnouncementDetail({ id }) {
  const dispatch = useDispatch();
  const { announcement, getAnnouncementLoading: isLoading } = useSelector(
    (state) => state.announcement
  );
  const { company } = useSelector((state) => state.company);
  const { selectedIdea } = useSelector((state) => state.idea);
  const router = useRouter();
  useClickAnnouncementIdea(announcement);
  useOpenFeedbackModal();
  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(id));
    }
  }, [announcement]);

  return (
    <>
      <Head>
        <title>{announcement?.title}</title>
        <meta name="description" content={announcement?.content} />
      </Head>
      <Layout>
        <div className="container w-full h-full m-auto pt-14 px-4">
          {isLoading ? (
            <AnnouncementSkeleton />
          ) : (
            <AnnouncementCard announcement={announcement} onPage />
          )}
        </div>
        <IdeaDetail
          idea={selectedIdea}
          company={company}
          onClose={() => {
            dispatch(ideaActions.setSelectedIdea(null));
            dispatch(toggleFeedBackDetailModal());
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, feedback: undefined }
              },
              undefined,
              { scroll: false }
            );
          }}
        />
      </Layout>
    </>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id
    }
  };
}
