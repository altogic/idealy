import AnnouncementForm from '@/components/Announcement/AnnouncementForm';
import Layout from '@/components/Layout';
import useClickAnnouncementIdea from '@/hooks/useClickAnnouncementIdea';
import useOpenFeedbackModal from '@/hooks/useOpenFeedbackModal';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditAnnouncements({ id }) {
  const announcement = useSelector((state) => state.announcement.announcement);
  const loading = useSelector((state) => state.announcement.updateAnnouncementLoading);
  const dispatch = useDispatch();
  useClickAnnouncementIdea(announcement);
  useOpenFeedbackModal();

  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(id));
    }
  }, [announcement]);

  const handleUpdateAnnouncement = (req) => {
    dispatch(announcementActions.updateAnnouncement(req));
  };
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
      id: params.id
    }
  };
}
