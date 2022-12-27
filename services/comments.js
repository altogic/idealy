import { endpoint } from '@/utils/altogic';

const CommentsService = {
  getComments: (ideaId) => endpoint.get('/comments', { ideaId }),
  addComment: (comment) => endpoint.post('comments', comment),
  deleteComment: (id) => endpoint.delete(`/comments/${id}`)
};
export default CommentsService;
