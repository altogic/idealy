import AuthService from '@/services/auth';
import companyService from '@/services/company';
import ideaService from '@/services/idea';
import { realtime } from '@/utils/altogic';
import ToastMessage from '@/utils/toast';
import { SUBDOMAIN_REGEX } from 'constants';
import _ from 'lodash';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { PRIORITY_VALUES } from '@/constants/index';
import { authActions } from '../auth/authSlice';
import { ideaActions } from '../ideas/ideaSlice';
import { companyActions } from './companySlice';

function* setCreatedCompanySaga({ payload }) {
  yield put(companyActions.setCompanyWillBeCreatedSuccess(payload));
}
function* setSubdomainSaga({ payload: subdomain }) {
  if (SUBDOMAIN_REGEX.test(subdomain)) {
    const { data, error } = yield call(companyService.checkSubdomainExists, subdomain);
    if (error) {
      yield put(companyActions.checkSubdomainExistsFailed(error));
    }
    if (data.length) {
      yield put(companyActions.checkSubdomainExistsSuccess(true));
    } else {
      yield put(companyActions.checkSubdomainExistsSuccess(false));
      yield put(companyActions.setSubdomainSuccess(subdomain));
    }
  } else {
    yield put(
      companyActions.setCompanyError({
        field: 'subdomain',
        message:
          'Subdomain can only contain lowercase letters and numbers and must be between 3 and 20 characters long'
      })
    );
  }
}
function* setCompanyErrorSaga({ payload }) {
  yield put(companyActions.setCompanyErrorSuccess(payload));
}
function* setIdea({ payload }) {
  yield put(companyActions.setIdeaSuccess(payload));
}
function* setIdeaDescription({ payload }) {
  yield put(companyActions.setIdeaDescriptionSuccess(payload));
}
function* addTopic({ payload }) {
  yield put(companyActions.addTopicSuccess(payload));
}
function* removeTopic({ payload: topic }) {
  yield put(companyActions.removeTopicSuccess(topic._id));
}
function* setIdeaStatus({ payload }) {
  yield put(companyActions.setIdeaStatusSuccess(payload));
}
function* createCompanySaga({ payload: { userId, onSuccess } }) {
  try {
    const topics = yield select((state) => state.topic.topics);
    const statuses = yield select((state) => state.topic.statuses);
    const selectedTopics = yield select((state) => state.company.companyTopics);
    const status = yield select((state) => state.company.ideaStatus) || statuses[0];
    const sessionUser = yield select((state) => state.auth.user);
    const { data } = yield call(companyService.createCompany, {
      name: yield select((state) => state.company.companyWillBeCreated),
      subdomain: yield select((state) => state.company.subdomain),
      topics: topics.map((topic) => ({
        name: topic.name,
        order: topic.order
      })),
      statuses: statuses.map((status) => ({
        name: status.name,
        color: status.color,
        order: status.order,
        isCompletedStatus: status.isCompletedStatus
      })),
      owner: userId
    });
    const { company, user, errors } = data;
    const companyData = {
      ...company,
      role: 'Owner'
    };
    yield put(companyActions.createCompanySuccess(companyData));

    if (!_.isNil(errors)) {
      throw errors;
    }

    yield put(authActions.loginSuccess(user));
    yield call(AuthService.setUser, user);
    if (selectedTopics.length || status) {
      yield call(ideaService.createIdea, {
        title: yield select((state) => state.company.idea),
        topics: selectedTopics.map((topic) => topic.name),
        content: yield select((state) => state.company.ideaDescription),
        status: data.company.statuses.find((st) => st.name === status.name)._id,
        author: sessionUser._id,
        company: data.company._id,
        isApproved: !data.company?.privacy?.ideaApproval,
        costFactor: PRIORITY_VALUES[data.company?.priorityType][0],
        benefitFactor: PRIORITY_VALUES[data.company?.priorityType][0]
      });
    }
    onSuccess(companyData);
  } catch (error) {
    yield put(companyActions.createCompanyFailed(error));
  }
}
function* updateCompanySaga({ payload: company }) {
  try {
    const { data, errors } = yield call(companyService.updateCompany, company);
    if (errors) {
      throw errors;
    }

    const stateCompany = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    yield put(
      companyActions.updateCompanySuccess({
        ...data,
        role: stateCompany.role
      })
    );
    realtime.send(data._id, 'update-company', {
      company: data,
      sender: user._id
    });
  } catch (error) {
    yield put(companyActions.updateCompanyFailed(error));
  }
}

