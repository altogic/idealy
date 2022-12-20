import { all, fork } from 'redux-saga/effects';

import authSaga from './auth/authSaga';
import topicSaga from './topics/topicSaga';
import companySaga from './company/companySaga';
import fileSaga from './file/fileSaga';
import notificationSaga from './notification/notificationSaga';
import ideaSaga from './ideas/ideaSaga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(topicSaga),
    fork(companySaga),
    fork(fileSaga),
    fork(notificationSaga),
    fork(ideaSaga)
  ]);
}

export default rootSaga;
