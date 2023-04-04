import AnnouncementCard from '@/components/AnnouncementCard';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

export default function AnnouncementDetail({ slug }) {
  const dispatch = useDispatch();
  const announcement = useSelector((state) => state.announcement.announcement);

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