function* getCompanyMembers({ payload: company }) {
  try {
    const { data, error } = yield call(companyService.getCompanyMembers, company._id);
    const { data: unregistered, error: companyError } = yield call(
      companyService.getUnregisteredCompanyMembers,
      company._id
    );
    if (error || companyError) {
      throw new Error(error);
    }
    yield put(
      companyActions.getCompanyMembersSuccess({
        members: data,
        unregistered
      })
    );
  } catch (error) {
    yield put(companyActions.getCompanyFailed(error));
  }
}
function* inviteTeamMemberSaga({ payload }) {
  try {
    const { data, errors } = yield call(companyService.inviteTeamMember, payload);
    const user = yield select((state) => state.auth.user);
    if (errors) {
      payload.onError(errors.items[0]);
      throw new Error(errors);
    }
    yield put(companyActions.inviteTeamMemberSuccess(data.member));
    payload.onSuccess(data?.member.user?._id, data.invitation.token);
    realtime.send(payload.companyId, 'invite-team-member', {
      sender: user._id,
      ...data.member
    });
  } catch (error) {
    yield put(companyActions.inviteTeamMemberFailed(error));
  }
}
function* updateMemberStatusSaga({ payload }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { error } = yield call(companyService.updateMemberStatus, {
      userId: user._id,
      companyId: payload.companyId,
      status: payload.status ? payload.status : 'Active'
    });
    if (error) {
      throw error;
    }
    if (payload.onSuccess) {
      payload.onSuccess();
    }
    yield put(companyActions.updateMemberStatusSuccess(user._id));
  } catch (error) {
    yield put(companyActions.updateMemberStatusFailed(error));
  }
}

