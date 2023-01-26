import CommentsService from '@/services/comments';
import { realtime } from '@/utils/altogic';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ideaActions } from '../ideas/ideaSlice';
import { commentActions } from './commentsSlice';

function* addCommentSaga({ payload }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(CommentsService.addComment, payload);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.addCommentSuccess(data));
    realtime.send(company._id, 'add-comment', data);
  } catch (error) {
    yield put(commentActions.addCommentFailure(error));
  }
}
function* getCommentsSaga({ payload: { ideaId, page } }) {
  try {
    const { data: comments, errors } = yield call(CommentsService.getComments, ideaId, page);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.getCommentsSuccess(comments));
  } catch (error) {
    yield put(commentActions.getCommentsFailure(error));
  }
}
function* deleteCommentSaga({ payload: { commentId, ideaId } }) {
  try {
    const company = yield select((state) => state.company.company);
    const { errors } = yield call(CommentsService.deleteComment, commentId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.deleteCommentSuccess(commentId));
    yield put(ideaActions.deleteComment(ideaId));
    realtime.send(company._id, 'delete-comment', commentId);
  } catch (error) {
    yield put(commentActions.deleteCommentFailure(error));
  }
}
function* updateCommentSaga({ payload }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(CommentsService.updateComment, payload);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.updateCommentSuccess(data));
    realtime.send(company._id, 'update-comment', data);
  } catch (error) {
    yield put(commentActions.updateCommentFailure(error));
  }
}
export default function* commentSaga() {
  yield takeEvery(commentActions.addComment.type, addCommentSaga);
  yield takeEvery(commentActions.getComments.type, getCommentsSaga);
  yield takeEvery(commentActions.deleteComment.type, deleteCommentSaga);
  yield takeEvery(commentActions.updateComment.type, updateCommentSaga);
}
