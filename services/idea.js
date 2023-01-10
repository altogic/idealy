import { db, endpoint } from '@/utils/altogic';

const ideaService = {
  getIdeasByCompany: (params) => endpoint.get('/idea', params),
  createIdea: (req) => endpoint.post('/idea', req),
  voteIdea: (req) => endpoint.post('/idea/vote', req),
  downVoteIdea: (req) => endpoint.delete(`/idea/downVote}`, req),
  getUserVotes: (ip, companyId) =>
    endpoint.get(`/ideaVote`, {
      ip,
      companyId
    }),
  updateIdea: (req) => endpoint.put('/idea', req),
  deleteIdea: (id) => db.model('ideas').object(id).delete(),
  searchSimilarIdeas: (title, companyId) => endpoint.get('/idea/search', { title, companyId }),
  deleteIdeaCoverImage: (id) =>
    db
      .model('ideas')
      .object(id)
      .updateFields([{ field: 'coverImage', updateType: 'unset' }])
};
export default ideaService;
