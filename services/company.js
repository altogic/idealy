import { db, endpoint } from '@/utils/altogic';

const companyService = {
  createCompany: (company) => endpoint.post('/company', company),
  getCompaniesByOwner: (ownerId) => db.model('company').filter(`owner == '${ownerId}'`).get(),
  getCompanyBySubdomain: (subdomain, userId) =>
    endpoint.get('/company', {
      subdomain,
      userId
    }),
  getCompanyMembers: (companyId) =>
    db
      .model('companyMembers')
      .filter(`companyId == '${companyId} && role != 'Owner''`)
      .lookup({ field: 'user' })
      .get(),
  inviteTeamMember: (req) => endpoint.post('/company/invite', req),
  getUnregisteredCompanyMembers: (companyId) =>
    db.model('unregisteredCompanyMembers').filter(`companyId == '${companyId}'`).get(),
  updateMemberStatus: ({ userId, companyId, status }) =>
    db
      .model('companyMembers')
      .filter(`user == '${userId}' && companyId == '${companyId}'`)
      .updateFields([{ field: 'status', updateType: 'set', value: status }]),
  updateCompany: (company) => db.model('company').object(company._id).update(company),
  registerTeamMember: (req) => endpoint.post('/company/member', req),
  addItemToCompanySubLists: ({ fieldName, value, companyId }) =>
    db.model(`company.${fieldName}`).append({ ...value }, companyId),
  deleteCompanySubListsItem: ({ fieldName, id }) =>
    db.model(`company.${fieldName}`).object(id).delete(),
  checkSubdomainExists: (subdomain) =>
    db.model('company').filter(`subdomain == '${subdomain}'`).get(),
  getInvitation: (token) => db.model('invitations').filter(`token == '${token}'`).get(),
  checkInvitation: (token) => endpoint.post('/company/invitation-check', { token }),
  invalidateInvitationToken: (email, companyId) =>
    db
      .model('invitations')
      .filter(`email == '${email}' && companyId == '${companyId}'`)
      .updateFields([{ field: 'isExpire', updateType: 'set', value: true }]),
  getUserCompanies: (userId) => endpoint.get('/user/companies', { userId }),
  updateCompletedStatus: ({ id, companyId }) =>
    endpoint.put(`/company/${companyId}/status`, { id }),
  deleteAllIdeas: (companyId) => db.model('ideas').filter(`company == '${companyId}'`).delete(),
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
  updateCompanyProperties: ({ id, modelName, fieldName, value }) =>
    db
      .model(modelName)
      .object(id)
      .updateFields([{ field: fieldName, updateType: 'set', value }]),
  resendInvitation: (req) => endpoint.post('/invitation/resend', req),
  createCompanyUser: (req) => endpoint.post('/company/user', req),
  requestAccess: (req) => endpoint.post('/company/request-access', req),
  getAccessRequests: ({ companyId, userId }) =>
    endpoint.get('/company/access-request', { companyId, userId }),
  getAccessRequestsByCompany: (companyId) =>
    db
      .model('companyAccessRequests')
      .filter(`companyId == '${companyId}'`)
      .lookup({ field: 'user' })
      .get(),
  approveCompanyAccessRequest: (req) => endpoint.post('/company/access-request/approve', req),
  rejectCompanyAccessRequest: (req) => endpoint.post(`/company/access-request/reject/`, req),
  getCompanyUsers: (companyId) => endpoint.get('/company/users', { companyId })
};
export default companyService;
