import { db, endpoint } from '@/utils/altogic';

const notificationService = {
  getNotifications: ({ userId, companyId, isMember, limit, filter = '', page = 1 }) =>
    db
      .model('notifications')
      .filter(
        `(targetUser == '${userId}' && companyId =='${companyId}') ${
          isMember ? `|| (companyId == '${companyId}' && !EXISTS(targetUser))` : ''
        }  ${filter}`
      )
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
