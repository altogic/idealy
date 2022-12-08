import { db, endpoint } from '@/utils/altogic';

const companyService = {
  createCompany: (company) => endpoint.post('/company', company),
  getCompaniesByOwner: (ownerId) => db.model('company').filter(`owner == '${ownerId}'`).get(),
  getCompanyById: (companyId) => db.model('company').object(companyId).get(),
  getCompanyMembers: (companyId) =>
    db
      .model('companyMembers')
      .filter(`companyId == '${companyId}'`)
      .lookup({ field: 'user' })
      .get(),
  inviteTeamMember: (req) => endpoint.post('/company/invite', req),
  getUnregisteredCompanyMembers: (companyId) =>
    db.model('unregisteredCompanyMembers').filter(`companyId == '${companyId}'`).get(),
  updateMemberStatus: ({ userId, companyId }) =>
    db
      .model('companyMembers')
      .filter(`user == '${userId}' && companyId == '${companyId}'`)
      .updateFields([{ field: 'status', updateType: 'set', value: 'Active' }]),
  updateCompany: (company) => db.model('company').object(company._id).update(company),
  registerTeamMember: (req) => endpoint.post('/company/member', req),
  setCompanyTopics: ({ name, companyId, order }) =>
    db.model('company.topics').append({ name, order }, companyId),
  setCompanyStatuses: ({ name, color, order, companyId }) =>
    db.model('company.statuses').append({ name, color, order }, companyId),
  removeCompanyTopics: ({ topic }) => db.model('company.topics').object(topic).delete(),
  removeCompanyStatuses: ({ status }) => db.model('company.statuses').object(status).delete(),
  setCompanyCategories: ({ name, color, companyId, order }) =>
    db.model('company.categories').append({ name, color, order }, companyId),
  setCompanyRoadMap: ({ name, description, companyId }) =>
    db.model('company.roadmaps').append({ name, description }, companyId),
  removeCompanyCategories: ({ category }) =>
    db.model('company.categories').object(category).delete(),
  removeCompanyRoadMap: ({ roadmap }) => db.model('company.roadmaps').object(roadmap).delete(),
  checkSubdomainExists: (subdomain) =>
    db.model('company').filter(`subdomain == '${subdomain}'`).get(),
  getInvitation: (token) => db.model('invitations').filter(`token == '${token}'`).get(),
  checkInvitation: (token) => endpoint.post('/company/invitation-check', { token }),
  invalidateInvitationToken: (email, companyId) =>
    db
      .model('invitations')
      .filter(`email == '${email}' && companyId == '${companyId}'`)
      .updateFields([{ field: 'isExpire', updateType: 'set', value: true }]),
  getUserCompanies: (userId) => endpoint.get(`/user/companies?userId='${userId}'`),
  updateCompletedStatus: ({ id, companyId }) =>
    endpoint.put(`/company/${companyId}/status`, { id }),
  deleteAllIdeas: (companyId) =>
    db.model('company.ideas').filter(`_parent == '${companyId}'`).delete(),
  deleteCompany: (companyId) => endpoint.delete(`/company/${companyId}`),
  deleteCompanyMember: (companyId, userId) =>
    db
      .model('companyMembers')
      .filter(`companyId == '${companyId}' && user == '${userId}'`)
      .delete(),
  deleteUnregisteredCompanyMember: (id) =>
    db.model('unregisteredCompanyMembers').object(id).delete(),
  deleteInvite: (email, companyId) =>
    db.model('invitations').filter(`email == '${email}' && companyId == '${companyId}'`).delete(),
  deleteIsCompanyLogo(companyId) {
    return db
      .model('company')
      .object(companyId)
      .updateFields([{ field: 'logoUrl', updateType: 'unset', value: null }]);
  },
  deleteIsCompanyFavicon(companyId) {
    return db
      .model('company')
      .object(companyId)
      .updateFields([{ field: 'favicon', updateType: 'unset', value: null }]);
  },
  updateCompanyMemberRole: (req) => endpoint.put('/company/member', req),
  updateCompanySubListsOrder: ({ modelName, value }) =>
    endpoint.put(`/company/${modelName}/order`, value),
  getCompanyProperties: (fieldName, companyId) =>
    db
      .model(`company.${fieldName}`)
      .filter(`_parent == '${companyId}'`)
      .sort('order', 'desc')
      .get(),
  updateCompanyProperties: ({ id, modelName, fieldName, value }) =>
    db
      .model(modelName)
      .object(id)
      .updateFields([{ field: fieldName, updateType: 'set', value }])
};
export default companyService;
