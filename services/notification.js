import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getNotifications: (companyId) =>
    db
      .model('companyNotifications')
      .filter(`companyId == '${companyId}'`)
      .lookup({ field: 'user' })
      .omit(
        'user.savedFilters',
        'user.notifications',
        'user.canCreateCompany',
        'user.disableAllNotifications',
        'user.emailVerified',
        'user.isDeleted',
        'user.isInvited',
        'user.lastLoginAt',
        'user.provider',
        'user.providerUserId',
        'user.signUpAt'
      )
      .get(),
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
