import { call, put, takeEvery, select } from 'redux-saga/effects';
import replyService from '@/services/replies';
import { realtime } from '@/utils/altogic';
import { repliesActions } from './repliesSlice';
import { commentActions } from '../comments/commentsSlice';

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
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(replyService.createReply, reply);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.createReplySuccess(data));
    yield put(commentActions.addedReply(data.commentId));
    realtime.send(company._id, 'add-reply', data);
  } catch (error) {
    yield put(repliesActions.createReplyFailure(error));
  }
}

function* updateReply({ payload: reply }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(replyService.updateReply, reply._id, reply);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.updateReplySuccess(data));
    realtime.send(company._id, 'update-reply', data);
  } catch (error) {
    yield put(repliesActions.updateReplyFailure(error));
  }
}

function* deleteReply({ payload: { replyId, commentId } }) {
  try {
    const company = yield select((state) => state.company.company);
    const { errors } = yield call(replyService.deleteReply, replyId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(repliesActions.deleteReplySuccess({ replyId, commentId }));
    yield put(commentActions.deleteReply(commentId));
    realtime.send(company._id, 'delete-reply', { replyId, commentId });
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
