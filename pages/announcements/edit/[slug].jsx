import AnnouncementForm from '@/components/AnnouncementForm';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash';

export default function EditAnnouncements({ slug }) {
  const announcement = useSelector((state) => state.announcement.announcement);
  const loading = useSelector((state) => state.announcement.updateAnnouncementLoading);
  const dispatch = useDispatch();

  const handleUpdateAnnouncement = (req) => {
    dispatch(
      announcementActions.updateAnnouncement({
        ...req
      })
    );
  };
  useEffect(() => {
    if (_.isEmpty(announcement)) {
      dispatch(announcementActions.getAnnouncement(slug));
    }
  }, [announcement]);

  return (
    <Layout>
      <AnnouncementForm onSave={handleUpdateAnnouncement} announcement={announcement}>
        <div className="flex items-center self-start mt-4">
          {loading ? (
            <span className="ml-2 animate-pulse">Saving...</span>
          ) : (
            <span>{DateTime.fromISO(announcement?.updatedAt).setLocale('en').toRelative()}</span>
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
