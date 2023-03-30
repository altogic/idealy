import { db, endpoint } from '@/utils/altogic';

const AnnouncementService = {
  getAnnouncements({ page = 1, limit = 10, sort = 'createdAt:desc', filter } = {}) {
    return endpoint.get('/announcement', { page, limit, filter, sort });
  },
  getAnnouncement(slug) {
    return endpoint.get('/announcement/slug', { slug });
  },
  createAnnouncement(announcement) {
    return db.model('announcements').create(announcement);
  },
  updateAnnouncement(announcement) {
    return db.model('announcements').object(announcement._id).update(announcement);
  },
  deleteAnnouncement(id) {
    return db.model('announcements').object(id).delete();
  },
  createAnnouncementReaction(reaction) {
    return endpoint.post('/announcement/reaction', reaction);
  },
  deleteAnnouncementReaction(id) {
    return endpoint.delete(`/announcement/reaction/${id}`);
  },
  getAnnouncementReactions(filter) {
    return endpoint.get('/announcement/reaction', filter);
  }
};

export default AnnouncementService;
