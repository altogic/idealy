import Layout from '@/components/Layout';

import AnnouncementForm from '@/components/AnnouncementForm';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export default function NewAnnouncement() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSuccess = _.debounce((data) => {
    router.push(`/announcements/edit/${data.slug}`);
  }, 500);

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
