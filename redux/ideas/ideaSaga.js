import ideaService from '@/services/idea';
import { realtime } from '@/utils/altogic';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { ideaActions } from './ideaSlice';

function* getIdeasByCompanySaga({ payload: { limit, page, sort, filter } }) {
  try {
    const { data: ideas, errors } = yield call(ideaService.getIdeasByCompany, {
      limit,
      page,
      sort,
      filter: `${filter || ''}`
    });
    if (errors) {
      throw new Error(errors);
    }

    yield put(ideaActions.getIdeasByCompanySuccess(ideas));
  } catch (error) {
    yield put(ideaActions.getIdeasByCompanyFailure(error));
  }
}

function* createIdeaSaga({ payload: { idea, onSuccess } }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(ideaService.createIdea, idea);
    if (errors) {
      throw errors.items;
    }
    yield put(ideaActions.createIdeaSuccess(data));
    realtime.send(company._id, 'create-idea', data);
    onSuccess(data);
  } catch (error) {
    yield put(ideaActions.createIdeaFailure(error));
  }
}
function* voteIdeaSaga({ payload }) {
  try {
    const { data, errors } = yield call(ideaService.voteIdea, payload);
    if (errors) {
      throw errors.items;
    }
    const company = yield select((state) => state.company.company);
    if (payload.onSuccess) {
      payload.onSuccess(data);
    }
    yield put(ideaActions.voteIdeaSuccess(data));
    realtime.send(company._id, 'vote-idea', data);
  } catch (error) {
    if (payload.onError) {
      payload.onError();
    }
    console.log(error);
    yield put(ideaActions.voteIdeaFailure(error));
  }
}
function* downVoteIdeaSaga({ payload }) {
  try {
    const { data, errors } = yield call(ideaService.downVoteIdea, payload);
    if (errors) {
      throw new Error(errors);
    }

    yield put(ideaActions.downVoteIdeaSuccess(data));
    const company = yield select((state) => state.company.company);

    realtime.send(company._id, 'downVote-idea', data);
  } catch (error) {
    yield put(ideaActions.downVoteIdeaFailure(error));
  }
}
function* updateIdeaSaga({ payload: { idea, onSuccess } }) {
  try {
    const { data, errors } = yield call(ideaService.updateIdea, idea);

    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.updateIdeaSuccess(data));
    const company = yield select((state) => state.company.company);
    realtime.send(company._id, 'update-idea', data);
    if (onSuccess) onSuccess(data);
  } catch (error) {
    yield put(ideaActions.updateIdeaFailure(error));
  }
}
function* deleteIdeaSaga({ payload: { id, onSuccess } }) {
  try {
    const { errors } = yield call(ideaService.deleteIdea, id);
    if (errors) {
      throw new Error(errors);
    }
    if (onSuccess) onSuccess();
    yield put(ideaActions.deleteIdeaSuccess(id));
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    realtime.send(company._id, 'delete-idea', {
      id,
      sender: user._id
    });
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
function* getUserVotesSaga({ payload: { ip, companyId, userId, email } }) {
  try {
    const { data, errors } = yield call(ideaService.getUserVotes, { ip, companyId, userId, email });
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.getUserVotesSuccess(data));
  } catch (error) {
    yield put(ideaActions.getUserVotesFailure(error));
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
function* approveAllIdeasSaga({ payload: { companyId } }) {
  try {
    const { data, errors } = yield call(ideaService.approveAllIdeas, companyId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(ideaActions.approveAllIdeasSuccess(data));
  } catch (error) {
    yield put(ideaActions.approveAllIdeasFailure(error));
  }
}
function* mergeIdeasSaga({ payload: { baseIdea, mergedIdea, onSuccess } }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(ideaService.mergeIdeas, baseIdea, mergedIdea);
    if (errors) {
      throw errors;
    }
    yield put(
      ideaActions.mergeIdeasSuccess({
        baseIdea: data.idea,
        mergedIdea,
        ideaVotes: data.ideaVotes
      })
    );

    if (onSuccess) onSuccess();
    realtime.send(company._id, 'merge-idea', {
      baseIdea: data.idea,
      mergedIdea,
      ideaVotes: data.ideaVotes
    });
  } catch (error) {
    console.log(error);
    yield put(ideaActions.mergeIdeasFailure(error));
  }
}
function* getMergedIdeasSaga({ payload: filter }) {
  try {
    const { data, errors } = yield call(ideaService.getMergedIdeas, filter);
    if (errors) {
      throw errors;
    }
    yield put(ideaActions.getMergedIdeasSuccess(data));
  } catch (error) {
    yield put(ideaActions.getMergedIdeasFailure(error));
  }
}
function* searchIdeasSaga({ payload: searchText }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(ideaService.searchSimilarIdeas, searchText, company._id);
    if (errors) {
      throw errors;
    }
    yield put(ideaActions.searchIdeasSuccess(data));
  } catch (error) {
    yield put(ideaActions.searchIdeasFailure(error));
  }
}
function* getIdeaByIdSaga({ payload: { id, onSuccess } }) {
  try {
    const { data, errors } = yield call(ideaService.getIdea, id);
    if (errors) {
      throw errors;
    }
    yield put(ideaActions.getIdeaByIdSuccess(data));
    onSuccess();
  } catch (error) {
    yield put(ideaActions.getIdeaByIdFailure(error));
  }
}
function* getIdeasByRoadmapSaga({ payload: { roadmapId, onSuccess } }) {
  try {
    const { data, errors } = yield call(ideaService.getIdeasByRoadmap, roadmapId);
    if (errors) {
      throw errors;
    }
    yield put(ideaActions.getIdeasByRoadmapSuccess(data));
    if (onSuccess) onSuccess();
  } catch (error) {
    yield put(ideaActions.getIdeasByRoadmapFailure(error));
  }
}
function* updateIdeasOrderSaga({ payload: { ideas, sourceId, destinationId, sourceIdea } }) {
  try {
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(ideaService.updateIdeasOrder, ideas);
    if (errors) {
      throw errors;
    }
    yield put(
      ideaActions.updateIdeasOrderSuccess({
        ideas: data,
        sourceId,
        destinationId,
        sourceIdea
      })
    );
    realtime.send(company._id, 'update-ideas-order', {
      ideas: data,
      sourceId,
      destinationId,
      sourceIdea,
      sender: user._id
    });
  } catch (error) {
    yield put(ideaActions.updateIdeasOrderFailure(error));
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
  yield takeEvery(ideaActions.searchCompanyMembers.type, searchCompanyMembersSaga);
  yield takeEvery(ideaActions.approveAllIdeas.type, approveAllIdeasSaga);
  yield takeEvery(ideaActions.mergeIdeas.type, mergeIdeasSaga);
  yield takeEvery(ideaActions.getMergedIdeas.type, getMergedIdeasSaga);
  yield takeEvery(ideaActions.searchIdeas.type, searchIdeasSaga);
  yield takeEvery(ideaActions.getIdeaById.type, getIdeaByIdSaga);
  yield takeEvery(ideaActions.getIdeasByRoadmap.type, getIdeasByRoadmapSaga);
  yield takeEvery(ideaActions.updateIdeasOrder.type, updateIdeasOrderSaga);
}
