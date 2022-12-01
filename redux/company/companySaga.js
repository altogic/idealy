import { all, put, takeEvery, call, select, fork } from 'redux-saga/effects';
import { SUBDOMAIN_REGEX } from 'constants';
import _ from 'lodash';
import companyService from '@/services/company';
import AuthService from '@/services/auth';
import realtimeService from '@/utils/realtime';
import { companyActions } from './companySlice';
import { authActions } from '../auth/authSlice';

function* removeCompanyTopicSaga({ payload: { topic, companyId } }) {
  try {
    const { errors } = yield call(companyService.removeCompanyTopics, {
      topic,
      companyId
    });
    if (errors) {
      throw new Error(errors);
    }
    yield put(companyActions.removeCompanyTopicsSuccess(topic));
  } catch (error) {
    yield put(companyActions.removeCompanyTopicFailure(error));
  }
}

function* setCompanyTopicsCreatedSaga({ payload: { name, companyId, order } }) {
  try {
    const { data, errors } = yield call(companyService.setCompanyTopics, {
      name,
      companyId,
      order
    });
    if (errors) {
      throw errors.items;
    }
    yield put(companyActions.setCompanyTopicsSuccess(data));
  } catch (e) {
    yield put(companyActions.setCompanyTopicsFailure(e));
  }
}

function* setCompanyStatusesCreatedSaga({ payload: { name, color, companyId, order } }) {
  try {
    const { data, errors } = yield call(companyService.setCompanyStatuses, {
      name,
      color,
      companyId,
      order
    });
    if (errors) {
      throw errors.items;
    }
    yield put(companyActions.setCompanyStatusesSuccess(data));
  } catch (e) {
    yield put(companyActions.setCompanyStatusesFailure(e));
  }
}

function* removeCompanyStatusesSaga({ payload: { status } }) {
  try {
    const { errors } = yield call(companyService.removeCompanyStatuses, {
      status
    });
    if (errors) {
      throw new Error(errors);
    }
    yield put(companyActions.removeCompanyStatusesSuccess(status));
  } catch (error) {
    yield put(companyActions.removeCompanyStatusesFailure(error));
  }
}

function* setCompanyCategoriesCreatedSaga({ payload: { name, color, companyId, order } }) {
  try {
    const { data, errors } = yield call(companyService.setCompanyCategories, {
      name,
      color,
      companyId,
      order
    });
    if (errors) {
      throw errors.items;
    }
    yield put(companyActions.setCompanyCategoriesSuccess(data));
  } catch (e) {
    yield put(companyActions.setCompanyCategoriesFailure(e));
  }
}

function* removeCompanyCategoriesSaga({ payload: { category } }) {
  try {
    const { errors } = yield call(companyService.removeCompanyCategories, {
      category
    });
    if (errors) {
      throw new Error(errors);
    }
    yield put(companyActions.removeCompanyCategoriesSuccess(category));
  } catch (error) {
    yield put(companyActions.removeCompanyCategoriesFailure(error));
  }
}

function* setCompanyRoadMapCreatedSaga({ payload: { name, description, companyId } }) {
  try {
    const { data, errors } = yield call(companyService.setCompanyRoadMap, {
      name,
      description,
      companyId
    });
    if (errors) {
      throw errors.items;
    }
    yield put(companyActions.setCompanyRoadMapSuccess(data));
  } catch (e) {
    yield put(companyActions.setCompanyRoadMapFailure(e));
  }
}

