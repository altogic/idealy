import ideaService from '@/services/idea';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ideaActions } from './ideaSlice';

function* getIdeasByCompanySaga({ payload: { subdomain, limit, page } }) {
  try {
    const { data: ideas, errors } = yield call(ideaService.getIdeasByCompany, {
      subdomain,
      limit,
      page
    });
    let filter = '';
    ideas.result.forEach((idea, index) => {
      const { _id } = idea;
      if (index === ideas.result.length - 1) {
        filter += `this.ideaId == '${_id}'`;
      } else {
        filter += `this.ideaId == '${_id}' || `;
      }
    });
    const { data: votes } = yield call(ideaService.getIdeaVotes, filter);
    if (errors) {
      throw new Error(errors);
    }

    yield put(
      ideaActions.getIdeasByCompanySuccess({
        ideas,
        votes
      })
    );
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
function* voteIdeaSaga({ payload: ideaId }) {
  try {
    const { data, errors } = yield call(ideaService.voteIdea, { ideaId });
    if (errors) {
      throw new Error(errors);
    }

    yield put(ideaActions.voteIdeaSuccess(data));
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

export default function* ideaSaga() {
  yield takeEvery(ideaActions.getIdeasByCompany.type, getIdeasByCompanySaga);
  yield takeEvery(ideaActions.createIdea.type, createIdeaSaga);
  yield takeEvery(ideaActions.voteIdea.type, voteIdeaSaga);
  yield takeEvery(ideaActions.downvoteIdea.type, downvoteIdeaSaga);
  yield takeEvery(ideaActions.updateIdea.type, updateIdeaSaga);
  yield takeEvery(ideaActions.deleteIdea.type, deleteIdeaSaga);
  yield takeEvery(ideaActions.searchSimilarIdeas.type, searchSimilarIdeasSaga);
  yield takeEvery(ideaActions.clearSimilarIdeas.type, clearSimilarIdeas);
}
