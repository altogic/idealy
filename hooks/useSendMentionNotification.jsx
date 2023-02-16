import { useSelector } from 'react-redux';
import useNotification from './useNotification';

export default function useSendMentionNotification(type) {
  const user = useSelector((state) => state.auth.user);
  const guestInfo = useSelector((state) => state.guestInfo);
  const sendNotification = useNotification();
  return (content) => {
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
            message: `You have been mentioned in an ${type} by ${user?.name || guestInfo.name}`,
            targetUser: id.split('-')[0],
            type: 'mention',
            notificationType: 'user',
            subject: `'You have been mentioned in an ${type}'`,
            guestName: guestInfo?.name,
            guestEmail: guestInfo?.avatar
          });
        }
      });
    }
  };
}
