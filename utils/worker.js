import { auth, db } from './altogic';

async function updateStory(announcement, session) {
  auth.setSession(session);
  const data = db.model('announcements').object(announcement._id).update(announcement);
  return data;
}

onmessage = async (e) => {
  const { data, errors } = await updateStory(e.data.announcement, e.data.session);
  postMessage({ data, errors });
};
