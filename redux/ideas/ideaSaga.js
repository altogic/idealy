import ideaService from '@/services/idea';
import { realtime } from '@/utils/altogic';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { ideaActions } from './ideaSlice';

function* getIdeasByCompanySaga({ payload: { subdomain, limit, page, sort, filter, type } }) {
  try {
    const { data: ideas, errors } = yield call(ideaService.getIdeasByCompany, {
      subdomain,
      limit,
      page,
      sort,
      pinnedFilter: `${
        filter || ''
      } this.companySubdomain == '${subdomain}' && this.isPinned == true`,
      filter: `${filter || ''} this.companySubdomain == '${subdomain}' && this.isPinned == false`
    });
    let voteFilter = '';
    ideas.result.forEach((idea, index) => {
      const { _id } = idea;
      if (index === ideas.result.length - 1) {
        voteFilter += `this.ideaId == '${_id}'`;
      } else {
        voteFilter += `this.ideaId == '${_id}' || `;
      }
    });
    const { data: votes } = yield call(ideaService.getIdeaVotes, voteFilter);
    if (errors) {
      throw new Error(errors);
    }

    yield put(
      ideaActions.getIdeasByCompanySuccess({
        ideas,
        votes,
        type,
        page
      })
    );
  } catch (error) {
    yield put(ideaActions.getIdeasByCompanyFailure(error));
  }
}

function* createIdeaSaga({ payload: req }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(ideaService.createIdea, req);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.createIdeaSuccess(data));
    realtime.send(company._id, 'create-idea', data);
  } catch (error) {
    yield put(ideaActions.createIdeaFailure(error));
  }
}
function* voteIdeaSaga({ payload: ideaId }) {
  try {
    const { data, errors } = yield call(ideaService.voteIdea, { ideaId });
    if (errors) {
      throw new Error(errors);
    }
    const company = yield select((state) => state.company.company);
    yield put(ideaActions.voteIdeaSuccess(data));
    realtime.send(company._id, 'vote-idea', data);
  } catch (error) {
    yield put(ideaActions.voteIdeaFailure(error));
  }
}
function* downvoteIdeaSaga({ payload: id }) {
  try {
    const { errors } = yield call(ideaService.downvoteIdea, id);
    if (errors) {
      throw new Error(errors);
    }

    yield put(ideaActions.downvoteIdeaSuccess(id));
    const company = yield select((state) => state.company.company);
    realtime.send(company._id, 'downvote-idea', id);
  } catch (error) {
    yield put(ideaActions.downvoteIdeaFailure(error));
  }
}
function* updateIdeaSaga({ payload: idea }) {
  try {
    const { data, errors } = yield call(ideaService.updateIdea, idea);

    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.updateIdeaSuccess(data));
    const company = yield select((state) => state.company.company);
    realtime.send(company._id, 'update-idea', data);
  } catch (error) {
    yield put(ideaActions.updateIdeaFailure(error));
  }
}
function* deleteIdeaSaga({ payload: id }) {
  try {
    const { errors } = yield call(ideaService.deleteIdea, id);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.deleteIdeaSuccess(id));
    const company = yield select((state) => state.company.company);
    realtime.send(company._id, 'delete-idea', id);
  } catch (error) {
    yield put(ideaActions.deleteIdeaFailure(error));
  }
}
function* searchSimilarIdeasSaga({ payload: title }) {
  try {
    const { data, errors } = yield call(ideaService.searchSimilarIdeas, title);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.searchSimilarIdeasSuccess(data));
  } catch (error) {
    yield put(ideaActions.searchSimilarIdeasFailure(error));
  }
}
function* clearSimilarIdeas() {
  yield put(ideaActions.clearSimilarIdeasSuccess());
}
function* createIdeaRealtimeSaga({ payload: idea }) {
  yield put(ideaActions.createIdeaSuccess(idea));
}
function* voteIdeaRealtimeSaga({ payload: vote }) {
  yield put(ideaActions.voteIdeaSuccess(vote));
}
function* downvoteIdeaRealtimeSaga({ payload: id }) {
  yield put(ideaActions.downvoteIdeaSuccess(id));
}
function* updateIdeaRealtimeSaga({ payload: idea }) {
  yield put(ideaActions.updateIdeaSuccess(idea));
}
function* deleteIdeaRealtimeSaga({ payload: id }) {
  yield put(ideaActions.deleteIdeaSuccess(id));
}

export default function* ideaSaga() {
  yield takeEvery(ideaActions.getIdeasByCompany.type, getIdeasByCompanySaga);
  yield takeEvery(ideaActions.createIdea.type, createIdeaSaga);
  yield takeEvery(ideaActions.voteIdea.type, voteIdeaSaga);
  yield takeEvery(ideaActions.downvoteIdea.type, downvoteIdeaSaga);
  yield takeEvery(ideaActions.updateIdea.type, updateIdeaSaga);
  yield takeEvery(ideaActions.deleteIdea.type, deleteIdeaSaga);
  yield takeEvery(ideaActions.searchSimilarIdeas.type, searchSimilarIdeasSaga);
  yield takeEvery(ideaActions.clearSimilarIdeas.type, clearSimilarIdeas);
  yield takeEvery(ideaActions.createIdeaRealtime, createIdeaRealtimeSaga);
  yield takeEvery(ideaActions.voteIdeaRealtime, voteIdeaRealtimeSaga);
  yield takeEvery(ideaActions.downvoteIdeaRealtime, downvoteIdeaRealtimeSaga);
  yield takeEvery(ideaActions.updateIdeaRealtime, updateIdeaRealtimeSaga);
  yield takeEvery(ideaActions.deleteIdeaRealtime, deleteIdeaRealtimeSaga);
}
