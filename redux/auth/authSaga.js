import AuthService from '@/services/auth';
import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import { randomInt, setSessionCookie } from '@/utils/index';
import { COLORS } from 'constants';
import companyService from '@/services/company';
import { realtime } from '@/utils/altogic';
import { authActions } from './authSlice';
import { companyActions } from '../company/companySlice';

function* removeSavedFiltersSaga({ payload: { filter } }) {
  try {
    const { errors } = yield call(AuthService.removeFilters, {
      filter
    });
    if (errors) {
      throw new Error(errors);
    }

    yield put(authActions.removeFiltersSuccess(filter));
  } catch (error) {
    yield put(authActions.removeFiltersFailure(error));
  }
}

function* registerSaga({ payload: req }) {
  try {
    const registerRequest = {
      email: req.email,
      password: req.password,
      name: req.name
    };
    if (req.company) {
      registerRequest.canCreateCompany = req.company.whiteLabel.canCreateCompany;
      registerRequest.notifications = [
        {
          companyId: req.company._id,
          companyName: req.company.name,
          dailyDigest: true,
          weeklyDigest: true,
          voteOnIdea: true,
          commentOnIdea: true,
          replyOnIdea: true,
          mentionInAComment: true,
          ideaStatusChange: true,
          adminEditIdea: true,
          ideaApproved: true,
          ideaRejected: true,
          adminAddIdea: true,
          adminVoteIdea: true,
          accountApproval: true
        }
      ];
    }
    const { user, errors, session } = yield call(AuthService.register, {
      ...registerRequest,
      emailVerified: req.emailVerified
    });
    if (user) {
      if (user.emailVerified) {
        yield call(AuthService.authStateChange, user, session);
        yield put(authActions.loginSuccess(user));
      } else {
        yield put(authActions.registerSuccess(user));
      }
      req.onSuccess(user._id);
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(authActions.registerFailure(e));
  }
}
function* getAuthGrantSaga({ payload }) {
  try {
    yield call(AuthService.authStateChange, payload.user, payload.session);
    yield put(authActions.loginSuccess(payload.user));
    const index = randomInt(0, 13);
    if (!payload.user.stripeCustomerId || !payload.user.profilePicture) {
      const { data, errors } = yield call(AuthService.setUserInformation, {
        email: payload.user.email,
        name: payload.user.name,
        provider: payload.user.provider,
        color: COLORS[index],
        textColor: index === 5 || index === 13 || index === 14 ? '000' : 'fff'
      });
      if (!errors) {
        yield call(AuthService.authStateChange, data, payload.session);
        yield put(authActions.loginSuccess(data));
      }
      if (payload.error) {
        throw payload.error.items;
      }
    }
  } catch (e) {
    yield put(authActions.getAuthGrantFailure(e));
  }
}
function* loginSaga({ payload: { email, password, onSuccess } }) {
  try {
    const { user, errors, session } = yield call(AuthService.login, email, password);
    if (user) {
      const { data } = yield call(companyService.getUserCompanies, user._id);
      yield call(setSessionCookie, session.token);
      yield put(authActions.loginSuccess(user));
      yield put(companyActions.setCompaniesSuccess(data));
      onSuccess(data, session, user);
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(authActions.loginFailure(e));
  }
}
function* forgotPassword({ payload }) {
  try {
    const { errors } = yield call(AuthService.sendPasswordResetEmail, payload.email);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.forgotPasswordSuccess());
      payload.onSuccess();
    }
  } catch (e) {
    yield put(authActions.forgotPasswordFailure(e));
  }
}
function* resendVerificationEmail({ payload: email }) {
  try {
    const { errors } = yield call(AuthService.resendVerificationEmail, email);
    if (errors) {
      throw errors.items;
    }
    yield put(authActions.resendVerificationEmailSuccess());
  } catch (e) {
    yield put(authActions.resendVerificationEmailFailure(e));
  }
}
function* resetPassword({ payload }) {
  try {
    const { errors } = yield call(AuthService.resetPassword, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.resetPasswordSuccess());
      payload.onSuccess();
    }
  } catch (e) {
    yield put(authActions.resetPasswordFailure(e));
  }
}

function* authenticateWithProvider({ payload }) {
  try {
    const { user, errors } = yield call(AuthService.authenticateWithProvider, payload.provider);
    if (errors) {
      throw errors.items;
    }
    payload.onSuccess(user);
  } catch (e) {
    yield put(authActions.authenticateWithProviderFailure(e));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const { errors } = yield call(AuthService.changePassword, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.changePasswordSuccess());
    }
  } catch (e) {
    yield put(authActions.changePasswordFailure(e));
  }
}

