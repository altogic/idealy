import { all, takeEvery, put, call } from 'redux-saga/effects';
import topicService from '@/services/topics';
import { topicActions } from './topicSlice';

function* getTopicsSaga() {
  try {
    const { data, error } = yield call(topicService.getTopics);
    if (error) {
      throw new Error(error);
    } else {
      yield put(topicActions.getTopicsSuccess(data));
    }
  } catch (error) {
    yield put(topicActions.getTopicsFailure(error));
  }
}
function* getStatusesSaga() {
  try {
    const { data, error } = yield call(topicService.getStatuses);
    if (error) {
      throw new Error(error);
    } else {
      yield put(topicActions.getStatusesSuccess(data));
    }
  } catch (error) {
    yield put(topicActions.getStatusesFailure(error));
  }
}
export default function* topicSaga() {
  yield all([
    takeEvery(topicActions.getTopics.type, getTopicsSaga),
    takeEvery(topicActions.getStatuses.type, getStatusesSaga)
  ]);
}
