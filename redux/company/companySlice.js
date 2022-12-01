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
  logoLoading: false
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyTopics(state) {
      state.isLoading = true;
      ToastMessage.success('Added topics successfully');
    },
    setCompanyTopicsSuccess(state, action) {
      state.isLoading = false;
      state.company.topics = [...state.company.topics, action.payload];
    },
    setCompanyTopicsFailure(state, action) {
      state.isLoading = false;
      state.companyTopicsError = action.payload;
    },
    setCompanyStatuses(state) {
      state.isLoading = true;
      ToastMessage.success('Added statuses successfully');
    },
    setCompanyStatusesSuccess(state, action) {
      state.isLoading = false;
      state.company.statuses = [...state.company.statuses, action.payload];
    },
    setCompanyStatusesFailure(state, action) {
      state.isLoading = false;
      state.companyStatusesError = action.payload;
    },
    setCompanyCategories(state) {
      state.isLoading = true;
      ToastMessage.success('Added categories successfully');
    },
    setCompanyCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.company.categories = [...state.company.categories, action.payload];
    },
    setCompanyCategoriesFailure(state, action) {
      state.isLoading = false;
      state.companyCategoriesError = action.payload;
    },
    setCompanyRoadMap(state) {
      state.isLoading = true;
      ToastMessage.success('Added roadmap successfully');
    },
    setCompanyRoadMapSuccess(state, action) {
      state.isLoading = false;
      state.company.roadmaps = [...state.company.roadmaps, action.payload];
    },
    setCompanyRoadMapFailure(state, action) {
      state.isLoading = false;
      state.companyRoadMapError = action.payload;
    },
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
    removeCompanyTopics(state) {
      state.isLoading = true;
    },
    removeCompanyTopicsSuccess(state, action) {
      state.isLoading = false;
      state.company.topics = state.company.topics.filter((topic) => topic._id !== action.payload);
      localStorage.setItem('company', JSON.stringify(state.company));
      ToastMessage.success('Topic deleted successfully');
    },
    removeCompanyTopicFailure(state, action) {
      state.isLoading = false;
      state.companyTopicsError = action.payload;
    },
    removeCompanyStatuses(state) {
      state.isLoading = true;
      ToastMessage.success('Status deleted successfully');
    },
    removeCompanyStatusesSuccess(state, action) {
      state.isLoading = false;
      state.company.statuses = state.company.statuses.filter(
        (status) => status._id !== action.payload
      );
      localStorage.setItem('company', JSON.stringify(state.company));
    },
    removeCompanyStatusesFailure(state, action) {
      state.isLoading = false;
      state.companyStatusesError = action.payload;
    },
    removeCompanyCategories(state) {
      state.isLoading = true;
    },
    removeCompanyCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.company.categories = state.company.categories.filter(
        (category) => category._id !== action.payload
      );
      ToastMessage.success('Category deleted successfully');
      localStorage.setItem('company', JSON.stringify(state.company));
    },
    removeCompanyCategoriesFailure(state, action) {
      state.isLoading = false;
      state.companyCategoriesError = action.payload;
    },
    removeCompanyRoadMap(state) {
      state.isLoading = true;
      ToastMessage.success('Roadmap deleted successfully');
    },
    removeCompanyRoadMapSuccess(state, action) {
      state.isLoading = false;
      state.company.roadmaps = state.company.roadmaps.filter(
        (roadmap) => roadmap._id !== action.payload
      );
      localStorage.setItem('company', JSON.stringify(state.company));
    },
    removeCompanyRoadMapFailure(state, action) {
      state.isLoading = false;
      state.companyRoadMapError = action.payload;
    },
    removeTopic() {},
    removeTopicSuccess(state, action) {
      state.companyTopics = state.companyTopics.filter((topic) => topic._id !== action.payload);
    },
    createCompany(state) {
      state.isLoading = true;
    },
    createCompanySuccess(state, action) {
      state.isLoading = false;
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
    },
    createCompanyFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCompany(state) {
      state.getCompanyLoading = true;
    },
    getCompanySuccess(state, action) {
      state.getCompanyLoading = false;
      state.company = action.payload;
    },
    getCompanyFailed(state, action) {
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
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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

      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
    },
    updateCompanySubListsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeCompanyName(state) {
      state.isLoading = true;
    },
    changeCompanyNameSuccess(state, action) {
      state.isLoading = false;
      state.company = action.payload;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          return action.payload;
        }
        return company;
      });
      ToastMessage.success('Company name updated successfully');
    },
    changeCompanyNameFailure(state, action) {
      state.isLoading = false;
      state.changeCompanyNameError = action.payload;
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
      [state.company] = state.companies;
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
    },
    updateCompletedStatusFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCompanySubListsOrder(state) {
      state.isLoading = true;
    },
    updateCompanySubListsOrderSuccess(state, action) {
      state.isLoading = false;
      state.company = action.payload;
      state.companies = state.companies.map((company) => {
        if (company._id === action.payload._id) {
          return action.payload;
        }
        return company;
      });
      localStorage.setItem('selectedCompany', JSON.stringify(state.company));
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
      state.company = action.payload.find((company) => company._id === state.company._id);
    },
    getUserCompaniesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    declineInvitation(state) {
      state.isLoading = true;
    },
    declineInvitationSuccess(state) {
      state.isLoading = false;
    },
    declineInvitationFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemberStatusRealtime(state) {
      state.isLoading = true;
    },
    updateMemberStatusRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.map((member) => {
        if (
          member.user._id === action.payload.userId &&
          member.companyId === action.payload.company._id
        ) {
          return {
            ...member,
            status: 'Active'
          };
        }
        return member;
      });
    },
    deleteCompanyMemberRealtime(state) {
      state.isLoading = true;
    },
    deleteCompanyMemberRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.filter(
        (member) => member.user._id !== action.payload.userId
      );
      if (!action.payload.isCompany) {
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload.companyId
        );
      }
    },
    updateCompanyMemberRoleRealtime(state) {
      state.isLoading = true;
    },
    updateCompanyMemberRoleRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.map((member) => {
        if (member._id === action.payload.id) {
          return {
            ...member,
            role: action.payload.role
          };
        }
        return member;
      });
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
    acceptInvitationRealtime(state) {
      state.isLoading = true;
    },
    acceptInvitationRealtimeSuccess(state, action) {
      state.companies = [...state.companies, action.payload];
      state.isLoading = false;
    },
    addNewMemberRealtime(state) {
      state.isLoading = true;
    },
    addNewMemberRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = [...state.companyMembers, action.payload];
    },
    updateCompanyMemberRealtime(state) {
      state.isLoading = true;
    },
    updateCompanyMemberRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.companyMembers = state.companyMembers.map((member) => {
        if (member.user._id === action.payload._id) {
          return {
            ...member,
            user: action.payload
          };
        }
        return member;
      });
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.company
    })
  }
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
