import notificationService from '@/services/notification';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { notificationActions } from './notificationSlice';

function* getNotifications({ payload: { userId, limit, companyId, isMember, page } }) {
  try {
    const { data, errors } = yield call(notificationService.getNotifications, {
      userId,
      limit,
      companyId,
      page,
      isMember,
      filter: ''
    });

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getNotificationsFailure(error));
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
    takeEvery(notificationActions.getNotifications.type, getNotifications)
  ]);
}
