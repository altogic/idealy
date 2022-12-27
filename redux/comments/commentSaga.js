import { takeEvery, put, call } from 'redux-saga/effects';
import CommentsService from '@/services/comments';
import { commentActions } from './commentsSlice';

function* addCommentSaga(action) {
  try {
    const { data: comment, errors } = yield call(CommentsService.addComment, action.payload);
    if (errors) {
      throw new Error(errors);
    }
    yield put(commentActions.addCommentSuccess(comment));
  } catch (error) {
    yield put(commentActions.addCommentFailure(error));
  }
}

export default function* commentSaga() {
  yield takeEvery(commentActions.addComment.type, addCommentSaga);
}
