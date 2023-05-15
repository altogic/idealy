import { db, endpoint } from '@/utils/altogic';

const ideaService = {
  getIdeasByCompany: (params) => endpoint.get('/idea', params),
  createIdea: (req) => endpoint.post('/idea', req),
  voteIdea: (req) => endpoint.post('/idea/vote', req),
  downVoteIdea: (voteId) => endpoint.delete(`/idea/downVote/${voteId}`),
  getUserVotes: ({ filter }) =>
    endpoint.get(`/ideaVote`, {
      filter
    }),
  updateIdea: (req) => endpoint.put('/idea', req),
  deleteIdea: (id) => endpoint.delete(`/idea/${id}`),
  searchSimilarIdeas: ({ title, companyId, random = false, page = 1, limit = 3 }) =>
    endpoint.get('/idea/search', { title, companyId, random, page, limit }),
  deleteIdeaCoverImage: (id) =>
    db
      .model('ideas')
      .object(id)
      .updateFields([{ field: 'coverImage', updateType: 'unset' }]),
  searchCompanyMembers: (companyId, searchText, email = null) =>
    endpoint.get('/company/member/search', { companyId, searchText, email }),
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
