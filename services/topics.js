import { db } from '@/utils/altogic';

const topicService = {
  getTopics: async () => db.model('topics').get(),
  getStatuses: async () => db.model('status').get()
};
export default topicService;
