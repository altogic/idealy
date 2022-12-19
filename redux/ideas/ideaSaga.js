import ideaService from '@/services/idea';
import { call, takeEvery, put } from 'redux-saga/effects';
import { ideaActions } from './ideaSlice';

function* getIdeasByCompanySaga({ payload: { subdomain, limit, page } }) {
  try {
    const { data: ideas, errors } = yield call(ideaService.getIdeasByCompany, {
      subdomain,
      limit,
      page
    });
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.getIdeasByCompanySuccess(ideas));
  } catch (error) {
    yield put(ideaActions.getIdeasByCompanyFailure(error));
  }
}

function* createIdeaSaga({ payload: req }) {
  try {
    const { data, errors } = yield call(ideaService.createIdea, req);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.createIdeaSuccess(data));
  } catch (error) {
    yield put(ideaActions.createIdeaFailure(error));
  }
}

export default function* ideaSaga() {
  yield takeEvery(ideaActions.getIdeasByCompany.type, getIdeasByCompanySaga);
  yield takeEvery(ideaActions.createIdea.type, createIdeaSaga);
}
