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
  searchSimilarIdeas: (title, companyId, random = false) =>
    endpoint.get('/idea/search', { title, companyId, random }),
  deleteIdeaCoverImage: (id) =>
    db
      .model('ideas')
      .object(id)
      .updateFields([{ field: 'coverImage', updateType: 'unset' }]),
  deleteIdeaStatus: (id) =>
    db
      .model('ideas')
      .object(id)
      .updateFields([
        { field: 'status', updateType: 'unset', value: null },
        { field: 'statusUpdatedAt', updateType: 'set', value: new Date() },
        { field: 'isCompleted', updateType: 'set', value: false }
      ]),
  searchCompanyMembers: (companyId, searchText) =>
    endpoint.get('/company/member/search', { companyId, searchText }),
  approveAllIdeas: (companyId) =>
    db
      .model('ideas')
      .filter(`company == '${companyId}'`)
      .updateFields([{ field: 'isApproved', updateType: 'set', value: true }]),
  mergeIdeas: (baseIdea, mergedIdea) => endpoint.post('/idea/merge', { baseIdea, mergedIdea }),
  getMergedIdeas: (filter) => endpoint.get('/idea/merge', { filter }),
  getIdea: (id) => endpoint.get(`/ideas/${id}`)
};
export default ideaService;
