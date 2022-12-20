import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getNotifications: (userId) =>
    db.model('companyNotifications').filter(`user == '${userId}'`).get(),
  getUnreadcompanyNotifications: (userId) =>
    db.model('companyNotifications').filter(`user == '${userId}' && isRead == false`).get(),
  markNotificationAsRead: (userId) =>
    db
      .model('companyNotifications')
      .filter(`userId == '${userId}'`)
      .updateFields([{ field: 'isRead', updateType: 'set', value: true }]),
  sendNotification: (req) => endpoint.post('/notification/company', req)
};
export default notificationService;
