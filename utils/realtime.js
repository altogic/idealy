import { realtime } from '@/utils/altogic';

const realtimeService = {
  join: (channel) => realtime.join(channel),
  leave: (channel) => realtime.leave(channel),
  listen: (eventType, callback) => realtime.on(eventType, callback),
  sendMessage: (channel, event, message) => realtime.send(channel, event, message)
};

export default realtimeService;
