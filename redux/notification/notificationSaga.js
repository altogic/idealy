import notificationService from '@/services/notification';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { notificationActions } from './notificationSlice';

function* getUserNotifications({ payload: { userId, companyId } }) {
  try {
    const { data, errors } = yield call(notificationService.getUserNotifications, {
      userId,
      companyId,
      filter: '&& isRead == false',
      limit: 5
    });

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getUserNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getUserNotificationsFailure(error));
  }
}
function* getAllUserNotifications({ payload: { userId, limit, companyId, page } }) {
  try {
    const { data, errors } = yield call(notificationService.getUserNotifications, {
      userId,
      limit,
      companyId,
      page
    });

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getAllUserNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getAllUserNotificationsFailure(error));
  }
}
function* getCompanyNotifications({ payload: companyId }) {
  try {
    const { data, errors } = yield call(notificationService.getCompanyNotifications, {
      companyId,
      filter: '&& isRead == false',
      limit: 5
    });

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getCompanyNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getCompanyNotificationsFailure(error));
  }
}
function* getAllCompanyNotifications({ payload: { companyId, limit, page } }) {
  try {
    const { data, errors } = yield call(notificationService.getCompanyNotifications, {
      companyId,
      limit,
      page
    });

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getAllCompanyNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getAllCompanyNotificationsFailure(error));
  }
}

function* markNotificationAsRead({ payload: { userId, companyId } }) {
  try {
    const { data, errors } = yield call(notificationService.markNotificationAsRead, {
      userId,
      companyId
    });
    if (errors) {
      throw errors;
    }
    yield put(notificationActions.markNotificationAsReadSuccess(data));
  } catch (error) {
    yield put(notificationActions.markNotificationAsReadFailure(error));
  }
}

function* sendNotification({ payload }) {
  try {
    const { data, errors } = yield call(notificationService.sendNotification, payload);
    if (errors) {
      throw errors;
    }
    yield put(notificationActions.sendNotificationSuccess(data));
  } catch (error) {
    yield put(notificationActions.sendNotificationFailure(error));
  }
}
export default function* notificationSaga() {
  yield all([
    takeEvery(notificationActions.markNotificationAsRead.type, markNotificationAsRead),
    takeEvery(notificationActions.sendNotification.type, sendNotification),
    takeEvery(notificationActions.getUserNotifications.type, getUserNotifications),
    takeEvery(notificationActions.getAllUserNotifications.type, getAllUserNotifications),
    takeEvery(notificationActions.getCompanyNotifications.type, getCompanyNotifications),
    takeEvery(notificationActions.getAllCompanyNotifications.type, getAllCompanyNotifications)
  ]);
}
