import _ from 'lodash';
import useNotification from './useNotification';

export default function useSendMentionNotification(type) {
  const sendNotification = useNotification();

  const handleNotificationMessage = (name, title) => {
    switch (type) {
      case 'idea':
        return `<b>${name}</b> mentioned you in <b>${title}<b>`;
      case 'comment':
        return `<b>${name}</b> mentioned you in the comments of <b>${title}</b>.`;
      case 'reply':
        return `<b>${name}</b> mentioned you in the replies of <b>${title}</b>.`;
      default:
        return `<b>${name}</b> You have been mentioned in an ${type}`;
    }
  };
  return ({ content, title, ideaId, name }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const mentions = doc.querySelectorAll('.mention');
    if (mentions.length) {
      const mentionsArray = Array.from(mentions);
      console.log(mentionsArray);
      const mentionsIds = mentionsArray.map((mention) => ({
        id: mention.dataset.id,
        isRegistered: mention.dataset.isRegistered,
        userId: mention.dataset.userId
      }));
      const uniqueMentions = _.uniqBy(mentionsIds, 'id');
      uniqueMentions.forEach((m) => {
        console.log(m);
        if (m.isRegistered) {
          sendNotification({
            message: handleNotificationMessage(name, title),
            targetUser: m.userId,
            type: 'mention',
            ideaId
          });
        }
      });
    }
  };
}