function* addNewMember({ payload }) {
  try {
    const { data, error } = yield call(companyService.registerTeamMember, payload);
    if (error) {
      throw error;
    }
    yield put(companyActions.addNewMemberSuccess(data));
    payload.onSuccess();
  } catch (error) {
    yield put(companyActions.addNewMemberFailed(error));
  }
}
function* selectCompany({ payload }) {
  yield put(companyActions.selectCompanySuccess(payload));
}
function* setCompanies({ payload }) {
  yield put(companyActions.setCompaniesSuccess(payload));
}
function* updateCompanySubLists({ payload: { id, property, update, role } }) {
  try {
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(companyService.updateCompanyProperties, {
      id,
      modelName: `company.${property}`,
      update
    });
    if (error) {
      throw error;
    }
    yield put(
      companyActions.updateCompanySubListsSuccess({
        data: {
          ...data,
          role
        },
        property
      })
    );

    realtime.send(company._id, 'update-sublist', {
      sender: user._id,
      property,
      companyId: company._id,
      data: company[property].map((item) => {
        if (item._id === data._id) {
          return data;
        }
        return item;
      })
    });
  } catch (error) {
    yield put(companyActions.updateCompanySubListsFailed(error));
  }
}
function* deleteAllIdeas({ payload: companyId }) {
  try {
    const { data, error } = yield call(companyService.deleteAllIdeas, companyId);
    if (error) {
      throw error;
    }
    yield put(companyActions.deleteAllIdeasSuccess(data));
  } catch (error) {
    yield put(companyActions.deleteAllIdeasFailed(error));
  }
}
function* deleteCompany({ payload: { companyId, onSuccess } }) {
  try {
    const { error } = yield call(companyService.deleteCompany, companyId);
    if (error) {
      throw new Error(error);
    }
    yield put(companyActions.deleteCompanySuccess(companyId));
    const companies = yield select((state) => state.company.companies);
    onSuccess(companies);
  } catch (error) {
    yield put(companyActions.deleteCompanyFailed(error));
  }
}
function* deleteCompanyMember({ payload: { userId, email, companyId } }) {
  try {
    const { error } = yield call(companyService.deleteCompanyMember, companyId, userId);
    yield call(companyService.deleteInvite, email, companyId);
    if (error) {
      throw error;
    }
    yield put(companyActions.deleteCompanyMemberSuccess({ companyId, userId }));
  } catch (error) {
    yield put(companyActions.deleteCompanyMemberFailed(error));
  }
}
function* deleteUnregisteredCompanyMember({ payload: { id, email, companyId } }) {
  try {
    const { error } = yield call(companyService.deleteUnregisteredCompanyMember, id);
    yield call(companyService.deleteInvite, email, companyId);
    if (error) {
      throw new Error(error);
    }
    yield put(companyActions.deleteUnregisteredMemberSuccess(id));
  } catch (error) {
    yield put(companyActions.deleteUnregisteredMemberFailed(error));
  }
}
function* updateCompanyMemberRole({ payload: { id, role, companyId, email, isRegistered } }) {
  try {
    const { error } = yield call(companyService.updateCompanyMemberRole, {
      id,
      role,
      companyId,
      email,
      isRegistered
    });
    if (error) {
      throw new Error(error);
    }
    yield put(companyActions.updateCompanyMemberRoleSuccess());
  } catch (error) {
    yield put(companyActions.updateCompanyMemberRoleFailed(error));
  }
}
function* invalidateInvitationTokenSaga({ payload: { email, companyId } }) {
  try {
    const { error } = yield call(companyService.invalidateInvitationToken, email, companyId);
    if (error) {
      throw new Error(error);
    }
    yield put(companyActions.invalidateInvitationTokenSuccess());
  } catch (e) {
    yield put(companyActions.invalidateInvitationTokenFailed(e));
  }
}
function* updateCompletedStatus({ payload: { id, companyId, role } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(companyService.updateCompletedStatus, { id, companyId });
    if (error) {
      throw new Error(error);
    }
    yield put(
      companyActions.updateCompletedStatusSuccess({
        ...data,
        role
      })
    );
    realtime.send(data._id, 'update-company', {
      sender: user._id,
      company: data
    });
  } catch (e) {
    yield put(companyActions.updateCompletedStatusFailed(e));
  }
}
function* updateCompanySubListsOrder({ payload: { property, value } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const company = yield select((state) => state.company.company);
    const { data, error } = yield call(companyService.updateCompanySubListsOrder, {
      value,
      modelName: property
    });
    if (error) {
      throw error;
    }

    yield put(
      companyActions.updateCompanySubListsOrderSuccess({
        ...data,
        role: company.role
      })
    );
    realtime.send(data._id, 'update-sublist', {
      sender: user._id,
      companyId: data._id,
      property,
      data: data[property]
    });
  } catch (error) {
    yield put(companyActions.updateCompanySubListsOrderFailed(error));
  }
}
function* getUserCompanies({ payload: userId }) {
  try {
    const { data, error } = yield call(companyService.getUserCompanies, userId);
    if (error) {
      throw error;
    }
    yield put(companyActions.getUserCompaniesSuccess(data));
  } catch (error) {
    yield put(companyActions.getUserCompaniesFailed(error));
  }
}

