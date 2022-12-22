import { endpoint } from '@/utils/altogic';

const ideaService = {
  getIdeasByCompany: (params) => endpoint.get('/idea', params),
  createIdea: (req) => endpoint.post('/idea', req),
  voteIdea: (req) => endpoint.post('/idea/vote', req),
  downvoteIdea: (id) => endpoint.delete(`/idea/downvote?ideaId=${id}`),
  getIdeaVotes: (filter) =>
    endpoint.get(`/ideaVote`, {
      filter
    })
};
export default ideaService;
