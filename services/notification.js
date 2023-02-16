import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getUserNotifications: ({ userId, companyId, limit, filter = '', page = 1 }) =>
    db
      .model('notifications')
      .filter(`targetUser == '${userId}' && companyId =='${companyId}' ${filter}`)
      .lookup({ field: 'user' })
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
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
      .get({
        returnCountInfo: true
      }),
  getCompanyNotifications: ({ companyId, filter = '', limit, page = 1 }) =>
    db
      .model('notifications')
      .filter(`companyId == '${companyId}' && !EXISTS(targetUser) ${filter}`)
      .lookup({ field: 'user' })
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
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
      .get({
        returnCountInfo: true
      }),
  markNotificationAsRead: ({ userId, companyId }) =>
    db
      .model('notifications')
      .filter(`(targetUser == '${userId}' || companyId == '${companyId}') && isRead == false`)
      .updateFields([{ field: 'isRead', updateType: 'set', value: true }]),
  sendNotification: (req) => endpoint.post('/notification', req)
};
export default notificationService;