function* addItemToCompanySubLists({ payload: { fieldName, value } }) {
  try {
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(companyService.addItemToCompanySubLists, {
      fieldName,
      value,
      companyId: company._id
    });
    if (error) {
      throw error;
    }

    yield put(
      companyActions.addItemToCompanySubListsSuccess({
        data,
        fieldName
      })
    );
    realtime.send(company._id, 'update-company', {
      sender: user._id,
      company: {
        ...company,
        [fieldName]: company[fieldName].concat(data)
      }
    });
  } catch (error) {
    yield put(companyActions.addItemToCompanySubListsFailed(error));
  }
}
function* deleteCompanySubListsItem({ payload: { id, fieldName } }) {
  try {
    const company = yield select((state) => state.company.company);
    const user = yield select((state) => state.auth.user);
    const { error } = yield call(companyService.deleteCompanySubListsItem, {
      id,
      fieldName,
      companyId: company._id
    });
    if (error) {
      throw error;
    }
    yield put(
      companyActions.deleteCompanySubListsItemSuccess({
        id,
        fieldName
      })
    );
    realtime.send(company._id, 'update-company', {
      sender: user._id,
      company: {
        ...company,
        [fieldName]: company[fieldName].filter((item) => item._id !== id)
      }
    });
  } catch (error) {
    yield put(companyActions.deleteCompanySubListsItemFailed(error));
  }
}
function* getCompanyBySubdomain({ payload: { subdomain, onFail, onSuccess, userId } }) {
  try {
    const { data, error } = yield call(companyService.getCompanyBySubdomain, subdomain, userId);
    if (error) {
      throw error;
    }
    if (data) {
      yield put(companyActions.getCompanyBySubdomainSuccess(data));
      onSuccess(data.subdomain);
    } else {
      onFail();
    }
  } catch (error) {
    yield put(companyActions.getCompanyBySubdomainFailed(error));
  }
}

