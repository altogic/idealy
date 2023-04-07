import AnnouncementForm from '@/components/AnnouncementForm';
import Layout from '@/components/Layout';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function NewAnnouncement() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSuccess = (data) => {
    setTimeout(() => {
      router.push(`/announcements/edit/${data.slug}`);
    }, 500);
  };
  const handleSaveAnnouncements = (req) => {
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
