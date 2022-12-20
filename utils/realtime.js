import { realtime } from '@/utils/altogic';

const realtimeService = {
  join: (channel) => realtime.join(channel),
  off: (eventType, callback) => realtime.off(eventType, callback),
  on: (eventType, callback) => realtime.on(eventType, callback),
  sendMessage: (channel, event, message) => realtime.send(channel, event, message)
};

export default realtimeService;