function* resendInviteSaga({ payload }) {
  try {
    const { errors } = yield call(companyService.resendInvitation, payload);
    if (errors) {
      throw errors;
    }
    yield put(companyActions.resendInviteSuccess());
    ToastMessage.success('Invitation resent successfully');
  } catch (error) {
    yield put(companyActions.resendInviteFailed(error));
  }
}
function* createCompanyUser({ payload }) {
  try {
    const { data, errors } = yield call(companyService.createCompanyUser, payload);

    if (errors) {
      throw errors.items;
    }
    yield put(companyActions.createCompanyUserSuccess(data));
    yield put(
      ideaActions.updateGuestAuthor({
        email: payload.email,
        name: payload.name,
        avatar: payload.avatar
      })
    );
    if (payload.onSuccess) {
      payload.onSuccess(data);
    }
  } catch (error) {
    yield put(companyActions.createCompanyUserFailed(error));
  }
}
function* requestAccessSaga({ payload }) {
  try {
    const { data, error } = yield call(companyService.requestAccess, payload);
    if (error) {
      throw error;
    }
    yield put(companyActions.requestAccessSuccess(data));
    realtime.send(payload.companyId, 'request-access', data);
    payload.onSuccess();
  } catch (error) {
    yield put(companyActions.requestAccessFailed(error));
  }
}
function* getAccessRequestSaga({ payload }) {
  try {
    const { data, error } = yield call(companyService.getAccessRequests, payload);
    if (error) {
      throw error;
    }
    yield put(companyActions.getAccessRequestSuccess(data));
  } catch (error) {
    yield put(companyActions.getAccessRequestFailed(error));
  }
}
function* getAccessRequestsByCompanySaga({ payload: companyId }) {
  try {
    const { data, error } = yield call(companyService.getAccessRequestsByCompany, companyId);
    if (error) {
      throw error;
    }
    yield put(companyActions.getAccessRequestsByCompanySuccess(data));
  } catch (error) {
    yield put(companyActions.getAccessRequestsByCompanyFailed(error));
  }
}
function* approveCompanyAccessRequestSaga({ payload }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(companyService.approveCompanyAccessRequest, payload);
    if (error) {
      throw error;
    }
    yield put(companyActions.approveCompanyAccessRequestSuccess(data));
    realtime.send(payload.companyId, 'approve-access', {
      ...data,
      sender: user._id
    });
    realtime.send(data.user._id, 'approve-access', data);
    payload.onSuccess();
  } catch (error) {
    yield put(companyActions.approveCompanyAccessRequestFailed(error));
  }
}
function* rejectCompanyAccessRequestSaga({ payload: { body, message, onSuccess } }) {
  try {
    const { error } = yield call(companyService.rejectCompanyAccessRequest, body);
    if (error) {
      throw error;
    }
    yield put(companyActions.rejectCompanyAccessRequestSuccess(body.id));

    realtime.send(message.companyId, 'reject-access', message);
    realtime.send(message.userId, 'reject-access', message);
    onSuccess();
  } catch (error) {
    yield put(companyActions.rejectCompanyAccessRequestFailed(error));
  }
}
function* getCompanyUsersSaga({ payload: companyId }) {
  try {
    const { data, error } = yield call(companyService.getCompanyUsers, companyId);
    if (error) {
      throw error;
    }
    yield put(companyActions.getCompanyUsersSuccess(data));
  } catch (error) {
    yield put(companyActions.getCompanyUsersFailed(error));
  }
}
export default function* companySaga() {
  yield all([
    takeEvery(companyActions.setCompanyWillBeCreated.type, setCreatedCompanySaga),
    takeEvery(companyActions.setSubdomain.type, setSubdomainSaga),
    takeEvery(companyActions.setCompanyError.type, setCompanyErrorSaga),
    takeEvery(companyActions.setIdea.type, setIdea),
    takeEvery(companyActions.setIdeaDescription.type, setIdeaDescription),
    takeEvery(companyActions.addTopic.type, addTopic),
    takeEvery(companyActions.removeTopic.type, removeTopic),
    takeEvery(companyActions.setIdeaStatus.type, setIdeaStatus),
    takeEvery(companyActions.createCompany.type, createCompanySaga),
    takeEvery(companyActions.getCompanyMembers.type, getCompanyMembers),
    takeEvery(companyActions.inviteTeamMember.type, inviteTeamMemberSaga),
    takeEvery(companyActions.updateMemberStatus.type, updateMemberStatusSaga),
    takeEvery(companyActions.addNewMember.type, addNewMember),
    takeEvery(companyActions.selectCompany.type, selectCompany),
    takeEvery(companyActions.setCompanies.type, setCompanies),
    takeEvery(companyActions.deleteAllIdeas.type, deleteAllIdeas),
    takeEvery(companyActions.deleteCompany.type, deleteCompany),
    takeEvery(companyActions.deleteCompanyMember.type, deleteCompanyMember),
    takeEvery(companyActions.deleteUnregisteredMember.type, deleteUnregisteredCompanyMember),
    takeEvery(companyActions.updateCompanyMemberRole.type, updateCompanyMemberRole),
    takeEvery(companyActions.invalidateInvitationToken.type, invalidateInvitationTokenSaga),
    takeEvery(companyActions.updateCompletedStatus.type, updateCompletedStatus),
    takeEvery(companyActions.updateCompanySubLists.type, updateCompanySubLists),
    takeEvery(companyActions.updateCompanySubListsOrder.type, updateCompanySubListsOrder),
    takeEvery(companyActions.getUserCompanies.type, getUserCompanies),
    takeEvery(companyActions.addItemToCompanySubLists.type, addItemToCompanySubLists),
    takeEvery(companyActions.deleteCompanySubListsItem.type, deleteCompanySubListsItem),
    takeEvery(companyActions.getCompanyBySubdomain.type, getCompanyBySubdomain),
    takeEvery(companyActions.updateCompany, updateCompanySaga),
    takeEvery(companyActions.resendInvite, resendInviteSaga),
    takeEvery(companyActions.createCompanyUser, createCompanyUser),
    takeEvery(companyActions.requestAccess, requestAccessSaga),
    takeEvery(companyActions.getAccessRequest, getAccessRequestSaga),
    takeEvery(companyActions.getAccessRequestsByCompany, getAccessRequestsByCompanySaga),
    takeEvery(companyActions.approveCompanyAccessRequest, approveCompanyAccessRequestSaga),
    takeEvery(companyActions.rejectCompanyAccessRequest, rejectCompanyAccessRequestSaga),
    takeEvery(companyActions.getCompanyUsers, getCompanyUsersSaga)
  ]);
}
