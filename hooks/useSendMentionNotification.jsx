import { useSelector } from 'react-redux';
import useNotification from './useNotification';

export default function useSendMentionNotification(type) {
  const sendNotification = useNotification();
  const guestInfo = useSelector((state) => state.guestInfo);
  const idea = useSelector((state) => state.idea.selectedIdea);

  const handleNotificationMessage = (title, name) => {
    switch (type) {
      case 'idea':
        return `<b>${name}</b> mentioned you in <b>${idea?.title || title}<b>`;
      case 'comment':
        return `<b>${name}</b> mentioned you in the comments of <b>${idea.title}</b>.`;
      case 'reply':
        return `<b>${name}</b> mentioned you in the replies of <b>${idea.title}</b>.`;
      default:
        return `<b>${name}</b> You have been mentioned in an ${type}`;
    }
  };
  return ({ content, name, email, title }) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const mentions = doc.querySelectorAll('.mention');
      if (mentions.length) {
        const mentionsArray = Array.from(mentions);
        const mentionsIds = mentionsArray.map((mention) => mention.dataset.id);
        const uniqueMentions = [...new Set(mentionsIds)];
        uniqueMentions.forEach((id) => {
          const isRegistered = JSON.parse(id.split('-')[1]);
          if (isRegistered) {
            sendNotification({
              message: handleNotificationMessage(title, name),
              targetUser: id.split('-')[0],
              type: 'mention',
              notificationType: 'user',
              subject: `You have been mentioned in ${type === 'idea' ? 'an idea' : `a ${type}`}`,
              guestName: name,
              guestEmail: email,
              guestAvatar: guestInfo?.avatar
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