function* logoutSaga({ payload }) {
  yield call(AuthService.logout);
  yield put(authActions.logoutSuccess());
  payload.onSuccess();
}

function* changeEmailSaga({ payload }) {
  try {
    const { user, errors } = yield call(AuthService.changeEmail, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.changeEmailSuccess({ ...user, email: payload.email }));
      yield call(AuthService.setUser, { ...user, email: payload.email });
      payload.onSuccess();
    }
  } catch (e) {
    yield put(authActions.changeEmailFailure(e));
  }
}

function* updateNotificationSaga({ payload }) {
  try {
    const { data, errors } = yield call(AuthService.updateNotificationSettings, payload);
    if (errors) throw errors;
    if (data) {
      yield put(authActions.updateNotificationSettingsSuccess(data));
      const { user } = yield call(AuthService.getUserFromDb);
      yield call(AuthService.setUser, user);
    }
  } catch (e) {
    yield put(authActions.updateNotificationSettingsFailure(e));
  }
}
function* updateSavedFilterSaga({ payload }) {
  try {
    const { data, errors } = yield call(AuthService.updateSavedFilters, payload);
    if (errors) throw errors;
    if (data) {
      yield put(authActions.updateSavedFiltersSuccess(data));
      const { user } = yield call(AuthService.getUserFromDb);
      yield call(AuthService.setUser, user);
    }
  } catch (e) {
    yield put(authActions.updateSavedFiltersFailure(e));
  }
}
function* clearErrorsSaga() {
  yield put(authActions.clearErrorSuccess());
}
function* getUserFromDb() {
  try {
    const { user, errors } = yield call(AuthService.getUserFromDb);
    if (errors) {
      throw new Error(errors);
    }
    yield put(authActions.setUserSuccess(user));
    yield call(AuthService.setUser, user);
  } catch (error) {
    yield put(authActions.setUserErrors(error));
  }
}
function* deleteProfileSaga({ payload: onSuccess }) {
  try {
    const { errors } = yield call(AuthService.deleteProfile);
    if (errors) {
      throw new Error(errors);
    }
    yield put(authActions.deleteProfileSuccess());
    onSuccess();
  } catch (error) {
    yield put(authActions.deleteProfileFailure(error));
  }
}
function* getUserCompaniesSaga({ payload: userId }) {
  try {
    const { companies, errors } = yield call(AuthService.getUserCompanies, userId);
    if (errors) {
      throw new Error(errors);
    }
    yield put(companyActions.setCompaniesSuccess(companies));
  } catch (error) {
    yield put(companyActions.setCompaniesFailed(error));
  }
}
function* updateUserProfileSaga({ payload }) {
  try {
    const company = yield select((state) => state.company.company);
    const { data, errors } = yield call(AuthService.updateUserProfile, payload);
    if (errors) {
      throw new Error(errors);
    }
    yield put(authActions.updateUserSuccess(data));
    yield call(AuthService.setUser, data);
    realtime.send(company._id, 'user-update', data);
  } catch (error) {
    yield put(authActions.updateUserFailure(error));
  }
}

function* authStateChangeSaga({ payload: { user, session } }) {
  yield call(AuthService.authStateChange, user, session);
}

export default function* rootSaga() {
  yield all([
    takeEvery(authActions.register.type, registerSaga),
    takeEvery(authActions.login.type, loginSaga),
    takeEvery(authActions.getAuthGrant.type, getAuthGrantSaga),
    takeEvery(authActions.setUser.type, getUserFromDb),
    takeEvery(authActions.changePassword.type, changePasswordSaga),
    takeEvery(authActions.logout.type, logoutSaga),
    takeEvery(authActions.changeEmailRequest.type, changeEmailSaga),
    takeEvery(authActions.removeFilters.type, removeSavedFiltersSaga),
    takeEvery(authActions.logout.type, logoutSaga),
    takeEvery(authActions.forgotPassword.type, forgotPassword),
    takeEvery(authActions.resetPassword.type, resetPassword),
    takeEvery(authActions.resendVerificationEmail.type, resendVerificationEmail),
    takeEvery(authActions.authenticateWithProvider.type, authenticateWithProvider),
    takeEvery(authActions.updateNotificationSettings.type, updateNotificationSaga),
    takeEvery(authActions.updateSavedFilters.type, updateSavedFilterSaga),
    takeEvery(authActions.clearError.type, clearErrorsSaga),
    takeEvery(authActions.deleteProfile.type, deleteProfileSaga),
    takeEvery(authActions.getUserCompanies.type, getUserCompaniesSaga),
    takeEvery(authActions.updateUserProfile.type, updateUserProfileSaga),
    takeEvery(authActions.authStateChange.type, authStateChangeSaga)
  ]);
}
