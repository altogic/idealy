import { db, endpoint } from '@/utils/altogic';

const ideaService = {
  getIdeasByCompany: (params) => endpoint.get('/idea', params),
  createIdea: (req) => endpoint.post('/idea', req),
  voteIdea: (req) => endpoint.post('/idea/vote', req),
  downvoteIdea: (id) => endpoint.delete(`/idea/downvote?ideaId=${id}`),
  getIdeaVotes: (filter) =>
    endpoint.get(`/ideaVote`, {
      filter
    }),
  updateIdea: (req) => endpoint.put('/idea', req),
  deleteIdea: (id) => db.model('ideas').object(id).delete(),
  searchSimilarIdeas: (title) => endpoint.get('/idea/search', { title })
};
export default ideaService;
