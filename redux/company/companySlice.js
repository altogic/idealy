/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import ToastMessage from '@/utils/toast';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  error: [],
  company: null,
  companies: [],
  companyMembers: [],
  unregisteredCompanyMembers: [],
  companyWillBeCreated: null,
  idea: null,
  ideaDescription: null,
  companyTopics: [],
  companyTopicsError: null,
  companyStatuses: [],
  companyStatusesError: null,
  companyCategories: [],
  companyCategoriesError: null,
  companyRoadMapError: null,
  updateCompanyLogoError: null,
  updateCompanyFaviconError: null,
  changeCompanyNameError: null,
  ideaStatus: null,
  subdomain: null,
  isCompanyNameExists: false,
  companyNameLoading: false,
  subdomainLoading: false,
  isSubdomainExists: false,
  deleteIdeaLoading: false,
  getCompanyMembersLoading: false,
  getCompanyLoading: false,
  logoLoading: false,
  companyUsers: [],
  accessRequest: {},
  accessRequests: [],
  getAccessRequestLoading: false,
  getCompanyUsersLoading: false,
  isGuest: false
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyWillBeCreated(state) {
      state.companyNameLoading = true;
    },
    setCompanyWillBeCreatedSuccess(state, action) {
      state.companyWillBeCreated = action.payload;
      state.companyNameLoading = false;
      state.error = [];
    },
    setSubdomain(state) {
      state.subdomain = null;
      state.subdomainLoading = true;
    },
    setSubdomainSuccess(state, action) {
      state.subdomain = action.payload;
      state.error = [];
    },
    setCompanyError() {},
    setCompanyErrorSuccess(state, action) {
      state.error = [...state.error, action.payload];
      state.subdomainLoading = false;
    },
    setIdea() {},
    setIdeaSuccess(state, action) {
      state.idea = action.payload;
      state.error = [];
    },
    setIdeaDescription() {},
    setIdeaDescriptionSuccess(state, action) {
      state.ideaDescription = action.payload;
    },
    setIdeaStatus() {},
    setIdeaStatusSuccess(state, action) {
      state.ideaStatus = action.payload;
    },
    addTopic() {},
    addTopicSuccess(state, action) {
      state.companyTopics = [...state.companyTopics, action.payload];
    },
    removeTopic() {},
    removeTopicSuccess(state, action) {
      state.companyTopics = state.companyTopics.filter((topic) => topic._id !== action.payload);
    },
    createCompany(state) {
      state.getCompanyLoading = true;
    },
    createCompanySuccess(state, action) {
      state.company = action.payload;
      state.companies = [...state.companies, action.payload];
      state.companyTopics = [];
      state.companyStatuses = [];
      state.companyWillBeCreated = null;
      state.companyCategories = [];
      state.idea = null;
      state.ideaDescription = null;
      state.ideaStatus = null;
      state.error = null;
      state.getCompanyLoading = false;
    },
    createCompanyFailed(state, action) {
      state.getCompanyLoading = false;
      state.error = action.payload;
    },
    getCompanyMembers(state) {
      state.getCompanyMembersLoading = true;
    },
    getCompanyMembersSuccess(state, action) {
      state.getCompanyMembersLoading = false;
      state.companyMembers = action.payload.members;
      state.unregisteredCompanyMembers = action.payload.unregistered;
    },
    getCompanyMembersFailed(state, action) {
      state.getCompanyMembersLoading = false;
      state.error = action.payload;
    },
    inviteTeamMember(state) {
      state.isLoading = true;
    },
    inviteTeamMemberSuccess(state, action) {
      state.isLoading = false;
      if (action.payload.email) {
        state.unregisteredCompanyMembers = [...state.unregisteredCompanyMembers, action.payload];
      } else {
        state.companyMembers = [...state.companyMembers, action.payload];
      }
    },
    inviteTeamMemberFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemberStatus(state) {
      state.isLoading = true;
    },
    updateMemberStatusSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.map((member) => {
        if (member.user._id === action.payload) {
          return { ...member, status: 'Active' };
        }
        return member;
      });
    },
    updateMemberStatusFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addNewMember(state) {
      state.isLoading = true;
    },
    addNewMemberSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = [...state.companyMembers, action.payload];
    },
    addNewMemberFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    checkSubdomainExists(state) {
      state.subdomainLoading = true;
    },
    checkSubdomainExistsSuccess(state, action) {
      state.subdomainLoading = false;
      state.isSubdomainExists = action.payload;
    },
    checkSubdomainExistsFailed(state, action) {
      state.subdomainLoading = false;
      state.error = action.payload;
    },
    selectCompany(state) {
      state.isLoading = true;
    },
    selectCompanySuccess(state, action) {
      state.isLoading = false;
      state.company = action.payload;
    },
    selectCompanyFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCompanies(state) {
      state.isLoading = true;
    },
    setCompaniesSuccess(state, action) {
      state.isLoading = false;
      state.companies = action.payload;
    },
    setCompaniesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompany(state) {
      state.isLoading = true;
    },
    updateCompanySuccess(state, action) {
      state.isLoading = false;
      state.company = action.payload;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          return action.payload;
        }
        return company;
      });
    },
    updateCompanyFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompanyLogoRequest(state) {
      state.logoLoading = true;
    },
    updateCompanyLogoSuccess(state, action) {
      state.logoLoading = false;
      state.company.logoUrl = action.payload.logoUrl;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          // eslint-disable-next-line no-param-reassign
          company.logoUrl = action.payload?.logoUrl;
        }
        return company;
      });

      ToastMessage.success('Company logo updated successfully');
    },
    updateCompanyLogoFailure(state, action) {
      state.logoLoading = false;
      state.updateCompanyLogoError = action.payload;
    },
    updateCompanyFaviconRequest(state) {
      state.isLoading = true;
    },
    updateCompanyFaviconSuccess(state, action) {
      state.isLoading = false;
      state.company.favicon = action.payload?.favicon;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          company.favicon = action.payload?.favicon;
        }
        return company;
      });

      ToastMessage.success('Company favicon updated successfully');
    },
    updateCompanyFaviconFailure(state, action) {
      state.isLoading = false;
      state.updateCompanyFaviconError = action.payload;
    },
    updateCompanyProperties(state) {
      state.isLoading = true;
    },
    updateCompanyPropertiesSuccess(state, action) {
      state.isLoading = false;
      if (action.payload.property) {
        state.company[action.payload.property] = action.payload.data;
      } else {
        state.company = action.payload.data;
      }
    },

    updateCompanyPropertiesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompanySubLists(state) {
      state.isLoading = true;
    },
    updateCompanySubListsSuccess(state, action) {
      state.isLoading = false;
      state.company[action.payload.property] = state.company[action.payload.property].map(
        (item) => {
          if (item._id === action.payload.data._id) {
            return action.payload.data;
          }
          return item;
        }
      );
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload.data._parent) {
          company[action.payload.property] = company[action.payload.property].map((item) => {
            if (item._id === action.payload.data._id) {
              return action.payload.data;
            }
            return item;
          });
        }
        return company;
      });
    },
    updateCompanySubListsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAllIdeas(state) {
      state.isLoading = true;
    },
    deleteAllIdeasSuccess(state) {
      state.deleteIdeaLoading = false;
      state.company.ideas = [];
      ToastMessage.success('Ideas deleted successfully');
    },
    deleteAllIdeasFailed(state, action) {
      state.deleteIdeaLoading = false;
      state.error = action.payload;
    },
    deleteCompany(state) {
      state.isLoading = true;
    },
    deleteCompanySuccess(state, action) {
      state.isLoading = false;
      state.companies = state.companies.filter((company) => company._id !== action.payload);
    },
    deleteCompanyFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanyMember(state) {
      state.isLoading = true;
    },
    deleteCompanyMemberSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.filter(
        (member) => member.user._id !== action.payload.userId
      );
    },
    deleteCompanyMemberFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUnregisteredMember(state) {
      state.isLoading = true;
    },
    deleteUnregisteredMemberSuccess(state, action) {
      state.isLoading = false;
      state.unregisteredCompanyMembers = state.unregisteredCompanyMembers.filter(
        (member) => member._id !== action.payload
      );
    },
    deleteUnregisteredMemberFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompanyMemberRole(state) {
      state.isLoading = true;
    },
    updateCompanyMemberRoleSuccess(state) {
      state.isLoading = false;
    },
    updateCompanyMemberRoleFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    invalidateInvitationToken(state) {
      state.isLoading = true;
    },
    invalidateInvitationTokenSuccess(state) {
      state.isLoading = false;
    },
    invalidateInvitationTokenFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompletedStatus(state) {
      state.isLoading = true;
    },
    updateCompletedStatusSuccess(state, action) {
      state.isLoading = false;
      state.company = action.payload;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          return action.payload;
        }
        return company;
      });
    },
    updateCompletedStatusFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompanySubListsOrder(state) {
      state.isLoading = true;
    },
    updateCompanySubListsOrderSuccess(state, action) {
      state.company = action.payload;
      state.isLoading = false;
    },
    updateCompanySubListsOrderFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserCompanies(state) {
      state.isLoading = true;
    },
    getUserCompaniesSuccess(state, action) {
      state.isLoading = false;
      state.companies = action.payload;
    },
    getUserCompaniesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanySubListsItem(state) {
      state.isLoading = true;
    },
    deleteCompanySubListsItemSuccess(state, action) {
      state.isLoading = false;
      state.company[action.payload.fieldName] = state.company[action.payload.fieldName].filter(
        (item) => item._id !== action.payload.id
      );
    },
    deleteCompanySubListsItemFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addItemToCompanySubLists(state) {
      state.isLoading = true;
    },
    addItemToCompanySubListsSuccess(state, action) {
      state.isLoading = false;
      state.company[action.payload.fieldName].push(action.payload.data);
    },
    addItemToCompanySubListsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemberStatusRealtime(state, action) {
      state.companyMembers = state.companyMembers.map((member) => {
        if (
          member.user._id === action.payload.userId &&
          member.companyId === action.payload.company
        ) {
          return {
            ...member,
            status: 'Active'
          };
        }
        return member;
      });
    },

    deleteCompanyMemberRealtime(state, action) {
      if (action.payload.isRegistered) {
        state.companyMembers = state.companyMembers.filter(
          (member) => member._id !== action.payload.id
        );
      } else {
        state.unregisteredCompanyMembers = state.unregisteredCompanyMembers.filter(
          (member) => member._id !== action.payload.id
        );
      }
      if (!action.payload.isCompany) {
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload.companyId
        );
      }
    },

    updateCompanyMemberRoleRealtime(state, action) {
      if (action.payload.isRegistered) {
        state.companyMembers = state.companyMembers.map((member) => {
          if (member._id === action.payload.id) {
            return {
              ...member,
              role: action.payload.role
            };
          }
          return member;
        });
      } else {
        state.unregisteredCompanyMembers = state.unregisteredCompanyMembers.map((member) => {
          if (member._id === action.payload.id) {
            return {
              ...member,
              role: action.payload.role
            };
          }
          return member;
        });
      }
      if (!action.payload.isCompany) {
        if (state.company._id === action.payload.companyId) {
          state.company.role = action.payload.role;
        }
        state.companies = state.companies.map((company) => {
          if (company._id === action.payload.companyId) {
            return {
              ...company,
              role: action.payload.role
            };
          }
          return company;
        });
      }
    },

    acceptInvitationRealtime(state, action) {
      state.companies = [...state.companies, action.payload];
      state.company = action.payload;
    },

    addNewMemberRealtime(state, action) {
      if (action.payload.profilePicture) {
        state.companyMembers = [...state.companyMembers, action.payload];
      } else {
        state.unregisteredCompanyMembers = [...state.unregisteredCompanyMembers, action.payload];
      }
    },
    updateCompanyMemberRealtime(state, action) {
      state.companyMembers = state.companyMembers.map((member) => {
        if (member.user._id === action.payload._id) {
          return {
            ...member,
            user: action.payload
          };
        }
        return member;
      });
    },
    getCompanyProperties(state) {
      state.isLoading = true;
    },
    getCompanyPropertiesSuccess(state, action) {
      state.isLoading = false;
      state.company[action.payload.fieldName] = action.payload.data;
      state[action.payload.fieldName] = action.payload.data;
    },
    getCompanyPropertiesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanyRealtime(state, action) {
      state.companies = state.companies.filter((company) => company._id !== action.payload);
    },
    updateCompanyRealtime(state, action) {
      state.company = action.payload;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          return action.payload;
        }
        return company;
      });
    },

    declineInvitationRealtime(state, action) {
      state.companyMembers = state.companyMembers.map((member) => {
        if (member.user._id === action.payload) {
          return {
            ...member,
            status: 'Declined'
          };
        }
        return member;
      });
    },
    acceptInvitation(state, action) {
      state.companyMembers = [...state.companyMembers, action.payload];
      state.unregisteredCompanyMembers = state.unregisteredCompanyMembers?.filter(
        (member) => member.email !== action.payload.user.email
      );
    },
    updateCompanySubListsOrderRealtime(state, action) {
      if (action.payload.property === 'roadmaps') {
        state.company.roadmaps = action.payload.data;
      } else {
        state.company[action.payload.property] = action.payload.data.sort(
          (a, b) => a.order - b.order
        );
      }
    },
    updateCompanySubListsRealtime(state, action) {
      if (action.payload.property === 'roadmaps' && !action.payload.data.isPublic) {
        state.company.roadmaps = state.company.roadmaps.filter(
          (roadmap) => roadmap._id !== action.payload.data._id
        );
      } else if (
        state.company[action.payload.property].some((s) => s._id === action.payload.data._id)
      ) {
        state.company[action.payload.property] = state.company[action.payload.property].map(
          (item) => {
            if (item._id === action.payload.data._id) {
              return action.payload.data;
            }
            return item;
          }
        );
      } else {
        state.company[action.payload.property] = [
          ...state.company[action.payload.property],
          action.payload.data
        ];
      }
    },
    getCompanyBySubdomain(state) {
      state.getCompanyLoading = true;
    },
    getCompanyBySubdomainSuccess(state, action) {
      state.getCompanyLoading = false;
      state.company = action.payload;
      state.isGuest = !action.payload?.role || action.payload?.role === 'Guest';
    },
    getCompanyBySubdomainFailed(state, action) {
      state.getCompanyLoading = false;
      state.error = action.payload;
    },
    resendInvite(state) {
      state.isLoading = true;
    },
    resendInviteSuccess(state) {
      state.isLoading = false;
    },
    resendInviteFailed(state, action) {
      state.error = action.payload;
    },
    createCompanyUser(state) {
      state.isLoading = true;
    },
    createCompanyUserSuccess(state, action) {
      state.isLoading = false;
      state.companyUsers = [...state.companyUsers, action.payload];
    },
    createCompanyUserFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    requestAccess(state) {
      state.isLoading = true;
    },
    requestAccessSuccess(state, action) {
      state.isLoading = false;
      state.accessRequest = action.payload;
    },
    requestAccessFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAccessRequest(state) {
      state.getAccessRequestLoading = true;
    },
    getAccessRequestSuccess(state, action) {
      state.getAccessRequestLoading = false;
      state.accessRequest = action.payload;
    },
    getAccessRequestFailed(state, action) {
      state.getAccessRequestLoading = false;
      state.error = action.payload;
    },
    getAccessRequestsByCompany(state) {
      state.isLoading = true;
    },
    getAccessRequestsByCompanySuccess(state, action) {
      state.isLoading = false;
      state.accessRequests = action.payload;
    },
    getAccessRequestsByCompanyFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    approveCompanyAccessRequest(state) {
      state.isLoading = true;
    },
    approveCompanyAccessRequestSuccess(state, action) {
      state.isLoading = false;
      state.accessRequests = state.accessRequests.filter(
        (request) => request.user._id !== action.payload.user._id
      );
      state.companyMembers = [...state.companyMembers, action.payload];
    },
    approveCompanyAccessRequestFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    rejectCompanyAccessRequest(state) {
      state.isLoading = false;
    },
    rejectCompanyAccessRequestSuccess(state, action) {
      state.isLoading = false;
      state.accessRequests = state.accessRequests.filter(
        (request) => request._id !== action.payload
      );
    },
    rejectCompanyAccessRequestFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    approvedAccessRequest(state) {
      state.company = {
        ...state.company,
        role: 'Guest'
      };
    },
    requestAccessRealtime(state, action) {
      if (!state.accessRequests.some((ar) => ar._id === action.payload._id)) {
        state.accessRequests = [action.payload, ...state.accessRequests];
      }
    },
    getCompanyUsers(state) {
      state.getCompanyUsersLoading = true;
    },
    getCompanyUsersSuccess(state, action) {
      state.getCompanyUsersLoading = false;
      state.companyUsers = action.payload;
    },
    getCompanyUsersFailed(state, action) {
      state.getCompanyUsersLoading = false;
      state.error = action.payload;
    },
    updateCompanyUser() {},
    updateCompanyUserSuccess(state, action) {
      state.companyUsers.result = state.companyUsers.result.map((user) => {
        if (user._id === action.payload._id) {
          return {
            ...action.payload,
            segment: state.company.find((c) => c._id === action.payload.segment)
          };
        }
        return user;
      });
    },
    updateCompanyUserFailed(state, action) {
      state.error = action.payload;
    },
    deleteCompanyUser(state) {
      state.isLoading = true;
    },
    deleteCompanyUserSuccess(state, action) {
      state.isLoading = false;
      state.companyUsers.result = state.companyUsers.result.filter(
        (user) => user._id !== action.payload
      );
    },
    deleteCompanyUserFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addNewCompanyUser(state, action) {
      if (!state.companyUsers.result.some((u) => u._id === action.payload._id))
        state.companyUsers.result = [...state.companyUsers.result, action.payload];
    },
    updateCompanyUserCounts(state, action) {
      if (state.company.result) {
        state.companyUsers.result = state.companyUsers.result.map((user) => {
          if (user.userId === action.payload.userId || user.email === action.payload.email) {
            return {
              ...user,
              [action.payload.property]: user[action.payload.property] + 1,
              lastActivityAt: new Date().toISOString()
            };
          }
          return user;
        });
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase([HYDRATE], (state, action) => ({
      ...state,
      ...action.payload.auth
    }));
  }
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