function* removeCompanyRoadMapSaga({ payload: { roadmap } }) {
  try {
    const { errors } = yield call(companyService.removeCompanyRoadMap, {
      roadmap
    });
    if (errors) {
      throw new Error(errors);
    }
    yield put(companyActions.removeCompanyRoadMapSuccess(roadmap));
  } catch (error) {
    yield put(companyActions.removeCompanyRoadMapFailure(error));
  }
}
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
      ideas: [
        {
          name: yield select((state) => state.company.idea),
          topics: selectedTopics.map((topic) => topic.name),
          description: yield select((state) => state.company.ideaDescription),
          status: status?.name
        }
      ],
      owner: userId
    });

    const { company, user, errors } = data;
    if (!_.isNil(errors)) {
      throw errors;
    }
    const companyData = {
      ...company,
      role: 'Owner'
    };
    yield put(companyActions.createCompanySuccess(companyData));
    yield put(authActions.loginSuccess(user));
    yield call(AuthService.setUser, user);
    localStorage.setItem('selectedCompany', JSON.stringify(companyData));
    onSuccess();
  } catch (error) {
    yield put(companyActions.createCompanyFailed(error));
  }
}
function* updateCompanySaga({ payload: { company, role } }) {
  try {
    const { data, errors } = yield call(companyService.updateCompany, company);
    if (errors) {
      throw errors;
    }
    yield put(
      companyActions.updateCompanySuccess({
        ...data,
        role
      })
    );
    yield call(realtimeService.sendMessage(data._id, 'update', data));
  } catch (error) {
    yield put(companyActions.updateCompanyFailed(error));
  }
}
function* getCompanySaga({ payload: companyId }) {
  try {
    const { data, error } = yield call(companyService.getCompanyById, companyId);
    if (error) {
      throw new Error(error);
    }
    const companies = yield select((state) => state.company.companies);
    if (companies.length) {
      const { role } = companies.find((c) => c._id === data._id);
      yield put(
        companyActions.getCompanySuccess({
          ...data,
          role
        })
      );
    }
  } catch (error) {
    yield put(companyActions.getCompanyFailed(error));
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
    yield put(companyActions.inviteTeamMemberSuccess(data));
    payload.onSuccess(data?.user?._id);
    yield call(
      realtimeService.sendMessage(payload.companyId, 'company-message', {
        type: 'invite-team-member',
        sender: user._id,
        ...data
      })
    );
  } catch (error) {
    yield put(companyActions.inviteTeamMemberFailed(error));
  }
}
function* updateMemberStatusSaga({ payload }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { error } = yield call(companyService.updateMemberStatus, {
      userId: user._id,
      companyId: payload.companyId
    });
    if (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
    yield put(companyActions.addNewMemberSuccess(data));
  } catch (error) {
    yield put(companyActions.addNewMemberFailed(error));
  }
}
function* selectCompany({ payload }) {
  localStorage.setItem('selectedCompany', JSON.stringify(payload));
  yield put(companyActions.selectCompanySuccess(payload));
}
function* setCompanies({ payload }) {
  yield put(companyActions.setCompaniesSuccess(payload));
}
function* updateCompanySubLists({ payload: { id, fieldName, property, value, role } }) {
  try {
    const { data, error } = yield call(companyService.updateCompanyProperties, {
      id,
      fieldName,
      value,
      modelName: `company.${property}`
    });
    if (error) {
      throw new Error(error);
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
  } catch (error) {
    yield put(companyActions.updateCompanySubListsFailed(error));
  }
}
function* deleteAllIdeas({ payload: companyId }) {
  try {
    const { data, error } = yield call(companyService.deleteAllIdeas, companyId);
    if (error) {
      throw new Error(error);
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
    onSuccess();
    yield put(companyActions.deleteCompanySuccess(companyId));
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
function* deleteUnregisteredCompanyMember({ payload: { id, email } }) {
  try {
    const { error } = yield call(companyService.deleteUnregisteredCompanyMember, id);
    yield call(companyService.deleteInvite, email);
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
  } catch (e) {
    yield put(companyActions.updateCompletedStatusFailed(e));
  }
}
function* updateCompanySubListsOrder({ payload: { property, value, role } }) {
  try {
    const { data, error } = yield call(companyService.updateCompanySubListsOrder, {
      value,
      modelName: property
    });
    if (error) {
      throw new Error(error);
    }
    yield put(
      companyActions.updateCompanySubListsOrderSuccess({
        ...data,
        role
      })
    );
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
    yield put(companyActions.getUserCompaniesSuccess(data.response.companies));
  } catch (error) {
    yield put(companyActions.getUserCompaniesFailed(error));
  }
}
function* declineInvitation({ payload: { email, companyId } }) {
  try {
    const { error } = yield call(companyService.declineInvitation, {
      email,
      companyId
    });
    if (error) {
      throw new Error(error);
    }
    yield put(companyActions.declineInvitationSuccess());
  } catch (error) {
    yield put(companyActions.declineInvitationFailed(error));
  }
}
function* updateMemberStatus({ payload: { userId, company } }) {
  yield put(companyActions.updateMemberStatusRealtimeSuccess({ userId, company }));
}
function* deleteCompanyMemberRealtime({ payload: { userId, companyId, isCompany, onSuccess } }) {
  yield put(companyActions.deleteCompanyMemberRealtimeSuccess({ userId, companyId, isCompany }));
  if (!isCompany) {
    const companies = yield select((state) => state.company.companies);
    if (!companies.length) {
      onSuccess();
    } else {
      yield fork(selectCompany, { payload: companies[0] });
    }
  }
}
function* acceptInvitationRealtime({ payload: company }) {
  yield fork(selectCompany, { payload: company });
  yield put(companyActions.acceptInvitationRealtimeSuccess(company));
}

function* updateCompanyMemberRoleRealtime({ payload: { id, role, companyId, isCompany } }) {
  yield put(
    companyActions.updateCompanyMemberRoleRealtimeSuccess({ id, role, companyId, isCompany })
  );
}
function* addNewMemberRealtime({ payload }) {
  yield put(companyActions.addNewMemberRealtimeSuccess(payload));
}

function* updateCompanyMemberRealtime({ payload: user }) {
  yield put(companyActions.updateCompanyMemberRealtimeSuccess(user));
}

export default function* companySaga() {
  yield all([
    takeEvery(companyActions.removeCompanyRoadMap.type, removeCompanyRoadMapSaga),
    takeEvery(companyActions.setCompanyRoadMap.type, setCompanyRoadMapCreatedSaga),
    takeEvery(companyActions.removeCompanyStatuses.type, removeCompanyStatusesSaga),
    takeEvery(companyActions.setCompanyStatuses.type, setCompanyStatusesCreatedSaga),
    takeEvery(companyActions.removeCompanyCategories.type, removeCompanyCategoriesSaga),
    takeEvery(companyActions.setCompanyCategories.type, setCompanyCategoriesCreatedSaga),
    takeEvery(companyActions.removeCompanyTopics.type, removeCompanyTopicSaga),
    takeEvery(companyActions.setCompanyTopics.type, setCompanyTopicsCreatedSaga),
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
    takeEvery(companyActions.getCompany.type, getCompanySaga),
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
    takeEvery(companyActions.declineInvitation.type, declineInvitation),
    takeEvery(companyActions.updateMemberStatusRealtime.type, updateMemberStatus),
    takeEvery(companyActions.deleteCompanyMemberRealtime.type, deleteCompanyMemberRealtime),
    takeEvery(companyActions.updateCompanyMemberRoleRealtime.type, updateCompanyMemberRoleRealtime),
    takeEvery(companyActions.acceptInvitationRealtime.type, acceptInvitationRealtime),
    takeEvery(companyActions.addNewMemberRealtime.type, addNewMemberRealtime),
    takeEvery(companyActions.updateCompanyMemberRealtime.type, updateCompanyMemberRealtime),
    takeEvery(companyActions.updateCompany, updateCompanySaga)
  ]);
}
