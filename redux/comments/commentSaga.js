import CommentsService from '@/services/comments';
import { call, put, takeEvery } from 'redux-saga/effects';
import { commentActions } from './commentsSlice';

function* addCommentSaga({ payload }) {
  try {
    const { data, errors } = yield call(CommentsService.addComment, payload);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.addCommentSuccess(data));
  } catch (error) {
    yield put(commentActions.addCommentFailure(error));
  }
}
function* getCommentsSaga({ payload: ideaId }) {
  try {
    const { data: comments, errors } = yield call(CommentsService.getComments, ideaId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.getCommentsSuccess(comments));
  } catch (error) {
    yield put(commentActions.getCommentsFailure(error));
  }
}

export default function* commentSaga() {
  yield takeEvery(commentActions.addComment.type, addCommentSaga);
  yield takeEvery(commentActions.getComments.type, getCommentsSaga);
}
