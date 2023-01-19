import ideaService from '@/services/idea';
import { realtime } from '@/utils/altogic';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { ideaActions } from './ideaSlice';

function* getIdeasByCompanySaga({ payload: { companyId, limit, page, sort, filter } }) {
  try {
    const { data: ideas, errors } = yield call(ideaService.getIdeasByCompany, {
      companyId,
      limit,
      page,
      sort,
      filter: `${filter || ''} this.company == '${companyId}'`
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
function* voteIdeaSaga({ payload }) {
  try {
    const { data, errors } = yield call(ideaService.voteIdea, payload);
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
function* downVoteIdeaSaga({ payload }) {
  try {
    const { errors } = yield call(ideaService.downVoteIdea, payload);
    if (errors) {
      throw new Error(errors);
    }

    yield put(ideaActions.downVoteIdeaSuccess(payload.ideaId));
    const company = yield select((state) => state.company.company);
    realtime.send(company._id, 'downVote-idea', {
      ideaId: payload.ideaId,
      userId: payload?.userId,
      ...(!payload.userId && { userIp: payload.ip })
    });
  } catch (error) {
    yield put(ideaActions.downVoteIdeaFailure(error));
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
function* searchSimilarIdeasSaga({ payload: { title, companyId } }) {
  try {
    const { data, errors } = yield call(ideaService.searchSimilarIdeas, title, companyId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.searchSimilarIdeasSuccess(data));
  } catch (error) {
    yield put(ideaActions.searchSimilarIdeasFailure(error));
  }
}
function* deleteIdeaCoverImage({ payload: id }) {
  try {
    const { errors } = yield call(ideaService.deleteIdeaCoverImage, id);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.deleteIdeaCoverImageSuccess(id));
  } catch (error) {
    yield put(ideaActions.deleteIdeaCoverImageFailure(error));
  }
}
function* getUserVotesSaga({ payload: { ip, companyId, userId } }) {
  try {
    const { data, errors } = yield call(ideaService.getUserVotes, { ip, companyId, userId });
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.getUserVotesSuccess(data));
  } catch (error) {
    yield put(ideaActions.getUserVotesFailure(error));
  }
}
function* deleteIdeaStatusSaga({ payload: id }) {
  try {
    const { errors } = yield call(ideaService.deleteIdeaStatus, id);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.deleteIdeaStatusSuccess(id));
  } catch (error) {
    yield put(ideaActions.deleteIdeaStatusFailure(error));
  }
}

function* searchCompanyMembersSaga({ payload: { companyId, searchText } }) {
  try {
    const { data, errors } = yield call(ideaService.searchCompanyMembers, companyId, searchText);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.searchCompanyMembersSuccess(data));
  } catch (error) {
    yield put(ideaActions.searchCompanyMembersFailure(error));
  }
}

export default function* ideaSaga() {
  yield takeEvery(ideaActions.getIdeasByCompany.type, getIdeasByCompanySaga);
  yield takeEvery(ideaActions.createIdea.type, createIdeaSaga);
  yield takeEvery(ideaActions.voteIdea.type, voteIdeaSaga);
  yield takeEvery(ideaActions.downVoteIdea.type, downVoteIdeaSaga);
  yield takeEvery(ideaActions.updateIdea.type, updateIdeaSaga);
  yield takeEvery(ideaActions.deleteIdea.type, deleteIdeaSaga);
  yield takeEvery(ideaActions.searchSimilarIdeas.type, searchSimilarIdeasSaga);
  yield takeEvery(ideaActions.deleteIdeaCoverImage.type, deleteIdeaCoverImage);
  yield takeEvery(ideaActions.getUserVotes.type, getUserVotesSaga);
  yield takeEvery(ideaActions.deleteIdeaStatus.type, deleteIdeaStatusSaga);
  yield takeEvery(ideaActions.searchCompanyMembers.type, searchCompanyMembersSaga);
}
