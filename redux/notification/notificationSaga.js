import notificationService from '@/services/notification';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { notificationActions } from './notificationSlice';

function* getNotifications(action) {
  try {
    const { data, errors } = yield call(notificationService.getNotifications, action.payload);

    if (errors) {
      throw errors;
    }
    yield put(notificationActions.getNotificationsSuccess(data));
  } catch (error) {
    yield put(notificationActions.getNotificationsFailure(error));
  }
}

function* markNotificationAsRead(action) {
  try {
    const { data, errors } = yield call(notificationService.markNotificationAsRead, action.payload);
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
function* receiveNotificationRealtime(action) {
  yield put(notificationActions.receiveNotificationRealtimeSuccess(action.payload));
}

export default function* notificationSaga() {
  yield all([
    takeEvery(notificationActions.getNotifications.type, getNotifications),
    takeEvery(notificationActions.markNotificationAsRead.type, markNotificationAsRead),
    takeEvery(notificationActions.sendNotification.type, sendNotification),
    takeEvery(notificationActions.receiveNotificationRealtime, receiveNotificationRealtime)
  ]);
}
