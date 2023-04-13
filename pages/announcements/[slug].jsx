import AnnouncementCard from '@/components/AnnouncementCard';
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
import { useRouter } from 'next/router';

export default function AnnouncementDetail({ slug }) {
  const dispatch = useDispatch();
  const announcement = useSelector((state) => state.announcement.announcement);
  const { company } = useSelector((state) => state.company);
  const { selectedIdea } = useSelector((state) => state.idea);
  const router = useRouter();
  useClickAnnouncementIdea(announcement);
  useOpenFeedbackModal();
  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(slug));
    }
  }, [announcement]);

  return (
    <Layout>
      <div className="container w-full h-full m-auto pt-14 px-4">
        <AnnouncementCard announcement={announcement} onPage />
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
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  };
}
