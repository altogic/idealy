import { all, fork } from 'redux-saga/effects';

import authSaga from './auth/authSaga';
import topicSaga from './topics/topicSaga';
import companySaga from './company/companySaga';
import fileSaga from './file/fileSaga';

function* rootSaga() {
  yield all([fork(authSaga), fork(topicSaga), fork(companySaga), fork(fileSaga)]);
}

export default rootSaga;
