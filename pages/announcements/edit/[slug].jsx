import AnnouncementForm from '@/components/Announcement/AnnouncementForm';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClickAnnouncementIdea from '@/hooks/useClickAnnouncementIdea';
import useOpenFeedbackModal from '@/hooks/useOpenFeedbackModal';

export default function EditAnnouncements({ slug }) {
  const router = useRouter();
  const announcement = useSelector((state) => state.announcement.announcement);
  const loading = useSelector((state) => state.announcement.updateAnnouncementLoading);
  const dispatch = useDispatch();

  const handleUpdateAnnouncement = (req) => {
    dispatch(
      announcementActions.updateAnnouncement({
        ...req,
        onSuccess: (data) => {
          if (router.query.slug !== data.slug) {
            router.push(`/announcements/edit/${data.slug}`);
          }
        }
      })
    );
  };
  useClickAnnouncementIdea(announcement);
  useOpenFeedbackModal();
  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(slug));
    }
  }, [announcement]);

  return (
    <Layout>
      <AnnouncementForm onSave={handleUpdateAnnouncement} announcement={announcement}>
        <div className="flex items-center self-start">
          {loading && (
            <span className="ml-2 animate-pulse text-slate-500 dark:text-aa-200 purple:text-pt-200">
              Saving...
            </span>
          )}
        </div>
      </AnnouncementForm>
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
