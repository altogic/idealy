import { auth, db } from '@/utils/altogic';

async function updateAnnouncement(announcement, session) {
  auth.setSession(session);
  const data = db.model('announcements').object(announcement._id).update(announcement);
  return data;
}

onmessage = async (e) => {
  const { data, errors } = await updateAnnouncement(e.data.announcement, e.data.session);
  postMessage({ data, errors });
};
