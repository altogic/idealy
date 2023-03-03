import { auth, db, endpoint } from '@/utils/altogic';

const AuthService = {
  register: (user) => auth.signUpWithEmail(user.email, user.password, user),
  login: (email, password) => auth.signInWithEmail(email, password),
  getAuthGrant: (token) => auth.getAuthGrant(token),
  logout: () => auth.signOut(),
  authStateChange(newUser, newSession) {
    auth.setSession(newSession);
    auth.setUser(newUser);
  },
  setUser(user) {
    auth.setUser(user);
  },
  getUserFromDb() {
    return auth.getUserFromDB();
  },
  getUserFromDbByEmail(email) {
    return db.model('users').filter(`email == '${email}'`).get();
  },
  getUser() {
    return auth.getUser();
  },
  resetPassword({ accessToken, newPassword }) {
    return auth.resetPwdWithToken(accessToken, newPassword);
  },
  sendPasswordResetEmail(email) {
    return auth.sendResetPwdEmail(email);
  },
  resendVerificationEmail(email) {
    return auth.resendVerificationEmail(email);
  },
  changePassword({ currentPassword, newPassword }) {
    return auth.changePassword(newPassword, currentPassword);
  },
  changeEmail({ email, password }) {
    return auth.changeEmail(password, email);
  },
  getUserFromDBbyCookie(req, res) {
    return auth.getUserFromDBbyCookie(req, res);
  },
  setUserInformation(req) {
    return endpoint.post('/user/information', req);
  },
  authenticateWithProvider(provider) {
    return auth.signInWithProvider(provider);
  },
  setSessionCookie(token, req, res) {
    auth.setSessionCookie(token, req, res);
  },
  removeFilters({ filter }) {
    return db.model('users.savedFilters').object(filter).delete();
  },
  setSession(session) {
    auth.setSession(session);
  },
  updateNotificationSettings({ id, value, fieldName }) {
    return db
      .model('users.notifications')
      .object(id)
      .updateFields([{ field: fieldName, updateType: 'set', value }]);
  },
  disableAllNotifications(id, req) {
    return db.model('users.notifications').object(id).update(req);
  },

  updateSavedFilterName({ id, value, fieldName }) {
    return db
      .model('users.savedFilters')
      .object(id)
      .updateFields([{ field: fieldName, updateType: 'set', value }]);
  },

  updateSavedFilters(req) {
    return db.model('users.savedFilters').object(req._id).update(req);
  },

  updateUserCanCreateCompany(userId, value) {
    return db
      .model('users')
      .object(userId)
      .updateFields([{ field: 'canCreateCompany', updateType: 'set', value }]);
  },
  deleteProfileAvatar(userId) {
    return db
      .model('users')
      .object(userId)
      .updateFields([{ field: 'profilePicture', updateType: 'unset', value: null }]);
  },
  deleteProfile() {
    return endpoint.delete('/user');
  },
  updateUserProfile(user) {
    return db.model('users').object(user._id).update(user);
  },
  saveFilter: (filter) => db.model('users.savedFilters').append(filter, filter._parent)
};

export default AuthService;
