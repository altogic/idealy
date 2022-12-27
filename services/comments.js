import { endpoint } from '@/utils/altogic';

const CommentsService = {
  getComments: (id) => endpoint.get(`/comments/${id}`),
  addComment: (comment) => endpoint.post('comments', comment),
  deleteComment: (id) => endpoint.delete(`/comments/${id}`)
};
export default CommentsService;
