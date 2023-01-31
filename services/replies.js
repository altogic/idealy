import { endpoint } from '@/utils/altogic';

const replyService = {
  getReplies: (commentId, page) =>
    endpoint.get('/replies/', {
      filter: `this.commentId == '${commentId}'`,
      page,
      size: 5
    }),
  createReply: (data) => endpoint.post('/replies/', data),
  updateReply: (id, data) => endpoint.put(`/replies/${id}`, data),
  deleteReply: ({ replyId, commentId }) => endpoint.delete('/replies', { replyId, commentId })
};
export default replyService;
