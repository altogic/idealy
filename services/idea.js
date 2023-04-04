import { db, endpoint } from '@/utils/altogic';

const ideaService = {
  getIdeasByCompany: (params) => endpoint.get('/idea', params),
  createIdea: (req) => endpoint.post('/idea', req),
  voteIdea: (req) => endpoint.post('/idea/vote', req),
  downVoteIdea: (req) => endpoint.delete(`/idea/downVote`, req),
  getUserVotes: ({ ip, companyId, userId, email }) =>
    endpoint.get(`/ideaVote`, {
      ip,
      companyId,
      userId,
      email
    }),
  updateIdea: (req) => endpoint.put('/idea', req),
  deleteIdea: (id) => db.model('ideas').object(id).delete(),
  searchSimilarIdeas: ({ title, companyId, random = false, page = 1, limit = 3 }) =>
    endpoint.get('/idea/search', { title, companyId, random, page, limit }),
  deleteIdeaCoverImage: (id) =>
    db
      .model('ideas')
      .object(id)
      .updateFields([{ field: 'coverImage', updateType: 'unset' }]),
  searchCompanyMembers: (companyId, searchText, userId = null) =>
    endpoint.get('/company/member/search', { companyId, searchText, userId }),
  approveAllIdeas: (companyId) =>
    db
      .model('ideas')
      .filter(`company == '${companyId}'`)
      .updateFields([{ field: 'isApproved', updateType: 'set', value: true }]),
  mergeIdeas: (baseIdea, mergedIdea) => endpoint.post('/idea/merge', { baseIdea, mergedIdea }),
  getMergedIdeas: (filter) => endpoint.get('/idea/merge', { filter }),
  getIdea: (id) => endpoint.get(`/ideas/${id}`),
  getIdeasByRoadmap: (filter) => endpoint.get('/idea/roadmap', { filter }),
  updateIdeasOrder: (ideas) => endpoint.put('/idea/roadmap', ideas)
};
export default ideaService;
