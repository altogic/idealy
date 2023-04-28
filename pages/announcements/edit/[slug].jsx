import AnnouncementForm from '@/components/Announcement/AnnouncementForm';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClickAnnouncementIdea from '@/hooks/useClickAnnouncementIdea';
import useOpenFeedbackModal from '@/hooks/useOpenFeedbackModal';

export default function EditAnnouncements({ slug }) {
  const router = useRouter();
  const announcement = useSelector((state) => state.announcement.announcement);
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.announcement.updateAnnouncementLoading);
  const dispatch = useDispatch();
  const [webworker, setWebworker] = useState();

  const handleUpdateAnnouncement = useCallback(
    (req) => {
      if (webworker) {
        webworker.postMessage({
          announcement: req,
          session
        });
        webworker.onmessage = (e) => {
          const { data } = e.data;
          if (router.query.slug !== data.slug) {
            router.push(`/announcements/edit/${data.slug}`);
          }
        };
      }
    },
    [webworker]
  );

  useClickAnnouncementIdea(announcement);
  useOpenFeedbackModal();

  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(slug));
    }
  }, [announcement]);

  useEffect(() => {
    setWebworker(new Worker(new URL('@/utils/worker', import.meta.url)));
  }, []);

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
