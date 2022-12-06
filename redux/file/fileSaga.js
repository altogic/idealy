import AuthService from '@/services/auth';
import FileService from '@/services/file';
import companyService from '@/services/company';
import _ from 'lodash';
import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import realtimeService from '@/utils/realtime';
import { authActions } from '../auth/authSlice';
import { fileActions } from './fileSlice';
import { companyActions } from '../company/companySlice';

function* uploadFileSaga({ payload }) {
  try {
    if (payload.existingFile) {
      yield call(FileService.deleteFile, payload.existingFile);
    }
    const { data, errors } = yield call(FileService.uploadFile, payload.file, payload.name);
    if (data) {
      yield put(fileActions.uploadFileSuccess(data.publicPath));
      yield put(
        fileActions.uploadFilesSuccess({
          name: payload.name.split('-')[1],
          data: data.publicPath
        })
      );
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(fileActions.uploadFileFailure(e));
  }
}
function* uploadFaviconSaga({ payload }) {
  try {
    if (payload.existingFile) {
      yield call(FileService.deleteFile, payload.existingFile);
    }
    const { data, errors } = yield call(FileService.uploadFile, payload.file, payload.name);
    if (data) {
      yield put(fileActions.uploadFaviconSuccess(data.publicPath));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(fileActions.uploadFaviconFailed(e));
  }
}

function* deleteFileSaga({ payload }) {
  yield put(fileActions.clearFileLink({ name: _.get(payload, 'name') }));
}

export function* clearFileLink() {
  yield put(fileActions.clearFileLink());
}

function* deleteAvatarFileSaga({ payload: userId }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(AuthService.deleteProfileAvatar, userId);
    if (errors) throw errors;
    if (data) {
      yield call(AuthService.setUser, data);
      yield put(authActions.setUser(data));
      yield put(fileActions.deleteUserAvatarSuccess());
      realtimeService.sendMessage(company._id, 'company-message', {
        type: 'user-update',
        user: data
      });
    }
  } catch (error) {
    yield put(fileActions.deleteUserAvatarFailure(error));
  }
}

function* deleteCompanyLogoFileSaga({ payload: companyId }) {
  try {
    const { data, errors } = yield call(companyService.deleteIsCompanyLogo, companyId);
    if (errors) throw errors;
    if (data) {
      yield put(fileActions.deleteCompanyLogoSuccess(data));
      yield put(companyActions.updateCompanyLogoSuccess(data));
    }
  } catch (error) {
    yield put(fileActions.deleteCompanyLogoFailure(error));
  }
}

function* deleteCompanyFaviconFileSaga({ payload: companyId }) {
  try {
    const { data, errors } = yield call(companyService.deleteIsCompanyFavicon, companyId);
    if (errors) throw errors;
    if (data) {
      yield put(fileActions.deleteCompanyFaviconSuccess(data));
      yield put(companyActions.updateCompanyFaviconSuccess(data));
    }
  } catch (error) {
    yield put(fileActions.deleteCompanyFaviconFailure(error));
  }
}

function* setFileLinkByProfilePictureSaga() {
  const user = yield select((state) => state.auth.user);
  yield put(fileActions.uploadFileSuccess(user.profilePicture));
}

function* setFileLinkByCompanyLogoPictureSaga() {
  const company = yield select((state) => state.company.company);
  yield put(fileActions.uploadFileSuccess(company.logoUrl));
}

function* setFileLinkByCompanyFaviconPictureSaga() {
  const company = yield select((state) => state.company.company);
  yield put(fileActions.uploadFaviconSuccess(company.favicon));
}

export default function* fileSaga() {
  yield all([
    takeEvery(fileActions.uploadFileRequest.type, uploadFileSaga),
    takeEvery(fileActions.deleteFileRequest.type, deleteFileSaga),
    takeEvery(fileActions.deleteUserAvatar.type, deleteAvatarFileSaga),
    takeEvery(fileActions.deleteCompanyLogo.type, deleteCompanyLogoFileSaga),
    takeEvery(fileActions.deleteCompanyFavicon.type, deleteCompanyFaviconFileSaga),
    takeEvery(fileActions.setFileLinkByProfilePictureRequest.type, setFileLinkByProfilePictureSaga),
    takeEvery(
      fileActions.setFileLinkByCompanyLogoRequest.type,
      setFileLinkByCompanyLogoPictureSaga
    ),
    takeEvery(
      fileActions.setFileLinkByCompanyFaviconRequest.type,
      setFileLinkByCompanyFaviconPictureSaga
    ),
    takeEvery(fileActions.uploadFavicon.type, uploadFaviconSaga)
  ]);
}
