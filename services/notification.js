import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getNotifications: (userId) => db.model('notifications').filter(`userId == '${userId}'`).get(),
  getUnreadNotifications: (userId) =>
    db.model('notifications').filter(`userId == '${userId}' && isRead == false`).get(),
  markNotificationAsRead: (userId) =>
    db
      .model('notifications')
      .filter(`userId == '${userId}'`)
      .updateFields([{ field: 'isRead', updateType: 'set', value: true }]),
  sendNotification: (req) => endpoint.post('/notification/company', req)
};
export default notificationService;
