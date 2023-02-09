import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getNotifications: (companyId) =>
    db
      .model('notifications')
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
  getUnreadCompanyNotifications: (userId) =>
    db.model('notifications').filter(`user == '${userId}' && isRead == false`).get(),
  markNotificationAsRead: (userId) =>
    db
      .model('notifications')
      .filter(`userId == '${userId}'`)
      .updateFields([{ field: 'isRead', updateType: 'set', value: true }]),
  sendNotification: (req) => endpoint.post('/notification', req)
};
export default notificationService;
