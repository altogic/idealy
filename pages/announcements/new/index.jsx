import AnnouncementForm from '@/components/AnnouncementForm';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function NewAnnouncement() {
  const dispatch = useDispatch();
  const router = useRouter();
  const announcements = useSelector((state) => state.announcement.announcements);
  const onSuccess = (data) => {
    router.push(`/announcements/edit/${data.slug}&focus=false`);
  };
  const handleSaveAnnouncements = (req) => {
    if (announcements.some((announcement) => announcement.slug === req.slug)) return;
    dispatch(
      announcementActions.createAnnouncement({
        ...req,
        onSuccess: (data) => onSuccess(data)
      })
    );
  };

  return (
    <Layout>
      <AnnouncementForm onSave={handleSaveAnnouncements} />
    </Layout>
  );
}
