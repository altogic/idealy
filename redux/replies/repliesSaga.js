import { call, put, takeEvery } from 'redux-saga/effects';
import replyService from '@/services/replies';
import { repliesActions } from './repliesSlice';

function* getReplies({ payload: { commentId, page } }) {
  try {
    const { data: replies, errors } = yield call(replyService.getReplies, commentId, page);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.getRepliesSuccess({ ...replies, commentId }));
  } catch (error) {
    yield put(repliesActions.getRepliesFailure(error));
  }
}

function* createReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(replyService.createReply, reply);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.createReplySuccess(data));
  } catch (error) {
    yield put(repliesActions.createReplyFailure(error));
  }
}

function* updateReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(replyService.updateReply, reply._id, reply);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.updateReplySuccess(data));
  } catch (error) {
    yield put(repliesActions.updateReplyFailure(error));
  }
}

function* deleteReply({ payload: replyId }) {
  try {
    const { errors } = yield call(replyService.deleteReply, replyId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.deleteReplySuccess(replyId));
  } catch (error) {
    yield put(repliesActions.deleteReplyFailure(error));
  }
}

export default function* repliesSaga() {
  yield takeEvery(repliesActions.getReplies, getReplies);
  yield takeEvery(repliesActions.createReply, createReply);
  yield takeEvery(repliesActions.updateReply, updateReply);
  yield takeEvery(repliesActions.deleteReply, deleteReply);
}
