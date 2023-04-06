import AnnouncementService from '@/services/announcement';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { realtime } from '@/utils/altogic';
import { announcementActions } from './announcementSlice';

function* createAnnouncement({ payload }) {
  try {
    const { data, errors } = yield call(AnnouncementService.createAnnouncement, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.createAnnouncementSuccess(data));
    payload.onSuccess(data);
  } catch (error) {
    yield put(announcementActions.createAnnouncementFailure(error));
  }
}

function* updateAnnouncement({ payload }) {
  try {
    const { data, errors } = yield call(AnnouncementService.updateAnnouncement, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.updateAnnouncementSuccess(data));
    payload.onSuccess(data);
  } catch (error) {
    yield put(announcementActions.updateAnnouncementFailure(error));
  }
}

function* getAnnouncements({ payload }) {
  try {
    const { data, errors } = yield call(AnnouncementService.getAnnouncements, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.getAnnouncementsSuccess(data));
  } catch (error) {
    yield put(announcementActions.getAnnouncementsFailure(error));
  }
}

function* deleteAnnouncement({ payload }) {
  try {
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    const { errors } = yield call(AnnouncementService.deleteAnnouncement, payload.announcementId);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.deleteAnnouncementSuccess(payload.announcementId));
    realtime.send(company._id, 'delete-announcement', {
      announcementId: payload.announcementId,
      sender: user._id
    });
    payload.onSuccess();
  } catch (error) {
    yield put(announcementActions.deleteAnnouncementFailure(error));
  }
}
function* getAnnouncementBySlug({ payload }) {
  try {
    const { data, errors } = yield call(AnnouncementService.getAnnouncement, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.getAnnouncementSuccess(data));
  } catch (error) {
    yield put(announcementActions.getAnnouncementFailed(error));
  }
}

function* createAnnouncementReaction({ payload }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(AnnouncementService.createAnnouncementReaction, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.createAnnouncementReactionSuccess(data));
    realtime.send(company._id, 'create-announcement-reaction', data);
  } catch (error) {
    yield put(announcementActions.createAnnouncementReactionFailure(error));
  }
}

function* deleteAnnouncementReaction({ payload }) {
  try {
    const company = yield select((state) => state.company.company);

    const { data, errors } = yield call(
      AnnouncementService.deleteAnnouncementReaction,
      payload.reactionId
    );
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.deleteAnnouncementReactionSuccess(data));
    realtime.send(company._id, 'delete-announcement-reaction', data);
  } catch (error) {
    yield put(announcementActions.deleteAnnouncementReactionFailure(error));
  }
}

function* getAnnouncementReactions({ payload }) {
  try {
    const { data, errors } = yield call(AnnouncementService.getAnnouncementReactions, payload);
    if (errors) {
      throw errors.items;
    }
    yield put(announcementActions.getAnnouncementReactionsSuccess(data));
  } catch (error) {
    yield put(announcementActions.getAnnouncementReactionsFailure(error));
  }
}

export default function* announcementSaga() {
  yield takeEvery(announcementActions.createAnnouncement.type, createAnnouncement);
  yield takeEvery(announcementActions.updateAnnouncement.type, updateAnnouncement);
  yield takeEvery(announcementActions.getAnnouncements.type, getAnnouncements);
  yield takeEvery(announcementActions.deleteAnnouncement.type, deleteAnnouncement);
  yield takeEvery(announcementActions.getAnnouncement.type, getAnnouncementBySlug);
  yield takeEvery(announcementActions.createAnnouncementReaction.type, createAnnouncementReaction);
  yield takeEvery(announcementActions.deleteAnnouncementReaction.type, deleteAnnouncementReaction);
  yield takeEvery(announcementActions.getAnnouncementReactions.type, getAnnouncementReactions);
}
