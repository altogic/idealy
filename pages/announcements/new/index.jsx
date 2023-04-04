import Layout from '@/components/Layout';

import AnnouncementForm from '@/components/AnnouncementForm';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function NewAnnouncement() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSaveAnnouncements = (req) => {
    dispatch(
      announcementActions.createAnnouncement({
        ...req,
        onSuccess: (data) => {
          router.push(`/announcements/edit/${data.slug}`);
        }
      })
    );
  };

  return (
    <Layout>
      <AnnouncementForm onSave={handleSaveAnnouncements} />
    </Layout>
  );
}
